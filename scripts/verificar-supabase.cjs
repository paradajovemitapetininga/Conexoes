#!/usr/bin/env node
/* =============================================================================
   verificar-supabase.cjs — confere se a leitura pública do catálogo funciona
   -----------------------------------------------------------------------------
   Usa a chave pública do site (a mesma que está em dados.js) para fazer a
   MESMA consulta que o site faz e informa se o visitante enxerga os horários
   reais ou se o catálogo local de referência está sendo usado.

   Uso:  npm run verificar:supabase
   Saída: código 0 quando está tudo certo, 1 quando há algo a resolver.
   ============================================================================= */

const fs = require('node:fs');
const path = require('node:path');

const RAIZ = path.join(__dirname, '..');

/* Lê a URL e a chave pública direto do dados.js (fonte única de verdade). */
function lerConfiguracao() {
  const fonte = fs.readFileSync(path.join(RAIZ, 'dados.js'), 'utf8');
  const url = fonte.match(/SUPABASE_URL\s*=\s*["']([^"']+)["']/);
  const chave = fonte.match(/SUPABASE_PUBLISHABLE_KEY\s*=\s*["']([^"']+)["']/);
  if (!url || !chave) throw new Error('Não encontrei SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY em dados.js');
  return { url: url[1], chave: chave[1] };
}

/* A mesma seleção usada por dados.js na consulta de horários. */
const SELECAO = 'id,oficina_id,dia_semana,hora_inicio,hora_fim,tipo,status,ativo,' +
  'oficinas!inner(id,nome,descricao,idade_min,idade_max,ativo,categorias(nome)),' +
  'professores(nome)';

async function consultar(config, tabela, query = 'select=*') {
  const resposta = await fetch(`${config.url}/rest/v1/${tabela}?${query}`, {
    headers: { apikey: config.chave, Authorization: `Bearer ${config.chave}` }
  });
  const corpo = await resposta.text();
  let dados = null;
  try { dados = JSON.parse(corpo); } catch { /* resposta não-JSON */ }
  return { status: resposta.status, dados, corpo };
}

function linha(ok, texto) {
  console.log(`${ok ? '✅' : '⚠️ '} ${texto}`);
}

(async () => {
  const config = lerConfiguracao();
  console.log(`Projeto: ${config.url}\n`);

  /* 1) As quatro tabelas respondem? */
  let tabelasOk = true;
  for (const tabela of ['horarios', 'oficinas', 'categorias', 'professores']) {
    const r = await consultar(config, tabela, 'select=*&limit=1');
    const ok = r.status === 200;
    tabelasOk = tabelasOk && ok;
    linha(ok, `${tabela.padEnd(12)} responde HTTP ${r.status}`);
  }
  if (!tabelasOk) {
    console.log('\nAs tabelas não estão respondendo. Verifique se a URL e a chave continuam válidas.');
    process.exit(1);
  }

  /* 2) A consulta exata do site devolve linhas? */
  const consulta = new URLSearchParams({
    select: SELECAO,
    ativo: 'eq.true',
    'oficinas.ativo': 'eq.true'
  });
  const r = await consultar(config, 'horarios', consulta.toString());
  const linhas = Array.isArray(r.dados) ? r.dados.length : 0;

  console.log('');
  if (r.status !== 200) {
    linha(false, `A consulta do site falhou (HTTP ${r.status}): ${String(r.corpo).slice(0, 200)}`);
  } else if (linhas > 0) {
    linha(true, `Leitura pública OK — ${linhas} horário(s) visível(is) para o papel anon.`);
    const primeiro = r.dados[0] || {};
    const oficina = primeiro.oficinas || {};
    console.log(`   Exemplo: ${oficina.nome || '(sem nome)'} — ${primeiro.dia_semana ?? '?'} ${String(primeiro.hora_inicio || '').slice(0, 5)}`);
  } else {
    linha(false, 'Nenhum horário visível para o papel anon. O site está usando o catálogo local de referência.');
    console.log('\n   Possíveis causas (verifique nesta ordem):');
    console.log('   1) Faltam as políticas de SELECT para anon — ver supabase/001_leitura_publica.sql');
    console.log('   2) As tabelas não têm nenhuma linha');
    console.log('   3) horarios.ativo ou oficinas.ativo estão false/null');
    console.log('      (a query 3.3 do arquivo SQL mostra onde as linhas estão)');
    console.log('   4) horarios.oficina_id não aponta para uma oficina existente');
  }

  /* 3) Diagnóstico de tabelas vazias x política ausente. */
  console.log('');
  for (const tabela of ['oficinas', 'categorias', 'professores']) {
    const r2 = await consultar(config, tabela, 'select=*');
    const total = Array.isArray(r2.dados) ? r2.dados.length : 0;
    console.log(`   ${tabela.padEnd(12)} linhas visíveis para anon: ${total}${total === 0 ? '  (política ausente ou tabela vazia)' : ''}`);
  }

  process.exit(linhas > 0 ? 0 : 1);
})().catch(erro => {
  console.error('Erro ao verificar o Supabase:', erro.message);
  process.exit(2);
});
