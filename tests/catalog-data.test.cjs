const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'dados.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const courseSource = fs.readFileSync(path.join(__dirname, '..', 'curso.js'), 'utf8');
const courseHtml = fs.readFileSync(path.join(__dirname, '..', 'curso.html'), 'utf8');
const fixture = {
  id: 41,
  oficina_id: 12,
  dia_semana: 4,
  hora_inicio: '10:30:00',
  hora_fim: '11:30:00',
  tipo: 'fixa',
  status: 'sem_vagas',
  ativo: true,
  oficinas: {
    id: 12,
    nome: 'Tênis de Mesa',
    descricao: 'Descrição confirmada da oficina.',
    idade_min: 8,
    idade_max: 15,
    ativo: true,
    categorias: { nome: 'Esporte e Lazer' }
  },
  professores: { nome: 'Professor(a) de teste' }
};

function createContext({ withClient = true, data = [fixture], error = null } = {}) {
  const calls = [];
  const logs = { warn: [], info: [], error: [] };
  const context = {
    window: {},
    row: fixture,
    console: {
      error(...args) { logs.error.push(args); },
      warn(...args) { logs.warn.push(args); },
      info(...args) { logs.info.push(args); }
    }
  };
  if (withClient) {
    context.window.supabase = {
      createClient(url, key) {
        calls.push(['createClient', url, key]);
        return {
          from(table) {
            calls.push(['from', table]);
            const query = {
              select(value) { calls.push(['select', value]); return this; },
              eq(...args) { calls.push(['eq', ...args]); return this; },
              order(...args) { calls.push(['order', ...args]); return this; },
              then(resolve, reject) { return Promise.resolve({ data, error }).then(resolve, reject); }
            };
            return query;
          }
        };
      }
    };
  }
  vm.createContext(context);
  vm.runInContext(source, context, { filename: 'dados.js' });
  return { context, calls, logs };
}

test('normaliza oficina com ID, descrição, categoria, idade e status do esquema atual', () => {
  const { context } = createContext();
  const result = vm.runInContext('normalizarHorario(row)', context, { timeout: 1000, contextCodeGeneration: { strings: false, wasm: false } });
  assert.equal(result.id, 12);
  assert.equal(result.oficinaId, 12);
  assert.equal(result.horarioId, 41);
  assert.equal(result.name, 'Tênis de Mesa');
  assert.equal(result.descricao, 'Descrição confirmada da oficina.');
  assert.equal(result.age, '8 a 15 anos');
  assert.equal(result.status, 'Sem vagas');
  assert.equal(result.hasFixedSchedule, true);
});

test('prioriza ID estável e mantém fallback por slug; omite link sem ID ou nome', () => {
  const { context } = createContext();
  assert.equal(vm.runInContext("courseDetailsUrl({ oficinaId: 12, name: 'Tênis de Mesa' })", context), 'curso.html?id=12');
  assert.equal(vm.runInContext("courseDetailsUrl({ name: 'Capoeira' })", context), 'curso.html?c=capoeira');
  assert.equal(vm.runInContext('courseDetailsUrl({})', context), '');
});

test('ID tem prioridade sobre slug e agrega todos os horários da mesma oficina', () => {
  const { context } = createContext();
  context.rows = [
    { oficinaId: 12, name: 'Capoeira', horarioId: 1 },
    { oficinaId: 12, name: 'Capoeira', horarioId: 2 },
    { oficinaId: 99, name: 'Capoeira', horarioId: 3 }
  ];
  const result = vm.runInContext("filtrarHorariosDoCurso(rows, '12', 'capoeira', true)", context);
  assert.deepEqual(Array.from(result, row => row.horarioId), [1, 2]);
  assert.equal(vm.runInContext("filtrarHorariosDoCurso(rows, 'inválido', 'capoeira', true).length", context), 0);
  assert.equal(vm.runInContext("filtrarHorariosDoCurso(rows, '', 'capoeira', false).length", context), 3);
});

test('turma regular de modalidade agendada continua no catálogo', () => {
  const { context } = createContext();
  assert.equal(vm.runInContext("isBookingWorkshop('Violino')", context), true);
  assert.equal(vm.runInContext("isBookingWorkshop({ name: 'Violino', day: 'quinta-feira', time: '10h–11h', hasFixedSchedule: true })", context), false);
  assert.equal(vm.runInContext("isBookingWorkshop({ name: 'Violino', day: 'quinta-feira', time: '10h–11h' })", context), false);
});

