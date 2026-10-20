/* Atualize os valores abaixo quando a instituição confirmar as vagas. */
const STATUS_OVERRIDES = {
  // Exemplo: 'teatro|manhã|segunda-feira': 'Últimas vagas'
};
const DEFAULT_STATUS = 'Vagas disponíveis';

const courses = [
  ['Teatro','Cultura e Artes','manhã','segunda-feira','8h–9h','Silvina'],['Alongamento Danjeon','Esporte e Lazer','manhã','segunda-feira','8h–9h','Marcos'],['Alongamento','Esporte e Lazer','manhã','quinta-feira','8h30–9h30','Renato'],['Hapkido','Esporte e Lazer','manhã','segunda-feira','9h–10h','Marcos'],['Desenho','Educação e Conhecimento','manhã','quarta-feira','9h–10h','Grazi'],['Musicalização','Educação e Conhecimento','manhã','quinta-feira','9h–10h','Seme'],['Dança / Jazz iniciante','Esporte e Lazer','manhã','quinta-feira','9h30–10h30','Renato'],['Capoeira','Esporte e Lazer','manhã','quarta-feira','10h–11h','Grazi'],['Violão juvenil e adulto iniciante','Educação e Conhecimento','manhã','quinta-feira','10h–11h','Seme'],['Tênis de mesa','Esporte e Lazer','manhã','quarta-feira','10h–12h','Felipe'],['Jazz intermediário','Esporte e Lazer','manhã','quinta-feira','10h30–11h30','Renato'],['Sapateado juvenil e adulto','Cultura e Artes','manhã','quinta-feira','10h45','—'],
  ['Tênis de mesa iniciante','Esporte e Lazer','tarde','segunda-feira','14h–15h','Guilherme'],['Desenho','Educação e Conhecimento','tarde','quarta-feira','14h–15h','Grazi'],['Musicalização','Educação e Conhecimento','tarde','quinta-feira','14h–15h','Seme'],['Tênis de mesa','Esporte e Lazer','tarde','sexta-feira','14h30–15h30','Felipe'],['Bateria','Educação e Conhecimento','tarde','terça-feira','14h–15h','Caldana'],['Tênis de mesa iniciante','Esporte e Lazer','tarde','quinta-feira','14h–15h','Guilherme Correa'],['Violão iniciante infantil','Educação e Conhecimento','tarde','segunda-feira','14h–15h','Fábio'],['Tênis de mesa','Esporte e Lazer','tarde','terça-feira','14h–16h','Felipe'],['Ballet','Cultura e Artes','tarde','quinta-feira','14h–15h','Carolina','4 a 5 anos'],['Coral','Cultura e Artes','tarde','segunda-feira','15h–16h','Silvia'],['Xadrez','Educação e Conhecimento','tarde','terça-feira','15h–16h','Marcos'],['Violão iniciante infantil','Educação e Conhecimento','tarde','quinta-feira','15h–16h','Seme'],['Violão iniciante juvenil','Educação e Conhecimento','tarde','segunda-feira','15h–16h','Fábio'],['Bateria','Educação e Conhecimento','tarde','terça-feira','15h–16h','Caldana'],['Futebol masc. infantil','Esporte e Lazer','tarde','quinta-feira','15h–16h','Guilherme'],['Futebol kids','Esporte e Lazer','tarde','segunda-feira','15h–16h','Guilherme'],['Artesanato','Cultura e Artes','tarde','terça-feira','15h–16h','Silvia'],['Ballet','Cultura e Artes','tarde','quinta-feira','15h–16h','Carolina','6 a 10 anos'],['Teatro','Cultura e Artes','tarde','segunda-feira','15h–16h','Silvina'],['Coral','Cultura e Artes','tarde','segunda-feira','16h–17h','Silvia'],['Futebol masc.','Esporte e Lazer','tarde','terça-feira','16h–17h','Guilherme Correa'],['Desenho','Educação e Conhecimento','tarde','quarta-feira','16h–17h','Grazi'],['Violão intermediário / avançado','Educação e Conhecimento','tarde','quinta-feira','16h–17h','Seme'],['Violão','Educação e Conhecimento','tarde','sexta-feira','16h–17h','Fábio'],['Abadá Capoeira','Esporte e Lazer','tarde','terça-feira','16h–17h','Negão'],['Hapkido','Esporte e Lazer','tarde','quarta-feira','16h–17h','Marcos'],['Jazz infantojuvenil','Esporte e Lazer','tarde','quinta-feira','16h–17h','Carolina'],['Tênis de mesa','Esporte e Lazer','tarde','sexta-feira','16h30–18h30','Felipe'],['Teatro','Cultura e Artes','tarde','segunda-feira','16h–17h','Silvina'],['Bateria','Educação e Conhecimento','tarde','terça-feira','16h–17h','Caldana'],['Artesanato','Cultura e Artes','tarde','terça-feira','16h–17h','Silvia'],['Coral','Cultura e Artes','tarde','segunda-feira','17h–18h','Silvia'],['Futebol masc.','Esporte e Lazer','tarde','terça-feira','17h–18h','Guilherme Correa'],['Desenho','Educação e Conhecimento','tarde','quarta-feira','17h–18h','Grazi'],['Fanfarra','Cultura e Artes','tarde','quinta-feira','17h–18h','Seme'],['Violão','Educação e Conhecimento','tarde','sexta-feira','17h–18h','Fábio'],['Bateria','Educação e Conhecimento','tarde','terça-feira','17h–18h','Caldana'],['Ballet juvenil adulto','Cultura e Artes','tarde','quinta-feira','17h–18h','Carolina'],['Artesanato','Cultura e Artes','tarde','terça-feira','17h–18h','Silvia'],['Inglês','Educação e Conhecimento','tarde','quinta-feira','17h–18h','Daniele'],['Tênis de mesa','Esporte e Lazer','tarde','quinta-feira','17h–20h','Felipe'],
  ['Teatro juvenil adulto','Cultura e Artes','noite','segunda-feira','18h–19h','Silvina'],['Artesanato infantil','Cultura e Artes','noite','segunda-feira','18h–19h','Silvia'],['Desenho','Educação e Conhecimento','noite','quarta-feira','18h–19h','Grazi'],['Musicalização','Educação e Conhecimento','noite','quinta-feira','18h–19h','Seme'],['Violão','Educação e Conhecimento','noite','sexta-feira','18h–19h','Fábio'],['Bateria','Educação e Conhecimento','noite','terça-feira','18h–19h','Caldana'],['Inglês','Educação e Conhecimento','noite','quinta-feira','18h–19h','Daniele'],['Alongamento','Esporte e Lazer','noite','terça-feira','18h–19h','Leandro'],['Ballet','Cultura e Artes','noite','quinta-feira','18h–19h','Carolina','4 a 5 anos'],['Xadrez','Educação e Conhecimento','noite','terça-feira','18h–19h','Tulio'],['Bateria','Educação e Conhecimento','noite','terça-feira','19h–19h30','Caldana'],['Xadrez','Educação e Conhecimento','noite','terça-feira','19h–20h','Tulio'],['Expressão corporal adulto','Cultura e Artes','noite','quinta-feira','19h–20h','Carolina'],
].map(([name,category,period,day,time,instructor,age])=>({name,category,period,day,time,instructor,age}));
let visibleCourses = courses;

