/* =============================================================================
   curso-conteudo.js — descrições locais e apresentação visual das oficinas
   -----------------------------------------------------------------------------
   As chaves usam o mesmo slug normalizado por dados.js. A descrição publicada
   no Supabase tem prioridade; em seguida são usados os templates do projeto e
   este catálogo complementar. Para oficinas novas ainda sem conteúdo confiável,
   a função finaliza com um texto neutro e registra a pendência no console.
   ============================================================================= */

/* Templates existentes, preservados para imagem, cores e identidade visual. */
const CURSO_CONTEUDO = {
  alongamento: {
    titulo: 'Alongamento',
    texto: 'Alongamento é uma atividade corporal baseada em movimentos que levam músculos e articulações a diferentes posições, de forma controlada. A prática costuma trabalhar flexibilidade, mobilidade, percepção do próprio corpo e amplitude dos movimentos. O foco é explorar movimentos com atenção, sem pressupor uma técnica específica nem prometer efeitos médicos.',
    imagem: 'assets/cursos/alongamento.svg',
    alt: 'Participante executando um alongamento em uma sala de dança.',
    cores: {
      destaque: '#8a9a70',
      periodo: '#a9b295',
      vagas: '#cb9c82',
      vagasDestaque: '#ce7b4c'
    }
  },

  capoeira: {
    titulo: 'Capoeira',
    texto: 'A capoeira é uma expressão brasileira que combina luta, jogo, música e movimento corporal. Na roda, os participantes interagem por meio da ginga e de movimentos característicos, acompanhados pelo ritmo e pela musicalidade próprios da prática. A atividade costuma envolver coordenação motora, ritmo, agilidade, equilíbrio e consciência corporal, além de aproximar os participantes de aspectos da cultura brasileira e favorecer convivência e expressão.',
    imagem: 'assets/cursos/capoeira.svg',
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
    texto: 'Jazz intermediário é uma atividade de dança que explora movimentos e sequências coreográficas associados ao jazz, combinando ritmo e expressão corporal. A prática costuma envolver coordenação dos movimentos, percepção musical, consciência do corpo no espaço e memorização de sequências. O termo “intermediário” aparece no nome da oficina; os dados locais não detalham conteúdos ou critérios específicos desse nível.',
    imagem: 'assets/cursos/jazz-intermediario.svg',
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
    texto: 'Tênis de mesa é um esporte praticado em uma mesa dividida por uma rede, no qual os participantes usam raquetes para rebater uma bola e manter a troca de jogadas. A prática costuma envolver coordenação motora, reflexos, concentração, leitura dos movimentos do adversário e escolhas estratégicas durante o jogo.',
    imagem: 'assets/cursos/tenis-de-mesa.svg',
    alt: 'Aluno jogando tênis de mesa em uma mesa oficial.',
    cores: {
      destaque: '#3e5975',
      periodo: '#8799af',
      vagas: '#99a2ab',
      vagasDestaque: '#e14c05'
    }
  }
};

/*
 * Complementos específicos: modalidade e público variam no nome da oficina;
 * os textos explicam a atividade sem presumir currículo ou dados da turma.
 */
