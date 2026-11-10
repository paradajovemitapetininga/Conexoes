const WEEK_DAYS = [
  {value:'segunda-feira',label:'Segunda-feira',key:'segunda'},
  {value:'terça-feira',label:'Terça-feira',key:'terca'},
  {value:'quarta-feira',label:'Quarta-feira',key:'quarta'},
  {value:'quinta-feira',label:'Quinta-feira',key:'quinta'},
  {value:'sexta-feira',label:'Sexta-feira',key:'sexta'}
];
const DAY_KEY_BY_VALUE = Object.fromEntries(WEEK_DAYS.map(day=>[day.value,day.key]));
const DAY_ALIASES = {dom:'domingo',domingo:'domingo',seg:'segunda',segunda:'segunda',ter:'terca',terca:'terca',qua:'quarta',quarta:'quarta',qui:'quinta',quinta:'quinta',sex:'sexta',sexta:'sexta',sab:'sabado',sabado:'sabado'};
const DAY_INDEX = ['domingo','segunda','terca','quarta','quinta','sexta','sabado'];

/* A lista local de referência vive em dados.js. */
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
/* Normaliza o dia do curso (texto, número ou abreviação) para comparar com o filtro. */
function normalizeDay(value){
  if(value===null||value===undefined)return '';
  const text=String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
  if(!text)return '';
  if(/^[0-9]+$/.test(text))return DAY_INDEX[Number(text)]||'';
  const stem=text.replace(/\s*-\s*feira\b/,'').trim();
  return DAY_ALIASES[stem]||DAY_ALIASES[text]||text;
}
/* Chave do dia selecionado no filtro; string vazia = "Todos os dias". */
function selectedDay(){
  const select=document.querySelector('#day-filter');
  if(!select||!select.value||select.value==='todos')return '';
  return DAY_KEY_BY_VALUE[select.value]||normalizeDay(select.value);
}
function renderBookingWorkshops(){
  const root=document.querySelector('#workshop-list');
  if(!root)return;
  root.innerHTML=BOOKING_WORKSHOPS.map(name=>{
    const message=`Olá, gostaria de agendar a oficina de ${name}. Quais dias e horários estão disponíveis?`;
    const href=`https://wa.me/551533731002?text=${encodeURIComponent(message)}`;
    return `<article class="course-card workshop-card"><div class="course-top"><h3>${escapeHtml(name)}</h3><span class="status status-schedule">Agendamento necessário</span></div><p>Dias e horários a combinar com a equipe do Conexões – Polo 1.</p><a class="workshop-link" href="${href}" target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp</a></article>`;
  }).join('');
}
function render(){
  const term=document.querySelector('#search').value.trim().toLowerCase();
  const period=document.querySelector('.filter-btn.is-active')?.dataset.period || 'todos';
  const day=selectedDay();
  const filtered=visibleCourses.filter(c=>!isBookingWorkshop(c)).filter(c=>{const haystack=[c.name,c.category,c.period,c.day,c.instructor,c.age||''].join(' ').toLowerCase();return (!term||haystack.includes(term))&&(period==='todos'||c.period.includes(period))&&(!day||normalizeDay(c.day)===day)});
  const root=document.querySelector('#catalog-grid');root.innerHTML='';
  const extraCategories=[...new Set(filtered.map(c=>c.category).filter(category=>category&&!categoryInfo[category]))];
  [...Object.keys(categoryInfo),...extraCategories].forEach(category=>{
    const items=filtered.filter(c=>c.category===category); if(!items.length)return;
    const info=categoryInfo[category]||{className:'education',icon:'✦'};const section=document.createElement('section');section.className=`category-section category-${info.className}`;section.innerHTML=`<div class="category-head"><div><h3>${escapeHtml(category)}</h3><p>${items.length} ${items.length===1?'horário':'horários'} encontrados</p></div></div><div class="course-list"></div>`;
    const list=section.querySelector('.course-list');items.forEach(c=>{
      const status=statusFor(c);
      const detailUrl=courseDetailsUrl(c);
      const more=detailUrl?`<div class="course-card-acao"><a class="course-more" aria-label="Saiba mais sobre ${escapeHtml(c.name)}" href="${detailUrl}">Saiba mais<span aria-hidden="true">&nbsp;→</span></a></div>`:'';
      const statusBadge=status?`<span class="status ${statusClass(status)}">${escapeHtml(status)}</span>`:'';
      const card=document.createElement('article');
      card.className='course-card';
      card.innerHTML=`<div class="course-top"><div><h4>${escapeHtml(c.name)}</h4><dl><dt>Dia:</dt> <dd>${escapeHtml(c.day)}</dd><br><dt>Horário:</dt> <dd>${escapeHtml(c.time)}</dd><br><dt>Professor:</dt> <dd>${escapeHtml(c.instructor)}</dd></dl></div>${statusBadge}</div><div class="meta-row">${c.age?`<span class="tag">${escapeHtml(c.age)}</span>`:''}<span class="tag">${escapeHtml(c.period)}</span></div>${more}`;
      list.appendChild(card);
    });root.appendChild(section);
  });
  document.querySelector('#empty-state').hidden=filtered.length!==0;
}
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');render()}));
const dayFilter=document.querySelector('#day-filter');if(dayFilter)dayFilter.addEventListener('change',render);
document.querySelector('#search').addEventListener('input',render);
const toggle=document.querySelector('.menu-toggle');toggle.addEventListener('click',()=>{const nav=document.querySelector('#site-nav');const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#site-nav').classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));
document.querySelectorAll('input[data-image-key]').forEach(input=>input.addEventListener('change',()=>{const file=input.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{imageStore[input.dataset.imageKey]=reader.result;saveImages();applyBrand();applyCampus();render()};reader.readAsDataURL(file)}));
const resetImages=document.querySelector('#reset-images');if(resetImages)resetImages.addEventListener('click',()=>{Object.keys(imageStore).forEach(key=>delete imageStore[key]);saveImages();applyBrand();document.querySelector('#campus-photo-one').src='/campus-1.jpg';document.querySelector('#campus-photo-two').src='/campus-2.jpg';document.querySelectorAll('.campus-photo').forEach(image=>{image.hidden=false});document.querySelector('.campus-art')?.classList.remove('has-photos');render()});
applyBrand();applyCampus();
renderBookingWorkshops();
render();

async function carregarCursos(){
  const resultado=await buscarHorarios();
  visibleCourses=resultado.cursos;
  render();
}

carregarCursos();