test('status de indisponibilidade recebe classe visual de vagas esgotadas', () => {
  const { context } = createContext();
  assert.equal(vm.runInContext("statusClass('Sem vagas')", context), 'status-full');
  assert.equal(vm.runInContext("statusClass('Indisponível')", context), 'status-full');
  assert.equal(vm.runInContext("statusClass('Últimas vagas')", context), 'status-last');
  assert.equal(vm.runInContext("statusClass('')", context), '');
});

test('fallback local não presume vagas disponíveis sem um status confirmado', () => {
  const { context } = createContext();
  assert.equal(vm.runInContext('DEFAULT_STATUS', context), '');
  assert.equal(vm.runInContext('courses.every(course => !course.status && statusFor(course) === "")', context), true);
  assert.match(appSource, /const statusBadge=status\?/);
  assert.match(courseSource, /temStatus \? 'Vagas' : 'Professores'/);
});

test('status de vagas explicitamente recebido do banco ou de override continua preservado', () => {
  const { context } = createContext();
  context.course = { name: 'Capoeira', period: 'manhã', day: 'segunda-feira' };
  assert.equal(vm.runInContext('statusFor(course)', context), '');
  context.course.status = 'Últimas vagas';
  assert.equal(vm.runInContext('statusFor(course)', context), 'Últimas vagas');
  context.course.status = '';
  vm.runInContext("STATUS_OVERRIDES['capoeira|manhã|segunda-feira'] = 'Sem vagas'", context);
  assert.equal(vm.runInContext('statusFor(course)', context), 'Sem vagas');
});

test('consulta usa apenas colunas e relações confirmadas e filtra horários/oficinas ativos', async () => {
  const { context, calls } = createContext();
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'supabase');
  assert.equal(result.cursos.length, 1);
  assert.equal('aviso' in result, false);
  assert.ok(calls.some(call => call[0] === 'from' && call[1] === 'horarios'));
  assert.ok(calls.some(call => call[0] === 'eq' && call[1] === 'ativo' && call[2] === true));
  assert.ok(calls.some(call => call[0] === 'eq' && call[1] === 'oficinas.ativo' && call[2] === true));
  const selection = calls.find(call => call[0] === 'select')[1];
  for (const field of ['oficinas!inner(id,nome,descricao,idade_min,idade_max,ativo,categorias(nome))', 'professores(nome)', 'tipo', 'status']) {
    assert.ok(selection.includes(field), `select inclui ${field}`);
  }
});

test('usa fallback local quando o cliente Supabase não está disponível', async () => {
  const { context, logs } = createContext({ withClient: false });
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'local');
  assert.ok(result.cursos.length > 0);
  assert.equal('aviso' in result, false);
  assert.match(logs.warn[0][0], /Cliente Supabase indisponível/i);
});

test('usa fallback local quando a consulta do Supabase retorna erro', async () => {
  const { context, logs } = createContext({ error: { message: 'RLS/consulta indisponível' } });
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'local');
  assert.ok(result.cursos.length > 0);
  assert.equal('aviso' in result, false);
  assert.match(logs.error[0][0], /Falha ao carregar horários do Supabase/i);
});

test('usa fallback local quando Supabase responde sem horários ativos', async () => {
  const { context, logs } = createContext({ data: [] });
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'local');
  assert.ok(result.cursos.length > 0);
  assert.equal('aviso' in result, false);
  assert.match(logs.info[0][0], /não retornou horários ativos/i);
});

test('não há aviso técnico de origem no catálogo e os estados úteis permanecem', () => {
  assert.doesNotMatch(indexSource, /catalog-source-message/);
  assert.doesNotMatch(appSource, /setSourceMessage|resultado\.aviso/);
  assert.doesNotMatch(courseSource, /resultado\.aviso|mostrarAviso\(/);
  assert.match(courseSource, /console\.error\('Falha ao buscar horários do Supabase:/);
  assert.match(courseHtml, /Carregando as informações do curso/);
  assert.match(courseHtml, /Não localizamos uma oficina com esse endereço/);
  assert.match(indexSource, /id="empty-state"[^>]*>Nenhum curso encontrado/);
});
