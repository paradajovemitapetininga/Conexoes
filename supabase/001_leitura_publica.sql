-- =============================================================================
-- Conexões Polo 1 — leitura pública do catálogo
-- =============================================================================
-- O site lê os horários pela tabela `horarios` e embute as tabelas relacionadas:
--
--   horarios -> oficinas!inner(id,nome,descricao,idade_min,idade_max,ativo,
--                                 categorias(nome))
--           -> professores(nome)
--
-- Com Row Level Security ligado, o papel `anon` (visitante sem login) só
-- enxerga as linhas para as quais existe uma política de SELECT. Sem isso, a
-- consulta volta vazia e o site exibe o catálogo local de referência.
--
-- IMPORTANTE: as políticas precisam existir nas QUATRO tabelas. O `!inner`
-- descarta a linha de `horarios` quando o embed não volta — ou seja, se
-- `oficinas` estiver bloqueada, o site recebe zero horários mesmo com a
-- tabela `horarios` liberada.
--
-- Como aplicar: Supabase Dashboard -> SQL Editor -> novo script -> colar ->
-- Run. É seguro rodar mais de uma vez (o script remove as políticas antes de
-- recriá-las).
-- =============================================================================

-- 1) Garante o RLS ligado nas quatro tabelas ------------------------------
alter table public.horarios    enable row level security;
alter table public.oficinas    enable row level security;
alter table public.categorias  enable row level security;
alter table public.professores enable row level security;

-- 2) Recria as políticas de leitura pública -------------------------------
drop policy if exists "public read horarios"    on public.horarios;
drop policy if exists "public read oficinas"    on public.oficinas;
drop policy if exists "public read categorias"  on public.categorias;
drop policy if exists "public read professores" on public.professores;

create policy "public read horarios"    on public.horarios    for select to anon, authenticated using (true);
create policy "public read oficinas"    on public.oficinas    for select to anon, authenticated using (true);
create policy "public read categorias"  on public.categorias  for select to anon, authenticated using (true);
create policy "public read professores" on public.professores for select to anon, authenticated using (true);

-- 3) Verificação -----------------------------------------------------------
-- Rode estas consultas depois de aplicar o script. Se a contagem vier 0, o
-- problema não é a política: são os filtros `ativo` (veja a query abaixo).

-- 3.1) As políticas existem?
select tablename, policyname, cmd, roles
from pg_stat_policies
where schemaname = 'public'
order by tablename, policyname;

-- 3.2) Quantas linhas ativas a consulta do site enxerga?
select count(*) as linhas_visiveis
from public.horarios h
join public.oficinas o on o.id = h.oficina_id
where h.ativo is true
  and o.ativo is true;

-- 3.3) Se a contagem acima for 0, onde estão as linhas?
select
  count(*)                                   as total,
  count(*) filter (where h.ativo is true)     as horario_ativo,
  count(*) filter (where o.ativo is true)     as oficina_ativa,
  count(*) filter (where o.id is null)         as oficina_ausente
from public.horarios h
left join public.oficinas o on o.id = h.oficina_id;

-- 3.4) Amostra do que o visitante vai enxergar
select
  h.id            as horario_id,
  o.id            as oficina_id,
  o.nome          as oficina,
  c.nome          as categoria,
  p.nome          as professor,
  h.dia_semana,
  h.hora_inicio,
  h.hora_fim,
  h.tipo,
  h.status,
  h.ativo
from public.horarios h
join public.oficinas o on o.id = h.oficina_id
left join public.categorias c on c.id = o.categoria_id
left join public.professores p on p.id = h.professor_id
order by h.dia_semana, h.hora_inicio
limit 20;
