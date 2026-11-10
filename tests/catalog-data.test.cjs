const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'dados.js'), 'utf8');
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
  const warnings = [];
  const context = {
    window: {},
    row: fixture,
    console: { error() {}, warn(...args) { warnings.push(args); } }
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
  return { context, calls, warnings };
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
});

test('consulta usa apenas colunas e relações confirmadas e filtra horários/oficinas ativos', async () => {
  const { context, calls } = createContext();
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'supabase');
  assert.equal(result.cursos.length, 1);
  assert.ok(calls.some(call => call[0] === 'from' && call[1] === 'horarios'));
  assert.ok(calls.some(call => call[0] === 'eq' && call[1] === 'ativo' && call[2] === true));
  assert.ok(calls.some(call => call[0] === 'eq' && call[1] === 'oficinas.ativo' && call[2] === true));
  const selection = calls.find(call => call[0] === 'select')[1];
  for (const field of ['oficinas!inner(id,nome,descricao,idade_min,idade_max,ativo,categorias(nome))', 'professores(nome)', 'tipo', 'status']) {
    assert.ok(selection.includes(field), `select inclui ${field}`);
  }
});

test('usa fallback local quando o cliente Supabase não está disponível', async () => {
  const { context } = createContext({ withClient: false });
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'local');
  assert.ok(result.cursos.length > 0);
  assert.match(result.aviso, /catálogo de referência local/i);
});

test('usa fallback local quando a consulta do Supabase retorna erro', async () => {
  const { context } = createContext({ error: { message: 'RLS/consulta indisponível' } });
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'local');
  assert.ok(result.cursos.length > 0);
  assert.match(result.aviso, /não foi possível consultar/i);
});

test('usa fallback local quando Supabase responde sem horários ativos', async () => {
  const { context } = createContext({ data: [] });
  const result = await vm.runInContext('buscarHorarios()', context);
  assert.equal(result.origem, 'local');
  assert.ok(result.cursos.length > 0);
  assert.match(result.aviso, /não há horários públicos visíveis/i);
});