const CURSO_DESCRICOES_COMPLEMENTARES = {
  'abada-capoeira': 'Abadá Capoeira é uma prática de capoeira que combina jogo corporal, movimentos de esquiva e ataque, ritmo, música e expressão de uma manifestação cultural brasileira. Em geral, a atividade mobiliza coordenação motora, equilíbrio, percepção do ritmo e consciência corporal, além de estimular a interação e o respeito entre participantes durante o jogo.',

  'alongamento-danjeon': 'Alongamento Danjeon é uma atividade de alongamento corporal identificada no catálogo na categoria Esporte e Lazer. Como outras práticas de alongamento, pode envolver movimentos que exploram a flexibilidade, a mobilidade e a percepção do corpo. O material local não explica o que caracteriza o termo “Danjeon”; por isso, esta descrição não atribui à oficina uma técnica ou metodologia específica.',

  artesanato: 'Artesanato é a produção manual de peças e objetos por meio da combinação e transformação de materiais. O processo pode incluir planejar uma ideia, montar ou dar acabamento à criação, variando conforme a peça e as técnicas adotadas. A atividade pode mobilizar criatividade, coordenação motora fina, atenção aos detalhes e organização das etapas, sem pressupor um material ou técnica específicos.',

  'artesanato-infantil': 'Artesanato infantil é uma atividade de criação manual em que materiais são transformados em peças ou objetos feitos à mão. Ao planejar e realizar essas produções, podem ser mobilizadas criatividade, coordenação motora fina, atenção e expressão pessoal. Os projetos e materiais específicos desta oficina não estão detalhados nas entradas consultadas.',

  ballet: 'Ballet é uma modalidade de dança que combina movimentos coordenados com música e atenção à postura e ao equilíbrio. A prática costuma envolver coordenação motora, musicalidade, consciência corporal e expressão por meio do movimento, com passos e sequências próprios dessa forma de dança.',

  'ballet-juvenil-adulto': 'O ballet é uma modalidade de dança que combina movimentos e posições corporais com a música. Sua prática costuma explorar passos, deslocamentos e sequências características da dança, envolvendo coordenação motora, equilíbrio, postura, musicalidade e consciência corporal. Também permite expressão por meio do movimento, sem pressupor um método ou currículo específico para esta turma.',

  bateria: 'A oficina de Bateria é uma atividade musical centrada na prática de um conjunto de tambores e pratos, explorando seus sons e ritmos. Tocar bateria costuma mobilizar percepção rítmica, coordenação entre mãos e pés, escuta e expressão musical, além de familiaridade com padrões rítmicos e com a pulsação da música.',

  coral: 'Coral é uma atividade de canto coletivo em que participantes cantam em conjunto, acompanhando melodias e combinando suas vozes. A prática costuma envolver percepção e escuta musical, noção de ritmo, afinação, respiração e expressão vocal, além de atenção à entrada e à harmonia entre as vozes.',

  'danca-jazz-iniciante': 'É uma atividade de dança baseada no jazz, com movimentos realizados em relação ao ritmo e à música. A prática costuma envolver combinações de passos e sequências coreográficas, podendo mobilizar coordenação motora, percepção rítmica, consciência corporal e expressão pelo movimento. O termo “iniciante” identifica o nível indicado no nome, sem especificar currículo ou método da oficina.',

  desenho: 'Desenho é uma atividade de criação visual em que linhas, formas e contornos são usados para representar ideias, objetos ou cenas. A prática costuma explorar a observação e a organização de elementos no papel para construir imagens, além de mobilizar percepção visual, coordenação entre olhar e gesto, atenção a detalhes e expressão criativa.',

  'expressao-corporal-adulto': 'Expressão corporal é uma atividade que explora como gestos, posturas e movimentos podem comunicar ideias, sensações e intenções. Em propostas desse tipo, a experimentação do movimento pode mobilizar percepção do próprio corpo, coordenação, ritmo, criatividade e comunicação não verbal. Os dados disponíveis não especificam técnicas ou exercícios, então esta descrição se limita à natureza geral da atividade.',

  fanfarra: 'Fanfarra é uma atividade de música coletiva em que instrumentos são tocados em conjunto para criar ritmos e melodias. A prática costuma envolver percepção rítmica, escuta, coordenação entre os músicos e atenção às entradas e pausas. O repertório e os tipos de instrumento usados nesta oficina não estão informados no catálogo.',

  'futebol-kids': 'Futebol kids é uma atividade esportiva de prática do futebol, com situações de jogo e contato com fundamentos como passe, condução da bola e finalização. Por ser uma modalidade coletiva, costuma envolver coordenação motora, agilidade, noção de espaço e interação entre participantes, além de familiaridade com regras e decisões durante a partida.',

  'futebol-masc': 'Futebol masc. é uma atividade esportiva em que se joga futebol, modalidade coletiva disputada com bola e organizada em torno de passes, movimentação e tentativas de marcar gols. A prática costuma envolver fundamentos como condução e domínio da bola, passe, finalização e noções de posicionamento. Também pode mobilizar coordenação motora, leitura do jogo, respeito às regras e cooperação entre participantes.',

  'futebol-masc-infantil': 'Futebol masc. infantil é uma atividade de prática do futebol, com exercícios e situações de jogo envolvendo condução da bola, passes, recepção e finalizações. A modalidade costuma envolver coordenação motora, agilidade, percepção do espaço e compreensão de regras, além de cooperação e respeito entre participantes durante a partida. O catálogo identifica a oficina como Esporte e Lazer; não detalha conteúdos específicos.',

  hapkido: 'Hapkido é uma arte marcial de origem coreana que reúne práticas voltadas à defesa pessoal. A atividade envolve movimentos e técnicas corporais próprios dessa modalidade. Sua prática costuma mobilizar disciplina, equilíbrio e coordenação, além de atenção ao controle dos movimentos e à interação respeitosa com outras pessoas. A descrição se limita à natureza geral do Hapkido; detalhes sobre o conteúdo efetivamente oferecido pela oficina não constam nos dados locais.',

  ingles: 'A oficina de Inglês é uma atividade voltada ao contato e à prática da língua inglesa. Em propostas desse tipo, podem ser trabalhados vocabulário e formas de compreender e produzir mensagens em situações cotidianas, oralmente e por escrito. O desenvolvimento costuma envolver familiaridade com o idioma, escuta, leitura e comunicação, conforme as atividades realizadas.',

  'jazz-infantojuvenil': 'Jazz é uma modalidade de dança que combina movimentos corporais com a interpretação do ritmo e da música. A atividade costuma envolver a aprendizagem e a execução de sequências coreográficas, mobilizando coordenação motora, ritmo, expressão corporal e percepção dos movimentos no espaço. Esta descrição explica a prática da dança sem presumir conteúdos específicos das aulas.',

  musicalizacao: 'A Musicalização é uma atividade de contato e exploração da música, voltada a perceber sons, ritmos e diferentes formas de expressão musical. Em geral, esse tipo de prática costuma envolver escuta, percepção sonora, senso rítmico e expressão, além de oferecer noções iniciais de linguagem musical.',

  'sapateado-juvenil-e-adulto': 'O sapateado é uma dança em que os passos, marcados por calçados com pequenas peças metálicas, também produzem sons e compõem o ritmo. A prática costuma envolver coordenação entre pés e corpo, percepção rítmica, musicalidade, memória de sequências e expressão corporal, combinando movimento e som.',

  teatro: 'Teatro é uma atividade artística em que histórias, situações e ideias ganham forma por meio da interpretação. Em geral, envolve criação e representação de cenas, com uso da voz, do corpo e da imaginação. A prática costuma mobilizar expressão, criatividade, escuta e interação com outras pessoas, sem pressupor uma metodologia específica.',

  'teatro-juvenil-adulto': 'Teatro é uma linguagem artística que cria e apresenta histórias por meio da atuação. A atividade pode envolver a interpretação de personagens e situações, usando corpo, voz e imaginação para comunicar ideias e emoções. Em geral, a prática teatral envolve expressão, escuta, criatividade e colaboração na construção de cenas, sem que isso indique uma metodologia específica desta oficina.',

  'tenis-de-mesa-iniciante': 'Tênis de mesa é um esporte de raquete em que duas pessoas ou duplas trocam uma pequena bola sobre uma mesa dividida por uma rede, buscando colocá-la no lado adversário sem que a devolução aconteça. A prática costuma envolver coordenação entre olhos e mãos, agilidade, atenção à trajetória da bola, reflexos e raciocínio estratégico durante as jogadas.',

  violao: 'A oficina de Violão é uma atividade de aprendizagem musical centrada no instrumento de cordas dedilhadas. Em geral, o estudo do violão envolve conhecer o instrumento e praticar acordes, ritmos e melodias. Essa prática costuma mobilizar percepção musical, coordenação entre as mãos, senso rítmico e atenção; o catálogo local identifica a atividade na categoria Educação e Conhecimento.',

  'violao-iniciante-infantil': 'A oficina de Violão iniciante infantil é uma atividade de iniciação musical centrada no violão. Aprender a tocar esse instrumento costuma envolver explorar sons, ritmo e coordenação entre as mãos, além de mobilizar escuta e expressão musical. O catálogo identifica a oficina como iniciante e infantil, mas não informa conteúdos específicos trabalhados na turma.',

  'violao-iniciante-juvenil': 'A oficina Violão iniciante juvenil é uma atividade de iniciação musical voltada aos primeiros contatos com o violão. O aprendizado costuma envolver a familiarização com o instrumento, a coordenação entre as mãos, o ritmo e noções musicais básicas. O catálogo confirma o nome e a categoria, mas não informa repertório ou formato das aulas.',

  'violao-intermediario-avancado': 'Oficina de violão voltada à prática do instrumento em nível intermediário ou avançado, conforme indica o nome. A atividade envolve tocar violão e pode trabalhar aspectos musicais próprios do instrumento, como coordenação entre as mãos, execução de acordes, ritmos e melodias, além da interpretação musical. O catálogo confirma apenas o nome e a categoria Educação e Conhecimento; não informa repertório, conteúdos específicos ou abordagem.',

  'violao-juvenil-e-adulto-iniciante': 'A oficina de violão para iniciantes é uma atividade de aprendizagem musical centrada no instrumento. O contato com o violão costuma envolver a familiarização com suas cordas e sons, além da prática de ritmo e escuta. Essa atividade pode mobilizar coordenação entre as mãos, atenção e expressão musical, sem pressupor um repertório ou método específico.',

  xadrez: 'Xadrez é um jogo de estratégia disputado em um tabuleiro, no qual cada participante movimenta peças com regras próprias para proteger o rei e buscar a vitória. A atividade envolve conhecer as peças e suas possibilidades, planejar jogadas e observar as ações do adversário. Costuma mobilizar concentração, raciocínio lógico, antecipação e tomada de decisões durante a partida.'
};

