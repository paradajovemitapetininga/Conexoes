const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.join(__dirname, '..');
const dataSource = fs.readFileSync(path.join(root, 'dados.js'), 'utf8');
const contentSource = fs.readFileSync(path.join(root, 'curso-conteudo.js'), 'utf8');

function createContentContext() {
  const logs = { warn: [], info: [], error: [] };
  const context = {
    window: {},
    console: {
      warn(...args) { logs.warn.push(args); },
      info(...args) { logs.info.push(args); },
      error(...args) { logs.error.push(args); }
    }
  };
  vm.createContext(context);
  vm.runInContext(dataSource, context, { filename: 'dados.js' });
  vm.runInContext(contentSource, context, { filename: 'curso-conteudo.js' });
  return { context, logs };
}

test('todas as 33 oficinas regulares têm descrições específicas com chave exata', () => {
  const { context, logs } = createContentContext();
  const names = Array.from(vm.runInContext('[...new Set(courses.map(course => course.name))]', context));
  assert.equal(names.length, 33);
  const templates = vm.runInContext('Object.keys(CURSO_CONTEUDO)', context);
  const complements = vm.runInContext('Object.keys(CURSO_DESCRICOES_COMPLEMENTARES)', context);
  assert.equal(templates.length, 4);
  assert.equal(complements.length, 29);
  assert.equal(new Set([...templates, ...complements]).size, 33, 'cada slug ocorre uma única vez entre templates e complementos');
  const contents = names.map(name => {
    context.currentName = name;
    return vm.runInContext('buscarConteudoCurso(currentName)', context);
  });
  assert.equal(contents.length, 33);
  for (const [index, content] of contents.entries()) {
    assert.ok(content.texto.trim().length >= 80, `descrição de ${names[index]} está preenchida`);
    assert.ok(['projeto', 'complemento'].includes(content.origemConteudo), `origem local explícita para ${names[index]}`);
  }
  assert.equal(new Set(contents.map(content => content.texto)).size, 33, 'as oficinas não reutilizam texto idêntico indiscriminadamente');
  assert.equal(logs.warn.length, 0, 'todas as oficinas do catálogo têm cobertura sem fallback neutro');
});

test('descrição Supabase tem prioridade e não remove a imagem/cor do template correspondente', () => {
  const { context } = createContentContext();
  context.workshop = { name: 'Capoeira', descricao: 'Descrição oficial revisada pela instituição.' };
  const content = vm.runInContext('buscarConteudoCurso(workshop, workshop.descricao)', context);
  assert.equal(content.texto, 'Descrição oficial revisada pela instituição.');
  assert.equal(content.origemConteudo, 'supabase');
  assert.equal(content.imagem, 'assets/cursos/capoeira.svg');
  assert.ok(content.cores);
});

test('templates existentes são segunda prioridade e complementos locais são terceira prioridade', () => {
  const { context } = createContentContext();
  const template = vm.runInContext("buscarConteudoCurso('CAPOEIRA')", context);
  const complement = vm.runInContext("buscarConteudoCurso('Hapkido')", context);
  assert.equal(template.origemConteudo, 'projeto');
  assert.equal(template.titulo, 'Capoeira');
  assert.equal(complement.origemConteudo, 'complemento');
  assert.match(complement.texto, /^Hapkido é uma arte marcial de origem coreana/);
});

test('nomes semelhantes usam slugs exatos e descrições distintas', () => {
  const { context } = createContentContext();
  const tableTennis = vm.runInContext("buscarConteudoCurso('Tênis de mesa')", context);
  const beginnerTableTennis = vm.runInContext("buscarConteudoCurso('TÊNIS DE MESA INICIANTE')", context);
  const football = vm.runInContext("buscarConteudoCurso('Futebol masc.')", context);
  const childrenFootball = vm.runInContext("buscarConteudoCurso('Futebol masc. infantil')", context);
  assert.notEqual(tableTennis.texto, beginnerTableTennis.texto);
  assert.notEqual(football.texto, childrenFootball.texto);
  assert.equal(beginnerTableTennis.origemConteudo, 'complemento');
});

test('oficina desconhecida recebe explicação neutra e gera pendência técnica no console', () => {
  const { context, logs } = createContentContext();
  const content = vm.runInContext("buscarConteudoCurso('Oficina recém-cadastrada')", context);
  assert.equal(content.origemConteudo, 'neutro');
  assert.match(content.texto, /consulte a equipe do polo/i);
  assert.match(logs.warn[0][0], /Descrição específica pendente/);
});

test('modalidades exclusivas de agendamento não ganham horários locais ou páginas fictícias', () => {
  const { context } = createContentContext();
  const names = Array.from(vm.runInContext('[...new Set(courses.map(course => course.name))]', context));
  const bookings = Array.from(vm.runInContext('BOOKING_WORKSHOPS', context));
  for (const booking of bookings) {
    assert.ok(!names.includes(booking), `${booking} permanece apenas no fluxo de agendamento`);
  }
  assert.deepEqual(bookings.sort(), ['Flauta', 'Informática', 'Violino'].sort());
});