const categoryInfo = {
  'Esporte e Lazer': {className:'sport', icon:'◉'},
  'Educação e Conhecimento': {className:'education', icon:'✦'},
  'Cultura e Artes': {className:'culture', icon:'✽'}
};
const IMAGE_STORE_KEY = 'conexoes-polo1-images';
const imageStore = JSON.parse(localStorage.getItem(IMAGE_STORE_KEY) || '{}');
function saveImages(){localStorage.setItem(IMAGE_STORE_KEY, JSON.stringify(imageStore));}
function applyImage(id, key){const image=document.querySelector(`#${id}`);if(!image)return;const value=imageStore[key];if(value){image.src=value;image.hidden=false;}}
function applyBrand(){const value=imageStore.logo;if(value)document.querySelectorAll('.site-logo').forEach(image=>{image.src=value;image.hidden=false})}
function applyCampus(){const hasPhoto=Boolean(imageStore.campus1||imageStore.campus2);document.querySelector('.campus-art')?.classList.toggle('has-photos',hasPhoto);applyImage('campus-photo-one','campus1');applyImage('campus-photo-two','campus2');}
const slug = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const isBookingWorkshop = (name) => /^(violino|informatica|flauta)(?:\b|$)/i.test(String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,''));
function statusFor(course){if(course.status)return course.status;const key=`${slug(course.name)}|${course.period}|${course.day}`;return STATUS_OVERRIDES[key] || DEFAULT_STATUS}
function statusClass(status){return status.toLowerCase().includes('lotad')?'status-full':status.toLowerCase().includes('últ')?'status-last':'status-open'}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function render(){
  const term=document.querySelector('#search').value.trim().toLowerCase();
  const period=document.querySelector('.filter-btn.is-active')?.dataset.period || 'todos';
  const filtered=visibleCourses.filter(c=>!isBookingWorkshop(c.name)).filter(c=>{const haystack=[c.name,c.category,c.period,c.day,c.instructor,c.age||''].join(' ').toLowerCase();return (!term||haystack.includes(term))&&(period==='todos'||c.period.includes(period))});
  const root=document.querySelector('#catalog-grid');root.innerHTML='';
  const extraCategories=[...new Set(filtered.map(c=>c.category).filter(category=>category&&!categoryInfo[category]))];
  [...Object.keys(categoryInfo),...extraCategories].forEach(category=>{
    const items=filtered.filter(c=>c.category===category); if(!items.length)return;
    const info=categoryInfo[category]||{className:'education',icon:'✦'};const section=document.createElement('section');section.className=`category-section category-${info.className}`;section.innerHTML=`<div class="category-head"><div><h3>${escapeHtml(category)}</h3><p>${items.length} ${items.length===1?'horário':'horários'} encontrados</p></div></div><div class="course-list"></div>`;
    const list=section.querySelector('.course-list');items.forEach(c=>{const status=statusFor(c);const card=document.createElement('article');card.className='course-card';card.innerHTML=`<div class="course-top"><div><h4>${escapeHtml(c.name)}</h4><dl><dt>Dia:</dt> <dd>${escapeHtml(c.day)}</dd><br><dt>Horário:</dt> <dd>${escapeHtml(c.time)}</dd><br><dt>Professor:</dt> <dd>${escapeHtml(c.instructor)}</dd></dl></div><span class="status ${statusClass(status)}">${escapeHtml(status)}</span></div><div class="meta-row">${c.age?`<span class="tag">${escapeHtml(c.age)}</span>`:''}<span class="tag">${escapeHtml(c.period)}</span></div>`;list.appendChild(card)});root.appendChild(section);
  });
  document.querySelector('#empty-state').hidden=filtered.length!==0;
}
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');render()}));
document.querySelector('#search').addEventListener('input',render);
const toggle=document.querySelector('.menu-toggle');toggle.addEventListener('click',()=>{const nav=document.querySelector('#site-nav');const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#site-nav').classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));
document.querySelectorAll('input[data-image-key]').forEach(input=>input.addEventListener('change',()=>{const file=input.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{imageStore[input.dataset.imageKey]=reader.result;saveImages();applyBrand();applyCampus();render()};reader.readAsDataURL(file)}));
const resetImages=document.querySelector('#reset-images');if(resetImages)resetImages.addEventListener('click',()=>{Object.keys(imageStore).forEach(key=>delete imageStore[key]);saveImages();applyBrand();document.querySelector('#campus-photo-one').src='/campus-1.jpg';document.querySelector('#campus-photo-two').src='/campus-2.jpg';document.querySelectorAll('.campus-photo').forEach(image=>{image.hidden=false});document.querySelector('.campus-art')?.classList.remove('has-photos');render()});
applyBrand();applyCampus();
render();

const SUPABASE_URL = "https://cuameefomltdijuygzoy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7lLG9eRfGVc3PKp19b1Ogg_eFnEiORu";
const sourceMessage = document.querySelector('#catalog-source-message');
function setSourceMessage(message){if(!sourceMessage)return;sourceMessage.textContent=message;sourceMessage.hidden=!message}
function normalizarCategoria(value){
  const text=String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(text.includes('esporte')||text.includes('sport')||text.includes('lazer'))return 'Esporte e Lazer';
  if(text.includes('cultura')||text.includes('arte'))return 'Cultura e Artes';
  if(text.includes('educacao')||text.includes('education')||text.includes('conhecimento'))return 'Educação e Conhecimento';
  return value||'Outras atividades';
}
function nomeDia(value){
  const dias=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  if(typeof value==='number'||/^[0-9]+$/.test(String(value)))return dias[Number(value)]||String(value);
  return String(value||'—');
}
function formatarHora(value){
  if(!value)return '';
  const match=String(value).match(/^([0-9]{1,2}):([0-9]{2})/);
  if(!match)return String(value);
  return `${Number(match[1])}h${match[2]==='00'?'':match[2]}`;
}
function periodoDaLinha(row){
  const explicit=String(row.periodo||row.period||'').toLowerCase();
  if(explicit.includes('manhã')||explicit.includes('manha')||explicit.includes('tarde')||explicit.includes('noite'))return explicit;
  const hour=Number(String(row.hora_inicio||'').split(':')[0]);
  if(!Number.isFinite(hour))return 'horário não informado';
  return hour<12?'manhã':hour<18?'tarde':'noite';
}
function normalizarHorario(row){
  const oficina=row.oficinas||{};
  const professor=row.professores||{};
  const inicio=formatarHora(row.hora_inicio), fim=formatarHora(row.hora_fim);
  return {
    name:oficina.nome||row.nome||'Atividade',
    category:normalizarCategoria(oficina.categorias?.nome||row.categoria),
    period:periodoDaLinha(row),
    day:nomeDia(row.dia_semana),
    time:inicio&&fim?`${inicio}–${fim}`:inicio||fim||'Horário não informado',
    instructor:professor.nome||row.professor||'—',
    age:oficina.faixa_etaria||row.faixa_etaria||'',
    status:row.status||''
  };
}
async function carregarCursos(){
  if(!window.supabase?.createClient){
    visibleCourses=courses;
    setSourceMessage('Não foi possível carregar o Supabase. Exibindo o catálogo de referência local.');
    render();
    return;
  }
  try{
    const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
    const {data,error}=await db.from('horarios')
      .select('dia_semana,hora_inicio,hora_fim,status,oficinas(nome,categorias(nome)),professores(nome)')
      .order('dia_semana');
    if(error)throw error;
    const horarios=(data||[]).map(normalizarHorario).filter(item=>item.name&&!isBookingWorkshop(item.name));
    if(horarios.length){
      visibleCourses=horarios;
      setSourceMessage('');
    }else{
      visibleCourses=courses;
      setSourceMessage('O Supabase respondeu, mas não há horários públicos visíveis no momento. Exibindo o catálogo de referência local. Verifique se há registros em “horarios” e se a política de leitura pública permite acessá-los.');
    }
  }catch(error){
    console.error('Falha ao carregar horários do Supabase:',error);
    visibleCourses=courses;
    setSourceMessage('Não foi possível consultar os horários no Supabase. Exibindo o catálogo de referência local; confira a configuração da tabela e as permissões de leitura.');
  }
  render();
}

applyBrand();
applyCampus();
render();
carregarCursos();
