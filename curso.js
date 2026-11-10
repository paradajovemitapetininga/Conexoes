/* =============================================================================
   curso.js — página individual de curso (curso.html?id=<id> ou ?c=<slug>)
   -----------------------------------------------------------------------------
   Lê o parâmetro "c", agrupa todos os horários reais daquele curso e monta a
   página. Cursos que têm template em curso-conteudo.js ganham foto, texto e
   cores; os demais mostram apenas os dados que existem no banco.
   ============================================================================= */

(function () {
  'use strict';

  const ORDEM_PERIODOS = ['manhã', 'tarde', 'noite'];
  const parametros = new URLSearchParams(window.location.search);
  const temId = parametros.has('id');
  const idSolicitado = (parametros.get('id') || '').trim();
  const alvo = (parametros.get('c') || '').trim().toLowerCase();

  const elemento = (id) => document.querySelector('#' + id);

  /* --- Montagem da página ------------------------------------------------- */
  function mostrarAviso(mensagem) {
    const aviso = elemento('curso-aviso');
    if (!aviso) return;
    aviso.textContent = mensagem || '';
    aviso.hidden = !mensagem;
  }

  function mostrarNaoEncontrado() {
    elemento('curso').hidden = true;
    elemento('curso-inexistente').hidden = false;
    document.title = 'Curso não encontrado — Conexões Polo 1';
  }

  /* Agrupa os horários do curso por período, mantendo a ordem manhã/tarde/noite. */
  function agruparPorPeriodo(horarios) {
    const grupos = new Map();
    horarios.forEach(horario => {
      const periodo = String(horario.period || '').toLowerCase();
      if (!grupos.has(periodo)) grupos.set(periodo, []);
      grupos.get(periodo).push(horario);
    });
    return [...grupos.entries()]
      .sort((a, b) => {
        const ia = ORDEM_PERIODOS.indexOf(a[0]);
        const ib = ORDEM_PERIODOS.indexOf(b[0]);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      })
      .map(([periodo, itens]) => ({ periodo, itens }));
  }

  const rotuloPeriodo = (periodo) => {
    const texto = String(periodo || '').trim();
    if (!texto) return 'Horário';
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  function cartaoHorario(horario) {
    const partes = [`<p><strong>Dia:</strong> ${escapeHtml(horario.day)}</p>`];
    if (horario.time) partes.push(`<p><strong>Horário:</strong> ${escapeHtml(horario.time)}</p>`);
    if (horario.age) partes.push(`<p><strong>Faixa etária:</strong> ${escapeHtml(horario.age)}</p>`);
    return `<div class="curso-painel-card">${partes.join('')}</div>`;
  }

  function cartaoVaga(horario) {
    const status = statusFor(horario);
    const periodo = String(horario.period || '').toLowerCase();
    const rotuloStatus = status === DEFAULT_STATUS && periodo
      ? `${status} pela ${periodo}`
      : status;
    const professor = horario.instructor && horario.instructor !== '—'
      ? `<p><strong>Professor:</strong> ${escapeHtml(horario.instructor)}</p>`
      : '';
    return `<div class="curso-painel-card"><p>${escapeHtml(rotuloStatus)}</p>${professor}</div>`;
  }

  function painel(classes, rotulo, fundo, destaque, conteudo) {
    return `<div class="curso-painel ${classes}" style="--painel-fundo:${fundo};--painel-destaque:${destaque}">
      <span class="curso-painel-pill">${escapeHtml(rotulo)}</span>
      <div class="curso-painel-corpo">${conteudo}</div>
    </div>`;
  }

  function montarPaineis(horarios, cores) {
    const grupos = agruparPorPeriodo(horarios);
    const colunaPeriodos = grupos.map(grupo => painel(
      'curso-painel-periodo',
      rotuloPeriodo(grupo.periodo),
      cores.periodo,
      cores.destaque,
      grupo.itens.map(cartaoHorario).join('')
    )).join('');

    const colunaVagas = painel(
      'curso-painel-vagas',
      'Vagas',
      cores.vagas,
      cores.vagasDestaque,
      horarios.map(cartaoVaga).join('')
    );

    return `<div class="curso-painel-coluna">${colunaPeriodos}</div>
            <div class="curso-painel-coluna">${colunaVagas}</div>`;
  }

  function render(horarios, conteudo) {
    const primeiro = horarios[0];
    const nome = primeiro.name;
    const titulo = (conteudo && conteudo.titulo) || nome;

    /* Sobretítulo no estilo do template: a primeira palavra do nome do curso. */
    const palavras = String(titulo).trim().split(/\s+/);
    const sobretitulo = palavras.length > 1 ? palavras[0] : '';
    const elementoSobretitulo = elemento('curso-sobretitulo');
    elementoSobretitulo.textContent = sobretitulo;
    elementoSobretitulo.hidden = !sobretitulo;

    elemento('curso-categoria').textContent = primeiro.category || '';
    elemento('curso-categoria').hidden = !primeiro.category;
    elemento('curso-titulo').textContent = titulo;
    elemento('curso').classList.toggle('curso-com-template', Boolean(conteudo));

    const texto = elemento('curso-texto');
    const descricao = String(primeiro.descricao || primeiro.description || '').trim();
    const textoApresentacao = descricao || (conteudo && conteudo.texto) || '';
    if (textoApresentacao) {
      texto.textContent = textoApresentacao;
      texto.hidden = false;
    } else {
      texto.textContent = '';
      texto.hidden = true;
    }

    const blocoFoto = elemento('curso-foto-bloco');
    const foto = elemento('curso-foto');
    const apresentacao = elemento('curso-apresentacao');
    if (conteudo && conteudo.imagem) {
      foto.onerror = () => {
        console.warn(`Imagem de template não encontrada: ${conteudo.imagem}`);
        blocoFoto.hidden = true;
        apresentacao.classList.add('curso-apresentacao-sem-imagem');
      };
      foto.src = conteudo.imagem;
      foto.alt = conteudo.alt || '';
      blocoFoto.hidden = false;
    } else {
      foto.onerror = null;
      foto.removeAttribute('src');
      blocoFoto.hidden = true;
    }
    apresentacao.classList.toggle('curso-apresentacao-sem-imagem', blocoFoto.hidden);
    apresentacao.hidden = !textoApresentacao && !(conteudo && conteudo.imagem);

    const cores = (conteudo && conteudo.cores) || {
      destaque: '#0d4d70',
      periodo: '#dfe7ec',
      vagas: '#c9d3da',
      vagasDestaque: '#0d4d70'
    };
    elemento('curso').style.setProperty('--destaque-curso', cores.destaque);
    elemento('curso-paineis').innerHTML = montarPaineis(horarios, cores);

    elemento('curso').hidden = false;
    elemento('curso-inexistente').hidden = true;
    document.title = `${titulo} — Conexões Polo 1`;
  }

  /* --- Inicialização ------------------------------------------------------ */
  async function iniciar() {
    if ((temId && !/^[1-9]\d*$/.test(idSolicitado)) || (!temId && !alvo)) {
      mostrarAviso('');
      mostrarNaoEncontrado();
      return;
    }
    let resultado;
    try {
      resultado = await buscarHorarios();
    } catch (erro) {
      console.error('Falha ao buscar horários do Supabase:', erro);
      resultado = { cursos: courses, origem: 'local', aviso: '' };
    }

    mostrarAviso(resultado.origem === 'local' ? resultado.aviso : '');
    const horarios = filtrarHorariosDoCurso(resultado.cursos || [], idSolicitado, alvo, temId);
    if (!horarios.length) {
      mostrarNaoEncontrado();
      return;
    }

    render(horarios, buscarConteudoCurso(courseSlug(horarios[0])));
  }

  /* Menu mobile (mesmo comportamento da página inicial). */
  const botaoMenu = document.querySelector('.menu-toggle');
  if (botaoMenu) {
    botaoMenu.addEventListener('click', () => {
      const nav = document.querySelector('#site-nav');
      const aberto = nav.classList.toggle('is-open');
      botaoMenu.setAttribute('aria-expanded', aberto);
    });
    document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => {
      const nav = document.querySelector('#site-nav');
      nav.classList.remove('is-open');
      botaoMenu.setAttribute('aria-expanded', 'false');
    }));
  }

  iniciar();
})();
