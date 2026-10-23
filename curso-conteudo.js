/* =============================================================================
   curso-conteudo.js — textos, imagens e cores dos templates de curso
   -----------------------------------------------------------------------------
   Cada chave é o slug do curso (mesmo gerado por courseSlug() em dados.js).
   Cursos sem entrada aqui continuam funcionando: a página mostra apenas os
   dados reais que vêm do Supabase (ou do catálogo local), sem texto inventado.
   ============================================================================= */

const CURSO_CONTEUDO = {
  'alongamento': {
    titulo: 'Alongamento',
    texto: 'O curso de Alongamento, com o professor Renato, desenvolve a flexibilidade, a mobilidade articular e a postura corporal, promovendo o equilíbrio, a redução do estresse e o bem-estar físico e mental. As aulas são ideais para liberar tensões diárias e revitalizar a energia do corpo.',
    imagem: 'assets/cursos/alongamento.jpg',
    alt: 'Participante executando um alongamento em uma sala de dança.',
    cores: {
      destaque: '#8a9a70',
      periodo: '#a9b295',
      vagas: '#cb9c82',
      vagasDestaque: '#ce7b4c'
    }
  },

  'capoeira': {
    titulo: 'Capoeira',
    texto: 'O curso de Capoeira, com a professora Grazi, desenvolve a agilidade, a coordenação motora, o ritmo e a expressão cultural através da ginga e dos movimentos característicos. As aulas estimulam a disciplina, a socialização e o bem-estar físico e mental.',
    imagem: 'assets/cursos/capoeira.jpg',
    alt: 'Grupo de capoeira durante uma roda, com alunos de RDC junto à capoeira.',
    cores: {
      destaque: '#295d47',
      periodo: '#799184',
      vagas: '#7b7e83',
      vagasDestaque: '#c0790c'
    }
  },

  'jazz-intermediario': {
    titulo: 'Jazz Intermediário',
    texto: 'O curso de Jazz Intermediário, com o professor Renato, é voltado para quem já possui vivência na dança e busca aprimorar sua técnica, musicalização e expressão artística. As aulas exploram coreografias dinâmicas, giros, saltos e a expressividade característica do jazz, promovendo o desenvolvimento técnico, a flexibilidade e a consciência corporal.',
    imagem: 'assets/cursos/jazz-intermediario.jpg',
    alt: 'Bailarina executando um salto no meio de uma aula de jazz.',
    cores: {
      destaque: '#366177',
      periodo: '#acb3bd',
      vagas: '#6c757e',
      vagasDestaque: '#c47701'
    }
  },

  'tenis-de-mesa': {
    titulo: 'Tênis de Mesa',
    texto: 'O curso de Tênis de Mesa, com o professor Felipe, ensina técnicas e regras da modalidade, desenvolvendo agilidade, coordenação motora, foco e reflexos rápidos. As aulas promovem o espírito esportivo, a concentração e a saúde física, sendo ideal para todas as idades e estimulando o desenvolvimento pessoal de cada aluno.',
    imagem: 'assets/cursos/tenis-de-mesa.jpg',
    alt: 'Aluno jogando tênis de mesa em uma mesa oficial.',
    cores: {
      destaque: '#3e5975',
      periodo: '#8799af',
      vagas: '#99a2ab',
      vagasDestaque: '#e14c05'
    }
  }
};

/* Retorna o template de um curso pelo slug (ou null quando não há template). */
function buscarConteudoCurso(slugCurso) {
  if (!slugCurso) return null;
  return Object.prototype.hasOwnProperty.call(CURSO_CONTEUDO, slugCurso) ? CURSO_CONTEUDO[slugCurso] : null;
}
