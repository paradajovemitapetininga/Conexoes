# Supabase — catálogo público do Conexões Polo 1

Este diretório guarda o que precisa ser aplicado no projeto
`cuameefomltdijuygzoy` para o site passar a exibir os horários reais.

## Sintoma

O site aparece normalmente, mas com o **catálogo local de referência** (a lista
embutida em `dados.js`), em vez das linhas que existem no banco. Não há aviso
na tela — a decisão é proposital: o diagnóstico fica no console do navegador
(`console.info` / `console.error`).

## Causa

A consulta pública do site é:

```js
db.from('horarios')
  .select('id,oficina_id,dia_semana,hora_inicio,hora_fim,tipo,status,ativo,' +
          'oficinas!inner(id,nome,descricao,idade_min,idade_max,ativo,categorias(nome)),' +
          'professores(nome)')
  .eq('ativo', true)
  .eq('oficinas.ativo', true)
```

Duas condições precisam ser verdadeiras ao mesmo tempo:

1. **Leitura pública liberada.** Com RLS ligado, o papel `anon` (visitante sem
   login) só enxerga as linhas cobertas por uma política de `SELECT`. Sem a
   política, a consulta volta vazia.
2. **Linhas ativas.** `horarios.ativo` e `oficinas.ativo` precisam ser `true`,
   e `horarios.oficina_id` precisa apontar para uma oficina existente.

E um detalhe que costuma pegar: o embed usa **`!inner`**, que descarta a linha
principal quando o embed não volta. Se `oficinas` estiver bloqueada, o site
recebe **zero** horários mesmo que `horarios` esteja liberada. Por isso as
políticas precisam existir nas quatro tabelas.

## Como aplicar

Supabase Dashboard → **SQL Editor** → *New query* → cole o conteúdo de
[`001_leitura_publica.sql`](001_leitura_publica.sql) → **Run**.

O script é idempotente: pode rodar mais de uma vez.

Depois, rode as consultas de verificação que estão no fim do próprio arquivo.

## Como conferir sem abrir o dashboard

Na raiz do repositório:

```bash
npm run verificar:supabase
```

O script usa a chave pública do site e mostra, em uma linha, se a leitura
pública está funcionando:

```
✅ Leitura pública OK — 62 horários visíveis
```

ou, se não estiver:

```
⚠️  Nenhum horário visível para o papel anon.
   Possíveis causas (nesta ordem):
   1) faltam as políticas de SELECT para anon -> ver 001_leitura_publica.sql
   2) as tabelas não têm linhas
   3) horarios.ativo / oficinas.ativo estão false ou null
```

## Se as tabelas estiverem vazias de verdade

A consulta `3.3` do arquivo SQL mostra onde estão as linhas. Se `total` for 0,
o banco realmente não tem dados e é preciso cadastrar:

- `categorias` — as três do site: `Esporte e Lazer`, `Educação e Conhecimento`,
  `Cultura e Artes`;
- `professores` — um registro por professor (o nome vem de
  `professores.nome`);
- `oficinas` — uma por atividade, com `nome`, `categoria_id`, `descricao`,
  `idade_min`, `idade_max` e `ativo = true`;
- `horarios` — uma linha por turno, com `oficina_id`, `professor_id`,
  `dia_semana`, `hora_inicio`, `hora_fim`, `tipo`, `status` e `ativo = true`.

Valores aceitos em `horarios.status`: `disponivel`, `sem_vagas`,
`indisponivel` (convertidos para texto em `dados.js`).
Valores conhecidos em `horarios.tipo`: `fixa` (turma com horário fixo) e
`agendamento` (oficinas combinadas direto com a equipe, como Violino,
Informática e Flauta).

## Segurança

As políticas criadas aqui são **somente de leitura** (`for select`). Nenhuma
política de `insert`, `update` ou `delete` é criada para `anon` — o número de
identificação usado pelo site é `sb_publishable_...` e ele **precisa** ser
público para o navegador conseguir ler. Quem escreve no banco usa a chave
`service_role` (a chave de serviço do projeto), que deve ficar **apenas no
servidor** e nunca no repositório.
