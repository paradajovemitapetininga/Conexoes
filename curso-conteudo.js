/* =============================================================================
   curso-conteudo.js — textos, imagens e cores dos templates de curso
   -----------------------------------------------------------------------------
   Cada chave é o slug do curso (mesmo gerado por courseSlug() em dados.js).
   Campos de texto: descricao_curta (card), descricao (página do curso),
   publico, diferencial, o_que_levar e professor.
   Cursos sem entrada aqui continuam funcionando: a página mostra apenas os
   dados reais que vêm do Supabase (ou do catálogo local), sem texto inventado.
   ============================================================================= */

const CURSO_CONTEUDO = {
  'teatro': {
    titulo: 'Teatro',
    texto: 'O curso de Teatro pertence à área de Cultura e Artes e se encontra às segundas-feiras em três turmas: 8h, 15h e 16h. Nas aulas você pratica leitura de texto, fala e movimento em grupo, construindo cenas com a turma. É a opção de cena do catálogo, com horários de manhã e de tarde.',
    descricao_curta: 'Teatro no Polo 1, com turmas de manhã e à tarde para quem quer entrar em cena e trabalhar em grupo.',
    descricao: 'O curso de Teatro pertence à área de Cultura e Artes e se encontra às segundas-feiras em três turmas: 8h, 15h e 16h. Nas aulas você pratica leitura de texto, fala e movimento em grupo, construindo cenas com a turma. É a opção de cena do catálogo, com horários de manhã e de tarde.',
    publico: '',
    diferencial: 'É o teatro com turmas de manhã e à tarde, enquanto o Teatro juvenil adulto acontece apenas à noite.',
    o_que_levar: '',
    professor: 'Silvina',
  },

  'teatro-juvenil-adulto': {
    titulo: 'Teatro Juvenil Adulto',
    texto: 'Voltado para jovens e adultos, o Teatro juvenil adulto ocupa a segunda-feira à noite, das 18h às 19h, na área de Cultura e Artes. O trabalho se concentra em texto, interpretação e montagem de cenas para o grupo. É a única turma de teatro do catálogo com horário noturno.',
    descricao_curta: 'Teatro para jovens e adultos, com aula única às segundas à noite, das 18h às 19h.',
    descricao: 'Voltado para jovens e adultos, o Teatro juvenil adulto ocupa a segunda-feira à noite, das 18h às 19h, na área de Cultura e Artes. O trabalho se concentra em texto, interpretação e montagem de cenas para o grupo. É a única turma de teatro do catálogo com horário noturno.',
    publico: 'Jovens e adultos',
    diferencial: 'Único curso de teatro com o público de jovens e adultos no nome e com aula somente à noite.',
    o_que_levar: '',
    professor: 'Silvina',
  },

  'alongamento': {
    titulo: 'Alongamento',
    texto: 'No curso de Alongamento, os alunos desenvolvem a flexibilidade, a mobilidade articular e a postura corporal, promovendo o equilíbrio, a redução do estresse e o bem-estar físico e mental. As aulas são ideais para liberar tensões diárias e revitalizar a energia do corpo. O curso tem turma à quinta de manhã e outra à terça à noite.',
    descricao_curta: 'Alongamento com turmas de manhã e à noite, para cuidar da postura e da mobilidade do corpo.',
    descricao: 'No curso de Alongamento, os alunos desenvolvem a flexibilidade, a mobilidade articular e a postura corporal, promovendo o equilíbrio, a redução do estresse e o bem-estar físico e mental. As aulas são ideais para liberar tensões diárias e revitalizar a energia do corpo. O curso tem turma à quinta de manhã e outra à terça à noite.',
    publico: '',
    diferencial: 'São duas turmas de alongamento no catálogo — esta, à quinta de manhã e à terça à noite, e o Alongamento Danjeon, de segunda-feira de manhã.',
    o_que_levar: '',
    professor: 'Renato (quinta-feira, 8h30–9h30) e Leandro (terça-feira, 18h–19h)',
    imagem: 'assets/cursos/alongamento.svg',
    alt: 'Participante executando um alongamento em uma sala de dança.',
    cores: {
    destaque: '#8a9a70',
    periodo: '#a9b295',
    vagas: '#cb9c82',
    vagasDestaque: '#ce7b4c',
    },
  },

  'alongamento-danjeon': {
    titulo: 'Alongamento Danjeon',
    texto: 'Alongamento Danjeon é a aula de alongamento que roda às segundas-feiras de manhã, das 8h às 9h, na área de Esporte e Lazer. O horário é dedicado a alongamentos no estilo danjeon, com acompanhamento do professor ao longo de toda a turma. É uma opção para alongar o corpo antes do resto do dia, em grupo separado do curso de Alongamento.',
    descricao_curta: 'Alongamento Danjeon: aula de segunda de manhã com alongamentos guiados no estilo danjeon.',
    descricao: 'Alongamento Danjeon é a aula de alongamento que roda às segundas-feiras de manhã, das 8h às 9h, na área de Esporte e Lazer. O horário é dedicado a alongamentos no estilo danjeon, com acompanhamento do professor ao longo de toda a turma. É uma opção para alongar o corpo antes do resto do dia, em grupo separado do curso de Alongamento.',
    publico: '',
    diferencial: 'É a segunda turma de alongamento do catálogo: a Danjeon é de segunda de manhã, e o Alongamento, de quinta de manhã e terça à noite.',
    o_que_levar: '',
    professor: 'Marcos',
  },

  'hapkido': {
    titulo: 'Hapkido',
    texto: 'Hapkido é o curso de arte marcial coreana da Conexões Polo 1 e tem duas turmas: segunda-feira, das 9h às 10h, e quarta-feira, das 16h às 17h. As aulas trabalham os movimentos da modalidade, com chutes, golpes e defesa. Por ter turmas nos dois períodos, dá para encaixar o treino na rotina da manhã ou da tarde.',
    descricao_curta: 'Hapkido no Polo 1: turmas de segunda de manhã e quarta à tarde, com a arte marcial coreana.',
    descricao: 'Hapkido é o curso de arte marcial coreana da Conexões Polo 1 e tem duas turmas: segunda-feira, das 9h às 10h, e quarta-feira, das 16h às 17h. As aulas trabalham os movimentos da modalidade, com chutes, golpes e defesa. Por ter turmas nos dois períodos, dá para encaixar o treino na rotina da manhã ou da tarde.',
    publico: '',
    diferencial: 'São apenas duas turmas, uma na segunda de manhã e outra na quarta à tarde, para encaixar o treino no turno mais conveniente.',
    o_que_levar: '',
    professor: 'Marcos',
  },

  'danca-jazz-iniciante': {
    titulo: 'Dança / Jazz Iniciante',
    texto: 'Dança / Jazz iniciante é a turma de entrada no Jazz do Polo 1: uma aula por semana, às quintas-feiras de manhã, das 9h30 às 10h30. O trabalho percorre os passos básicos do estilo, com o grupo acompanhando a música e o ritmo da aula. Quem já tem vivência com dança faz o Jazz intermediário, não esta turma.',
    descricao_curta: 'Dança com estilo Jazz para iniciantes: uma aula por semana, quinta de manhã, às 9h30.',
    descricao: 'Dança / Jazz iniciante é a turma de entrada no Jazz do Polo 1: uma aula por semana, às quintas-feiras de manhã, das 9h30 às 10h30. O trabalho percorre os passos básicos do estilo, com o grupo acompanhando a música e o ritmo da aula. Quem já tem vivência com dança faz o Jazz intermediário, não esta turma.',
    publico: '',
    diferencial: 'É a turma inicial do Jazz, enquanto o nível intermediário exige vivência prévia e o Jazz infantojuvenil tem faixa própria.',
    o_que_levar: '',
    professor: 'Renato',
  },

  'jazz-intermediario': {
    titulo: 'Jazz Intermediário',
    texto: 'O curso de Jazz Intermediário é voltado para quem já possui vivência na dança e busca aprimorar sua técnica, musicalização e expressão artística. As aulas exploram coreografias dinâmicas, giros, saltos e a expressividade característica do jazz, promovendo o desenvolvimento técnico, a flexibilidade e a consciência corporal. É a turma de Jazz de nível intermediário, acima do grupo iniciante.',
    descricao_curta: 'Jazz de nível intermediário, para quem já dança e quer aprofundar técnica, giros e saltos.',
    descricao: 'O curso de Jazz Intermediário é voltado para quem já possui vivência na dança e busca aprimorar sua técnica, musicalização e expressão artística. As aulas exploram coreografias dinâmicas, giros, saltos e a expressividade característica do jazz, promovendo o desenvolvimento técnico, a flexibilidade e a consciência corporal. É a turma de Jazz de nível intermediário, acima do grupo iniciante.',
    publico: '',
    diferencial: 'É o único Jazz de nível intermediário do catálogo, acima do Jazz iniciante e separado do infantojuvenil.',
    o_que_levar: '',
    professor: 'Renato',
    imagem: 'assets/cursos/jazz-intermediario.svg',
    alt: 'Bailarina executando um salto no meio de uma aula de jazz.',
    cores: {
    destaque: '#366177',
    periodo: '#acb3bd',
    vagas: '#6c757e',
    vagasDestaque: '#c47701',
    },
  },

  'jazz-infantojuvenil': {
    titulo: 'Jazz Infantojuvenil',
    texto: 'O Jazz infantojuvenil é a turma de Jazz para o público de crianças e jovens, com aula às quintas-feiras, das 16h às 17h. O trabalho segue a proposta do estilo na faixa infantojuvenil, com os passos do jazz e as coreografias da turma. Não se confunde com o Jazz iniciante, que é o primeiro contato com o estilo, nem com o intermediário.',
    descricao_curta: 'Jazz infantojuvenil: aula de quinta às 16h, com foco no público de crianças e jovens.',
    descricao: 'O Jazz infantojuvenil é a turma de Jazz para o público de crianças e jovens, com aula às quintas-feiras, das 16h às 17h. O trabalho segue a proposta do estilo na faixa infantojuvenil, com os passos do jazz e as coreografias da turma. Não se confunde com o Jazz iniciante, que é o primeiro contato com o estilo, nem com o intermediário.',
    publico: 'Crianças e jovens',
    diferencial: 'É a única turma de Jazz com público infantojuvenil, ao lado do grupo iniciante e do intermediário.',
    o_que_levar: '',
    professor: 'Carolina',
  },

  'capoeira': {
    titulo: 'Capoeira',
    texto: 'No curso de Capoeira, os alunos desenvolvem a agilidade, a coordenação motora, o ritmo e a expressão cultural através da ginga e dos movimentos característicos. As aulas estimulam a disciplina, a socialização e o bem-estar físico e mental. A turma é de quarta-feira de manhã, na área de Esporte e Lazer.',
    descricao_curta: 'Capoeira no Polo 1: aula de quarta de manhã com ginga, ritmo e expressão cultural.',
    descricao: 'No curso de Capoeira, os alunos desenvolvem a agilidade, a coordenação motora, o ritmo e a expressão cultural através da ginga e dos movimentos característicos. As aulas estimulam a disciplina, a socialização e o bem-estar físico e mental. A turma é de quarta-feira de manhã, na área de Esporte e Lazer.',
    publico: '',
    diferencial: 'É a turma de capoeira de quarta-feira de manhã, enquanto o Abadá Capoeira é a aula de terça à tarde.',
    o_que_levar: '',
    professor: 'Grazi',
    imagem: 'assets/cursos/capoeira.svg',
    alt: 'Grupo de capoeira durante uma roda, com alunos de RDC junto à capoeira.',
    cores: {
    destaque: '#295d47',
    periodo: '#799184',
    vagas: '#7b7e83',
    vagasDestaque: '#c0790c',
    },
  },

  'abada-capoeira': {
    titulo: 'Abadá Capoeira',
    texto: 'Abadá Capoeira é o curso de capoeira das terças-feiras, das 16h às 17h, na área de Esporte e Lazer. A aula reúne a prática da ginga e do ritmo do estilo, em uma turma própria, com acompanhamento próprio. É uma classe separada da aula de Capoeira, que acontece às quartas de manhã, e as duas têm professores diferentes.',
    descricao_curta: 'Abadá Capoeira: turma de terça à tarde, em aula separada da Capoeira de quarta.',
    descricao: 'Abadá Capoeira é o curso de capoeira das terças-feiras, das 16h às 17h, na área de Esporte e Lazer. A aula reúne a prática da ginga e do ritmo do estilo, em uma turma própria, com acompanhamento próprio. É uma classe separada da aula de Capoeira, que acontece às quartas de manhã, e as duas têm professores diferentes.',
    publico: '',
    diferencial: 'É a turma de capoeira de terça à tarde, com professor diferente do curso de Capoeira de quarta-feira de manhã.',
    o_que_levar: '',
    professor: 'Negão',
  },

  'sapateado-juvenil-e-adulto': {
    titulo: 'Sapateado Juvenil e Adulto',
    texto: 'Sapateado juvenil e adulto é uma oficina de Cultura e Artes que se encontra às quintas-feiras, às 10h45. A turma trabalha o gesto do sapateado, o ritmo e a leitura da música, reunindo jovens e adultos na mesma aula. É o único curso dedicado ao sapateado no catálogo do Polo 1.',
    descricao_curta: 'Sapateado para jovens e adultos, com aula de quinta às 10h45 no Polo 1.',
    descricao: 'Sapateado juvenil e adulto é uma oficina de Cultura e Artes que se encontra às quintas-feiras, às 10h45. A turma trabalha o gesto do sapateado, o ritmo e a leitura da música, reunindo jovens e adultos na mesma aula. É o único curso dedicado ao sapateado no catálogo do Polo 1.',
    publico: 'Jovens e adultos',
    diferencial: 'É o único curso de sapateado do catálogo e reúne jovens e adultos na mesma aula.',
    o_que_levar: '',
    professor: 'Renato',
  },

  'tenis-de-mesa': {
    titulo: 'Tênis de Mesa',
    texto: 'O curso de Tênis de Mesa ensina técnicas e regras da modalidade, desenvolvendo agilidade, coordenação motora, foco e reflexos rápidos. As aulas promovem o espírito esportivo, a concentração e a saúde física, sendo ideal para todas as idades e estimulando o desenvolvimento pessoal de cada aluno. São cinco turmas espalhadas pela semana, de terça a sexta-feira.',
    descricao_curta: 'Tênis de mesa no Polo 1: cinco turmas na semana para aprender a modalidade e jogar.',
    descricao: 'O curso de Tênis de Mesa ensina técnicas e regras da modalidade, desenvolvendo agilidade, coordenação motora, foco e reflexos rápidos. As aulas promovem o espírito esportivo, a concentração e a saúde física, sendo ideal para todas as idades e estimulando o desenvolvimento pessoal de cada aluno. São cinco turmas espalhadas pela semana, de terça a sexta-feira.',
    publico: 'Todas as idades',
    diferencial: 'É o curso de tênis de mesa completo, com cinco turmas, enquanto o Tênis de mesa iniciante é a porta de entrada com aulas de uma hora.',
    o_que_levar: '',
    professor: 'Felipe',
    imagem: 'assets/cursos/tenis-de-mesa.svg',
    alt: 'Aluno jogando tênis de mesa em uma mesa oficial.',
    cores: {
    destaque: '#3e5975',
    periodo: '#8799af',
    vagas: '#99a2ab',
    vagasDestaque: '#e14c05',
    },
  },

  'tenis-de-mesa-iniciante': {
    titulo: 'Tênis de Mesa Iniciante',
    texto: 'Tênis de mesa iniciante é a turma de entrada na modalidade, com aulas de uma hora às segundas-feiras e às quintas-feiras, ambas às 14h. O foco está nos primeiros passos: postura do corpo, movimentos básicos do jogo e as regras da modalidade. É o ponto de partida antes das turmas de Tênis de Mesa, que são mais longas.',
    descricao_curta: 'Tênis de mesa para iniciantes: aulas de segunda e quinta às 14h, de uma hora.',
    descricao: 'Tênis de mesa iniciante é a turma de entrada na modalidade, com aulas de uma hora às segundas-feiras e às quintas-feiras, ambas às 14h. O foco está nos primeiros passos: postura do corpo, movimentos básicos do jogo e as regras da modalidade. É o ponto de partida antes das turmas de Tênis de Mesa, que são mais longas.',
    publico: '',
    diferencial: 'É a turma inicial da modalidade, com aulas de uma hora, ao contrário das turmas de Tênis de Mesa, que duram de uma a três horas.',
    o_que_levar: '',
    professor: 'Guilherme Correa',
  },

  'futebol-kids': {
    titulo: 'Futebol Kids',
    texto: 'O Futebol Kids reúne as duas turmas de futebol infantil do Polo 1: uma às segundas-feiras e outra às quintas-feiras, ambas das 15h às 16h. As aulas têm a bola como centro, na área de Esporte e Lazer. É a porta de entrada das crianças no futebol, separada do Futebol masc., que é a turma dos jovens.',
    descricao_curta: 'Futebol Kids: aulas de segunda e quinta às 15h, a turma de futebol das crianças.',
    descricao: 'O Futebol Kids reúne as duas turmas de futebol infantil do Polo 1: uma às segundas-feiras e outra às quintas-feiras, ambas das 15h às 16h. As aulas têm a bola como centro, na área de Esporte e Lazer. É a porta de entrada das crianças no futebol, separada do Futebol masc., que é a turma dos jovens.',
    publico: 'Crianças',
    diferencial: 'É a única turma de futebol para crianças; o Futebol masc. atende os jovens, em outro dia e horário.',
    o_que_levar: '',
    professor: 'Guilherme Correa',
  },

  'futebol-masc': {
    titulo: 'Futebol Masc.',
    texto: 'Futebol masc. é a turma de futebol dos jovens e tem duas aulas às terças-feiras, das 16h às 17h e das 17h às 18h. O trabalho acontece com a bola no centro das atividades, na área de Esporte e Lazer. Fica separada do Futebol Kids, que atende as crianças em outros dias e horários.',
    descricao_curta: 'Futebol masc. para jovens: duas turmas às terças-feiras, às 16h e às 17h.',
    descricao: 'Futebol masc. é a turma de futebol dos jovens e tem duas aulas às terças-feiras, das 16h às 17h e das 17h às 18h. O trabalho acontece com a bola no centro das atividades, na área de Esporte e Lazer. Fica separada do Futebol Kids, que atende as crianças em outros dias e horários.',
    publico: 'Jovens',
    diferencial: 'É a turma de futebol dos jovens, com duas turmas de terça à tarde, enquanto o Futebol Kids atende as crianças.',
    o_que_levar: '',
    professor: 'Guilherme Correa',
  },

  'desenho': {
    titulo: 'Desenho',
    texto: 'Desenho é uma das oficinas com mais opções de horário: todas as quartas-feiras, às 9h, 14h, 16h, 17h e 18h. Cada turma se dedica ao traço e à criação de imagens, com acompanhamento da professora. Como as aulas se encontram em turnos diferentes, dá para escolher o que encaixa na rotina.',
    descricao_curta: 'Desenho todas as quartas-feiras, em cinco turmas do começo da manhã até o fim da noite.',
    descricao: 'Desenho é uma das oficinas com mais opções de horário: todas as quartas-feiras, às 9h, 14h, 16h, 17h e 18h. Cada turma se dedica ao traço e à criação de imagens, com acompanhamento da professora. Como as aulas se encontram em turnos diferentes, dá para escolher o que encaixa na rotina.',
    publico: '',
    diferencial: 'É a única oficina com cinco turmas na mesma semana, todas às quartas-feiras, da manhã à noite.',
    o_que_levar: '',
    professor: 'Grazi',
  },

  'musicalizacao': {
    titulo: 'Musicalização',
    texto: 'Musicalização pertence à área de Educação e Conhecimento e acontece às quintas-feiras em três horários: 9h, 14h e 18h. Nas aulas a turma canta, ouve e experimenta sons, trabalhando ritmo e escuta em grupo. É a oficina de exploração musical do catálogo, diferente do Coral, que se encontra às segundas-feiras.',
    descricao_curta: 'Musicalização com aulas de quinta em três turnos, para cantar e explorar o mundo dos sons.',
    descricao: 'Musicalização pertence à área de Educação e Conhecimento e acontece às quintas-feiras em três horários: 9h, 14h e 18h. Nas aulas a turma canta, ouve e experimenta sons, trabalhando ritmo e escuta em grupo. É a oficina de exploração musical do catálogo, diferente do Coral, que se encontra às segundas-feiras.',
    publico: '',
    diferencial: 'É a única oficina de música realizada em três turnos de quinta-feira, enquanto o Coral é às segundas e a Bateria às terças.',
    o_que_levar: '',
    professor: 'Seme',
  },

  'violao': {
    titulo: 'Violão',
    texto: 'O curso de Violão pertence à área de Educação e Conhecimento e ocupa as sextas-feiras, em três turmas: 16h, 17h e 18h. Nas aulas se toca em grupo, com tempo para aprender, repetir o que foi visto e tirar dúvidas. É o violão sem nível indicado no nome; as turmas de iniciante infantil, iniciante juvenil e intermediário/avançado ficam separadas.',
    descricao_curta: 'Violão em três turmas nas sextas-feiras, com aulas às 16h, 17h e 18h.',
    descricao: 'O curso de Violão pertence à área de Educação e Conhecimento e ocupa as sextas-feiras, em três turmas: 16h, 17h e 18h. Nas aulas se toca em grupo, com tempo para aprender, repetir o que foi visto e tirar dúvidas. É o violão sem nível indicado no nome; as turmas de iniciante infantil, iniciante juvenil e intermediário/avançado ficam separadas.',
    publico: '',
    diferencial: 'É o único violão do catálogo sem nível no nome, ao lado das turmas de infantil, juvenil, iniciante e intermediário/avançado.',
    o_que_levar: '',
    professor: 'Fábio',
  },

  'violao-iniciante-infantil': {
    titulo: 'Violão Iniciante Infantil',
    texto: 'Violão iniciante infantil é a porta de entrada do instrumento para as crianças, com aulas de uma hora às segundas-feiras (14h) e às quintas-feiras (15h). O trabalho começa do zero: postura, afinação e os primeiros acordes, com o professor da turma acompanhando cada aluno. Para quem já passou por aqui, o caminho segue para o Violão iniciante juvenil.',
    descricao_curta: 'Violão iniciante para crianças: aulas de segunda e quinta à tarde, na primeira etapa.',
    descricao: 'Violão iniciante infantil é a porta de entrada do instrumento para as crianças, com aulas de uma hora às segundas-feiras (14h) e às quintas-feiras (15h). O trabalho começa do zero: postura, afinação e os primeiros acordes, com o professor da turma acompanhando cada aluno. Para quem já passou por aqui, o caminho segue para o Violão iniciante juvenil.',
    publico: 'Crianças',
    diferencial: 'É o único violão com público infantil, com aulas de uma hora antes do Violão iniciante juvenil.',
    o_que_levar: '',
    professor: 'Fábio (segunda-feira, 14h–15h) e Seme (quinta-feira, 15h–16h)',
  },

  'violao-iniciante-juvenil': {
    titulo: 'Violão Iniciante Juvenil',
    texto: 'O Violão iniciante juvenil é a turma de violão para quem já é jovem e está começando. A aula acontece às segundas-feiras, das 15h às 16h, e introduz o aluno no instrumento a partir do básico. Quem já domina o início e quer subir de nível faz o Violão intermediário/avançado.',
    descricao_curta: 'Violão iniciante para jovens: aula de segunda à tarde, no começo da caminhada.',
    descricao: 'O Violão iniciante juvenil é a turma de violão para quem já é jovem e está começando. A aula acontece às segundas-feiras, das 15h às 16h, e introduz o aluno no instrumento a partir do básico. Quem já domina o início e quer subir de nível faz o Violão intermediário/avançado.',
    publico: 'Jovens',
    diferencial: 'É a única turma de violão para jovens, enquanto o infantil atende crianças e o intermediário/avançado não tem faixa definida.',
    o_que_levar: '',
    professor: 'Fábio',
  },

  'violao-juvenil-e-adulto-iniciante': {
    titulo: 'Violão Juvenil e Adulto Iniciante',
    texto: 'Violão juvenil e adulto iniciante atende quem é jovem ou adulto e quer começar a tocar. A turma se encontra às quintas-feiras de manhã, das 10h às 11h, na área de Educação e Conhecimento. É a porta de entrada do instrumento na faixa juvenil e adulta, diferente do Violão iniciante infantil e do iniciante juvenil. Quem já tem base avança para o Violão intermediário/avançado.',
    descricao_curta: 'Violão para jovens e adultos que estão começando: aula de quinta de manhã, às 10h.',
    descricao: 'Violão juvenil e adulto iniciante atende quem é jovem ou adulto e quer começar a tocar. A turma se encontra às quintas-feiras de manhã, das 10h às 11h, na área de Educação e Conhecimento. É a porta de entrada do instrumento na faixa juvenil e adulta, diferente do Violão iniciante infantil e do iniciante juvenil. Quem já tem base avança para o Violão intermediário/avançado.',
    publico: 'Jovens e adultos',
    diferencial: 'É o único violão que reúne jovens e adultos no mesmo nível iniciante, às quintas de manhã.',
    o_que_levar: '',
    professor: 'Seme',
  },

  'violao-intermediario-avancado': {
    titulo: 'Violão Intermediário / Avançado',
    texto: 'O Violão intermediário/avançado é a turma para quem já tem base no instrumento e quer subir de nível. As aulas acontecem às quintas-feiras, das 16h às 17h, na área de Educação e Conhecimento. É a etapa mais adiantada do violão no catálogo, acima de todas as turmas iniciantes.',
    descricao_curta: 'Violão intermediário e avançado para quem já toca: aula de quinta às 16h.',
    descricao: 'O Violão intermediário/avançado é a turma para quem já tem base no instrumento e quer subir de nível. As aulas acontecem às quintas-feiras, das 16h às 17h, na área de Educação e Conhecimento. É a etapa mais adiantada do violão no catálogo, acima de todas as turmas iniciantes.',
    publico: '',
    diferencial: 'É o único violão de nível intermediário/avançado do catálogo, acima de todas as turmas iniciantes.',
    o_que_levar: '',
    professor: 'Seme',
  },

  'xadrez': {
    titulo: 'Xadrez',
    texto: 'O Xadrez é uma oficina da área de Educação e Conhecimento com três turmas às terças-feiras: 15h, 18h e 19h. A aula se organiza em torno do jogo de tabuleiro, com as partidas e o estudo de posições. É o único curso de estratégia do catálogo, e o único com turmas à tarde e à noite no mesmo dia.',
    descricao_curta: 'Xadrez com três turmas às terças-feiras, à tarde e à noite, para quem gosta de jogo de tabuleiro.',
    descricao: 'O Xadrez é uma oficina da área de Educação e Conhecimento com três turmas às terças-feiras: 15h, 18h e 19h. A aula se organiza em torno do jogo de tabuleiro, com as partidas e o estudo de posições. É o único curso de estratégia do catálogo, e o único com turmas à tarde e à noite no mesmo dia.',
    publico: '',
    diferencial: 'É o único curso de xadrez do catálogo, com três turmas na terça-feira, incluindo a faixa da tarde e da noite.',
    o_que_levar: '',
    professor: 'Fernando',
  },

  'ingles': {
    titulo: 'Inglês',
    texto: 'O curso de Inglês pertence à área de Educação e Conhecimento e tem duas turmas às quintas-feiras, das 17h às 18h e das 18h às 19h. A aula trabalha o idioma em sala, com prática de conversa, vocabulário e escrita no ritmo da turma. São os dois únicos horários de inglês do catálogo, no mesmo dia e em turnos diferentes.',
    descricao_curta: 'Inglês com duas turmas às quintas-feiras: uma às 17h e outra às 18h.',
    descricao: 'O curso de Inglês pertence à área de Educação e Conhecimento e tem duas turmas às quintas-feiras, das 17h às 18h e das 18h às 19h. A aula trabalha o idioma em sala, com prática de conversa, vocabulário e escrita no ritmo da turma. São os dois únicos horários de inglês do catálogo, no mesmo dia e em turnos diferentes.',
    publico: '',
    diferencial: 'É o único curso de idiomas do catálogo, com duas turmas no mesmo dia e em turnos diferentes.',
    o_que_levar: '',
    professor: 'Daniele',
  },

  'coral': {
    titulo: 'Coral',
    texto: 'O Coral é uma oficina de Cultura e Artes com três turmas às segundas-feiras, às 15h, 16h e 17h. O trabalho é de canto em conjunto, com atenção à afinação, ao timbre e à entrada de cada voz no grupo. Diferente da Musicalização, que explora os sons de forma mais livre, aqui a proposta é cantar juntos.',
    descricao_curta: 'Coral em três turmas às segundas-feiras, para cantar em grupo e trabalhar afinação.',
    descricao: 'O Coral é uma oficina de Cultura e Artes com três turmas às segundas-feiras, às 15h, 16h e 17h. O trabalho é de canto em conjunto, com atenção à afinação, ao timbre e à entrada de cada voz no grupo. Diferente da Musicalização, que explora os sons de forma mais livre, aqui a proposta é cantar juntos.',
    publico: '',
    diferencial: 'É o único coral do catálogo, com três turmas na segunda-feira, enquanto as outras oficinas de música tratam do som de outro jeito.',
    o_que_levar: '',
    professor: 'Silvia',
  },

  'bateria': {
    titulo: 'Bateria',
    texto: 'A Bateria é a oficina de percussão do Polo 1 e funciona às terças-feiras em seis turmas: 14h, 15h, 16h, 17h, 18h e 19h. O tempo da aula é dedicado ao ritmo e à prática da percussão em conjunto, com acompanhamento do professor. É a única oficina de percussão do catálogo e a que ocupa a terça-feira do início da tarde até o fim da noite.',
    descricao_curta: 'Bateria com seis turmas às terças-feiras, do começo da tarde até o fim da noite.',
    descricao: 'A Bateria é a oficina de percussão do Polo 1 e funciona às terças-feiras em seis turmas: 14h, 15h, 16h, 17h, 18h e 19h. O tempo da aula é dedicado ao ritmo e à prática da percussão em conjunto, com acompanhamento do professor. É a única oficina de percussão do catálogo e a que ocupa a terça-feira do início da tarde até o fim da noite.',
    publico: '',
    diferencial: 'É a oficina de percussão do catálogo e a única com seis turmas na mesma noite de terça-feira.',
    o_que_levar: '',
    professor: 'Caldana',
  },

  'fanfarra': {
    titulo: 'Fanfarra',
    texto: 'A Fanfarra é uma oficina de Cultura e Artes que se encontra às quintas-feiras, das 17h às 18h. Na aula, a turma toca em conjunto, trabalhando música e a organização do som do grupo. É uma oficina de música com horário único no catálogo, diferente do Coral, da Bateria e da Musicalização.',
    descricao_curta: 'Fanfarra: uma aula de quinta às 17h, com música e tocadas em conjunto.',
    descricao: 'A Fanfarra é uma oficina de Cultura e Artes que se encontra às quintas-feiras, das 17h às 18h. Na aula, a turma toca em conjunto, trabalhando música e a organização do som do grupo. É uma oficina de música com horário único no catálogo, diferente do Coral, da Bateria e da Musicalização.',
    publico: '',
    diferencial: 'É a única Fanfarra do catálogo, com um único horário às quintas às 17h.',
    o_que_levar: '',
    professor: 'Seme',
  },

  'artesanato': {
    titulo: 'Artesanato',
    texto: 'Artesanato aparece em três turmas às terças-feiras, às 15h, 16h e 17h, dentro da área de Cultura e Artes. O tempo da aula é dedicado à prática do artesanato, com espaço para cada aluno produzir suas peças e trocar ideias com a turma. É a oficina de artesanato sem público específico no nome, ao contrário do Artesanato infantil, que é a turma da noite para crianças.',
    descricao_curta: 'Artesanato às terças-feiras, em três turmas à tarde, para criar peças com as mãos.',
    descricao: 'Artesanato aparece em três turmas às terças-feiras, às 15h, 16h e 17h, dentro da área de Cultura e Artes. O tempo da aula é dedicado à prática do artesanato, com espaço para cada aluno produzir suas peças e trocar ideias com a turma. É a oficina de artesanato sem público específico no nome, ao contrário do Artesanato infantil, que é a turma da noite para crianças.',
    publico: '',
    diferencial: 'É a oficina de artesanato com três turmas à tarde, separada do Artesanato infantil, que é a turma noturna para crianças.',
    o_que_levar: '',
    professor: 'Silvia',
  },

  'artesanato-infantil': {
    titulo: 'Artesanato Infantil',
    texto: 'O Artesanato infantil é a turma da noite para crianças, às segundas-feiras, das 18h às 19h, na área de Cultura e Artes. A aula é dedicada à prática do artesanato com as crianças, com tempo para cada uma produzir suas peças ao longo do horário. É a única turma de artesanato com público infantil e a única que começa às 18h.',
    descricao_curta: 'Artesanato para crianças: uma turma à noite, segunda-feira, das 18h às 19h.',
    descricao: 'O Artesanato infantil é a turma da noite para crianças, às segundas-feiras, das 18h às 19h, na área de Cultura e Artes. A aula é dedicada à prática do artesanato com as crianças, com tempo para cada uma produzir suas peças ao longo do horário. É a única turma de artesanato com público infantil e a única que começa às 18h.',
    publico: 'Crianças',
    diferencial: 'É a única turma de artesanato marcada como infantil e a única que começa às 18h.',
    o_que_levar: '',
    professor: 'Silvia',
  },

  'ballet': {
    titulo: 'Ballet',
    texto: 'O Ballet é uma oficina de Cultura e Artes que se encontra às quintas-feiras, com aulas às 14h, 15h e 18h. As turmas são separadas por faixa etária: uma para crianças de 4 a 5 anos e outra para as de 6 a 10 anos. O trabalho percorre os passos básicos do ballet, com atenção à postura e ao uso do corpo.',
    descricao_curta: 'Ballet às quintas-feiras, com turmas para crianças de 4 a 5 anos e de 6 a 10 anos.',
    descricao: 'O Ballet é uma oficina de Cultura e Artes que se encontra às quintas-feiras, com aulas às 14h, 15h e 18h. As turmas são separadas por faixa etária: uma para crianças de 4 a 5 anos e outra para as de 6 a 10 anos. O trabalho percorre os passos básicos do ballet, com atenção à postura e ao uso do corpo.',
    publico: 'Crianças de 4 a 5 anos e de 6 a 10 anos',
    diferencial: 'É o único curso do catálogo com faixa etária registrada por turma, ao lado do Ballet juvenil adulto.',
    o_que_levar: '',
    professor: 'Carolina',
  },

  'ballet-juvenil-adulto': {
    titulo: 'Ballet Juvenil Adulto',
    texto: 'O Ballet juvenil adulto é a turma de ballet para jovens e adultos, com aula às quintas-feiras, das 17h às 18h, na área de Cultura e Artes. A aula trabalha os passos do ballet com o grupo de idade, em uma proposta diferente das turmas infantis. É a única turma de ballet voltada a jovens e adultos, enquanto as demais atendem crianças.',
    descricao_curta: 'Ballet para jovens e adultos: aula única de quinta, das 17h às 18h.',
    descricao: 'O Ballet juvenil adulto é a turma de ballet para jovens e adultos, com aula às quintas-feiras, das 17h às 18h, na área de Cultura e Artes. A aula trabalha os passos do ballet com o grupo de idade, em uma proposta diferente das turmas infantis. É a única turma de ballet voltada a jovens e adultos, enquanto as demais atendem crianças.',
    publico: 'Jovens e adultos',
    diferencial: 'É a única turma de ballet para jovens e adultos, às 17h, enquanto as turmas de crianças têm faixas de 4 a 5 e de 6 a 10 anos.',
    o_que_levar: '',
    professor: 'Carolina',
  },

  'expressao-corporal-adulto': {
    titulo: 'Expressão Corporal Adulto',
    texto: 'A Expressão corporal adulto é uma oficina de Cultura e Artes que acontece às quintas-feiras, das 19h às 20h. A aula usa o corpo e o gesto como material de trabalho, em um grupo de adultos. É a única oficina de expressão corporal do catálogo e não se confunde com o Ballet juvenil adulto, que trabalha a dança clássica.',
    descricao_curta: 'Expressão corporal para adultos: aula de quinta à noite, das 19h às 20h.',
    descricao: 'A Expressão corporal adulto é uma oficina de Cultura e Artes que acontece às quintas-feiras, das 19h às 20h. A aula usa o corpo e o gesto como material de trabalho, em um grupo de adultos. É a única oficina de expressão corporal do catálogo e não se confunde com o Ballet juvenil adulto, que trabalha a dança clássica.',
    publico: 'Adultos',
    diferencial: 'É a única oficina de expressão corporal do catálogo, enquanto o ballet para maiores trabalha a dança clássica.',
    o_que_levar: '',
    professor: 'Carolina',
  },

};

/* Retorna o template de um curso pelo slug (ou null quando não há template). */
function buscarConteudoCurso(slugCurso) {
  if (!slugCurso) return null;
  return Object.prototype.hasOwnProperty.call(CURSO_CONTEUDO, slugCurso) ? CURSO_CONTEUDO[slugCurso] : null;
}
