/* =============================================================================
   dados.js — dados e utilitários compartilhados
   Consumido por app.js (catálogo) e curso.js (página de curso).
   Mantém em um único lugar a lista local de referência, as regras de status
   de vagas e a consulta de leitura ao Supabase.
   ============================================================================= */

/* --- Supabase (somente leitura) ------------------------------------------ */
const SUPABASE_URL = "https://cuameefomltdijuygzoy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7lLG9eRfGVc3PKp19b1Ogg_eFnEiORu";

/* --- Status de vagas ------------------------------------------------------ */
/* Atualize os valores abaixo quando a instituição confirmar as vagas. */
const STATUS_OVERRIDES = {
  // Exemplo: 'teatro|manhã|segunda-feira': 'Últimas vagas'
};
const DEFAULT_STATUS = 'Vagas disponíveis';

/* --- Oficinas com agendamento via WhatsApp (sem horário fixo) ------------ */
const BOOKING_WORKSHOPS = ['Violino', 'Informática', 'Flauta'];

/* --- Catálogo local de referência (fallback quando o Supabase falha) ------ */
const courses = [
  ['Teatro','Cultura e Artes','manhã','segunda-feira','8h–9h','Silvina'],['Alongamento Danjeon','Esporte e Lazer','manhã','segunda-feira','8h–9h','Marcos'],['Alongamento','Esporte e Lazer','manhã','quinta-feira','8h30–9h30','Renato'],['Hapkido','Esporte e Lazer','manhã','segunda-feira','9h–10h','Marcos'],['Desenho','Educação e Conhecimento','manhã','quarta-feira','9h–10h','Grazi'],['Musicalização','Educação e Conhecimento','manhã','quinta-feira','9h–10h','Seme'],['Dança / Jazz iniciante','Esporte e Lazer','manhã','quinta-feira','9h30–10h30','Renato'],['Capoeira','Esporte e Lazer','manhã','quarta-feira','10h–11h','Grazi'],['Violão juvenil e adulto iniciante','Educação e Conhecimento','manhã','quinta-feira','10h–11h','Seme'],['Tênis de mesa','Esporte e Lazer','manhã','quarta-feira','10h–12h','Felipe'],['Jazz intermediário','Esporte e Lazer','manhã','quinta-feira','10h30–11h30','Renato'],['Sapateado juvenil e adulto','Cultura e Artes','manhã','quinta-feira','10h45','—'],
  ['Tênis de mesa iniciante','Esporte e Lazer','tarde','segunda-feira','14h–15h','Guilherme'],['Desenho','Educação e Conhecimento','tarde','quarta-feira','14h–15h','Grazi'],['Musicalização','Educação e Conhecimento','tarde','quinta-feira','14h–15h','Seme'],['Tênis de mesa','Esporte e Lazer','tarde','sexta-feira','14h30–15h30','Felipe'],['Bateria','Educação e Conhecimento','tarde','terça-feira','14h–15h','Caldana'],['Tênis de mesa iniciante','Esporte e Lazer','tarde','quinta-feira','14h–15h','Guilherme Correa'],['Violão iniciante infantil','Educação e Conhecimento','tarde','segunda-feira','14h–15h','Fábio'],['Tênis de mesa','Esporte e Lazer','tarde','terça-feira','14h–16h','Felipe'],['Ballet','Cultura e Artes','tarde','quinta-feira','14h–15h','Carolina','4 a 5 anos'],['Coral','Cultura e Artes','tarde','segunda-feira','15h–16h','Silvia'],['Xadrez','Educação e Conhecimento','tarde','terça-feira','15h–16h','Marcos'],['Violão iniciante infantil','Educação e Conhecimento','tarde','quinta-feira','15h–16h','Seme'],['Violão iniciante juvenil','Educação e Conhecimento','tarde','segunda-feira','15h–16h','Fábio'],['Bateria','Educação e Conhecimento','tarde','terça-feira','15h–16h','Caldana'],['Futebol masc. infantil','Esporte e Lazer','tarde','quinta-feira','15h–16h','Guilherme'],['Futebol kids','Esporte e Lazer','tarde','segunda-feira','15h–16h','Guilherme'],['Artesanato','Cultura e Artes','tarde','terça-feira','15h–16h','Silvia'],['Ballet','Cultura e Artes','tarde','quinta-feira','15h–16h','Carolina','6 a 10 anos'],['Teatro','Cultura e Artes','tarde','segunda-feira','15h–16h','Silvina'],['Coral','Cultura e Artes','tarde','segunda-feira','16h–17h','Silvia'],['Futebol masc.','Esporte e Lazer','tarde','terça-feira','16h–17h','Guilherme Correa'],['Desenho','Educação e Conhecimento','tarde','quarta-feira','16h–17h','Grazi'],['Violão intermediário / avançado','Educação e Conhecimento','tarde','quinta-feira','16h–17h','Seme'],['Violão','Educação e Conhecimento','tarde','sexta-feira','16h–17h','Fábio'],['Abadá Capoeira','Esporte e Lazer','tarde','terça-feira','16h–17h','Negão'],['Hapkido','Esporte e Lazer','tarde','quarta-feira','16h–17h','Marcos'],['Jazz infantojuvenil','Esporte e Lazer','tarde','quinta-feira','16h–17h','Carolina'],['Tênis de mesa','Esporte e Lazer','tarde','sexta-feira','16h30–18h30','Felipe'],['Teatro','Cultura e Artes','tarde','segunda-feira','16h–17h','Silvina'],['Bateria','Educação e Conhecimento','tarde','terça-feira','16h–17h','Caldana'],['Artesanato','Cultura e Artes','tarde','terça-feira','16h–17h','Silvia'],['Coral','Cultura e Artes','tarde','segunda-feira','17h–18h','Silvia'],['Futebol masc.','Esporte e Lazer','tarde','terça-feira','17h–18h','Guilherme Correa'],['Desenho','Educação e Conhecimento','tarde','quarta-feira','17h–18h','Grazi'],['Fanfarra','Cultura e Artes','tarde','quinta-feira','17h–18h','Seme'],['Violão','Educação e Conhecimento','tarde','sexta-feira','17h–18h','Fábio'],['Bateria','Educação e Conhecimento','tarde','terça-feira','17h–18h','Caldana'],['Ballet juvenil adulto','Cultura e Artes','tarde','quinta-feira','17h–18h','Carolina'],['Artesanato','Cultura e Artes','tarde','terça-feira','17h–18h','Silvia'],['Inglês','Educação e Conhecimento','tarde','quinta-feira','17h–18h','Daniele'],['Tênis de mesa','Esporte e Lazer','tarde','quinta-feira','17h–20h','Felipe'],
  ['Teatro juvenil adulto','Cultura e Artes','noite','segunda-feira','18h–19h','Silvina'],['Artesanato infantil','Cultura e Artes','noite','segunda-feira','18h–19h','Silvia'],['Desenho','Educação e Conhecimento','noite','quarta-feira','18h–19h','Grazi'],['Musicalização','Educação e Conhecimento','noite','quinta-feira','18h–19h','Seme'],['Violão','Educação e Conhecimento','noite','sexta-feira','18h–19h','Fábio'],['Bateria','Educação e Conhecimento','noite','terça-feira','18h–19h','Caldana'],['Inglês','Educação e Conhecimento','noite','quinta-feira','18h–19h','Daniele'],['Alongamento','Esporte e Lazer','noite','terça-feira','18h–19h','Leandro'],['Ballet','Cultura e Artes','noite','quinta-feira','18h–19h','Carolina','4 a 5 anos'],['Xadrez','Educação e Conhecimento','noite','terça-feira','18h–19h','Tulio'],['Bateria','Educação e Conhecimento','noite','terça-feira','19h–19h30','Caldana'],['Xadrez','Educação e Conhecimento','noite','terça-feira','19h–20h','Tulio'],['Expressão corporal adulto','Cultura e Artes','noite','quinta-feira','19h–20h','Carolina'],
].map(([name,category,period,day,time,instructor,age])=>({name,category,period,day,time,instructor,age}));