const DESCRICAO_NEUTRA = 'Esta oficina faz parte do catálogo do Conexões Polo 1. Para saber quais conteúdos são trabalhados nesta turma, consulte a equipe do polo.';

/* Resolve sem prefixos/fuzzy-match: cada descrição complementar usa um slug exato. */
function buscarConteudoCurso(slugCurso, descricaoSupabase) {
  const valor = slugCurso && typeof slugCurso === 'object' ? slugCurso.name : slugCurso;
  const chave = slug(valor);
  const template = Object.prototype.hasOwnProperty.call(CURSO_CONTEUDO, chave) ? CURSO_CONTEUDO[chave] : null;
  const descricaoBanco = String(descricaoSupabase || (slugCurso && typeof slugCurso === 'object' ? slugCurso.descricao : '') || '').trim();
  if (descricaoBanco) return { ...(template || {}), texto: descricaoBanco, origemConteudo: 'supabase' };
  if (template && template.texto) return { ...template, origemConteudo: 'projeto' };
  if (Object.prototype.hasOwnProperty.call(CURSO_DESCRICOES_COMPLEMENTARES, chave)) {
    return { texto: CURSO_DESCRICOES_COMPLEMENTARES[chave], origemConteudo: 'complemento' };
  }
  console.warn(`Descrição específica pendente para a oficina "${String(valor || '')}" (slug: ${chave || 'vazio'}).`);
  return { texto: DESCRICAO_NEUTRA, origemConteudo: 'neutro' };
}