/* --- Utilitários de texto e slug ----------------------------------------- */
/* Normaliza um texto para usar em URLs (sem acentos, espaços ou barras). */
const slug = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* Slug estável de um curso — recebe o nome (string) ou o objeto do curso. */
const courseSlug = (course) => slug(typeof course === 'string' ? course : (course && course.name) || '');

const isBookingWorkshop = (courseOrName) => {
  const course = courseOrName && typeof courseOrName === 'object' ? courseOrName : null;
  const name = course ? course.name : courseOrName;
  const normalizedName = String(name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  const isBookingName = BOOKING_WORKSHOPS.some(item => {
    const base = item.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return normalizedName === base || normalizedName.startsWith(base + ' ');
  });
  if (!isBookingName) return false;
  /* Uma turma com horário real permanece no catálogo, mesmo que a oficina
     também aceite agendamento por WhatsApp. */
  if (course && (course.hasFixedSchedule || (course.day && course.time && course.time !== 'Horário não informado'))) return false;
  return true;
};

const courseDetailsUrl = (course) => {
  const id = String(course ? (course.oficinaId ?? course.id) : '').trim();
  if (/^[1-9]\d*$/.test(id)) return `curso.html?id=${encodeURIComponent(id)}`;
  const courseId = courseSlug(course);
  if (!courseId) {
    console.warn('Link de detalhes omitido: curso sem ID válido e sem slug.', course);
    return '';
  }
  return `curso.html?c=${encodeURIComponent(courseId)}`;
};

function filtrarHorariosDoCurso(horarios, id, slugCurso, temId) {
  const lista = Array.isArray(horarios) ? horarios : [];
  if (temId) {
    const idValido = String(id || '').trim();
    if (!/^[1-9]\d*$/.test(idValido)) return [];
    return lista.filter(curso => String(curso.oficinaId ?? curso.id ?? '') === idValido);
  }
  const alvo = slug(slugCurso);
  if (!alvo) return [];
  return lista.filter(curso => courseSlug(curso) === alvo);
}

function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }

/* --- Status de vagas ------------------------------------------------------ */
function statusFor(course) { if (course.status) return course.status; const key = `${slug(course.name)}|${course.period}|${course.day}`; return STATUS_OVERRIDES[key] || DEFAULT_STATUS; }
function statusClass(status) {
  const value = String(status || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (value.includes('lotad') || value.includes('sem vaga') || value.includes('indispon')) return 'status-full';
  if (value.includes('ult')) return 'status-last';
  return 'status-open';
}

/* --- Normalização das linhas do banco ------------------------------------ */
function normalizarCategoria(value) {
  const text = String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (text.includes('esporte') || text.includes('sport') || text.includes('lazer')) return 'Esporte e Lazer';
  if (text.includes('cultura') || text.includes('arte')) return 'Cultura e Artes';
  if (text.includes('educacao') || text.includes('education') || text.includes('conhecimento')) return 'Educação e Conhecimento';
  return value || 'Outras atividades';
}
function nomeDia(value) {
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  if (typeof value === 'number' || /^[0-9]+$/.test(String(value))) return dias[Number(value)] || String(value);
  return String(value || '—');
}
function formatarHora(value) {
  if (!value) return '';
  const match = String(value).match(/^([0-9]{1,2}):([0-9]{2})/);
  if (!match) return String(value);
  return `${Number(match[1])}h${match[2] === '00' ? '' : match[2]}`;
}
function periodoDaLinha(row) {
  const explicit = String(row.periodo || row.period || '').toLowerCase();
  if (explicit.includes('manhã') || explicit.includes('manha') || explicit.includes('tarde') || explicit.includes('noite')) return explicit;
  const hour = Number(String(row.hora_inicio || '').split(':')[0]);
  if (!Number.isFinite(hour)) return 'horário não informado';
  return hour < 12 ? 'manhã' : hour < 18 ? 'tarde' : 'noite';
}
/* Formata a faixa etária somente quando os limites existem no banco. */
function faixaEtaria(oficina) {
  if (oficina.faixa_etaria) return oficina.faixa_etaria;
  const min = oficina.idade_min !== null && oficina.idade_min !== undefined && oficina.idade_min !== '' && Number.isFinite(Number(oficina.idade_min)) ? Number(oficina.idade_min) : null;
  const max = oficina.idade_max !== null && oficina.idade_max !== undefined && oficina.idade_max !== '' && Number.isFinite(Number(oficina.idade_max)) ? Number(oficina.idade_max) : null;
  if (min !== null && max !== null) return `${min} a ${max} anos`;
  if (min !== null) return `A partir de ${min} anos`;
  if (max !== null) return `Até ${max} anos`;
  return '';
}

function statusDeBanco(value) {
  const status = String(value || '').trim().toLowerCase();
  if (status === 'sem_vagas') return 'Sem vagas';
  if (status === 'indisponivel') return 'Indisponível';
  if (status === 'disponivel') return 'Vagas disponíveis';
  return value || '';
}

/* Converte uma linha de "horarios" no mesmo formato usado pelo catálogo. */
function normalizarHorario(row) {
  const oficina = row.oficinas || {};
  const professor = row.professores || {};
  const inicio = formatarHora(row.hora_inicio), fim = formatarHora(row.hora_fim);
  return {
    id: oficina.id ?? row.oficina_id ?? null,
    oficinaId: oficina.id ?? row.oficina_id ?? null,
    horarioId: row.id ?? null,
    name: oficina.nome || row.nome || 'Atividade',
    descricao: oficina.descricao || '',
    category: normalizarCategoria(oficina.categorias?.nome || row.categoria),
    period: periodoDaLinha(row),
    day: nomeDia(row.dia_semana),
    time: inicio && fim ? `${inicio}–${fim}` : inicio || fim || 'Horário não informado',
    instructor: professor.nome || row.professor || '—',
    age: faixaEtaria(oficina) || row.faixa_etaria || '',
    status: statusDeBanco(row.status),
    scheduleType: row.tipo || '',
    hasFixedSchedule: Boolean(row.dia_semana !== null && row.dia_semana !== undefined && (row.hora_inicio || row.hora_fim))
  };
}

/* --- Consulta de horários no Supabase ------------------------------------ */
/* Busca os horários públicos. Sempre devolve {cursos, origem, aviso}:
   - cursos: lista normalizada (vinda do banco ou o catálogo local);
   - origem: 'supabase' | 'local';
   - aviso: mensagem opcional para exibir quando o fallback local foi usado. */
async function buscarHorarios() {
  if (!window.supabase || !window.supabase.createClient) {
    return {
      cursos: courses,
      origem: 'local',
      aviso: 'Não foi possível carregar o Supabase. Exibindo o catálogo de referência local.'
    };
  }
  try {
    const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    const { data, error } = await db.from('horarios')
      .select('id,oficina_id,dia_semana,hora_inicio,hora_fim,tipo,status,ativo,oficinas!inner(id,nome,descricao,idade_min,idade_max,ativo,categorias(nome)),professores(nome)')
      .eq('ativo', true)
      .eq('oficinas.ativo', true)
      .order('dia_semana')
      .order('hora_inicio');
    if (error) throw error;
    const horarios = (data || []).map(normalizarHorario).filter(item => item.name && !isBookingWorkshop(item));
    if (horarios.length) {
      return { cursos: horarios, origem: 'supabase', aviso: '' };
    }
    return {
      cursos: courses,
      origem: 'local',
      aviso: 'O Supabase respondeu, mas não há horários públicos visíveis no momento. Exibindo o catálogo de referência local. Verifique se há registros em “horarios” e se a política de leitura pública permite acessá-los.'
    };
  } catch (error) {
    console.error('Falha ao carregar horários do Supabase:', error);
    return {
      cursos: courses,
      origem: 'local',
      aviso: 'Não foi possível consultar os horários no Supabase. Exibindo o catálogo de referência local; confira a configuração da tabela e as permissões de leitura.'
    };
  }
}
