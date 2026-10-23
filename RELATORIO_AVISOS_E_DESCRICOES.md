# Relatório — avisos e descrições das oficinas Conexões Polo 1

**Data:** 23/10/2026  
**Repositório:** [paradajovemitapetininga/Conexoes](https://github.com/paradajovemitapetininga/Conexoes)  
**Branch:** `feature/saiba-mais`  
**Pull Request:** [#3 — corrigir links e detalhes Saiba mais do catálogo](https://github.com/paradajovemitapetininga/Conexoes/pull/3)

## Resumo

A interface deixou de exibir mensagens técnicas de origem/consulta do Supabase, sem desativar a consulta nem o fallback. As 33 modalidades regulares distintas encontradas no catálogo agora têm uma descrição específica, ligada por slug exato. Quatro templates existentes foram revisados e 29 descrições complementares foram adicionadas. As três oficinas mantidas exclusivamente no fluxo de agendamento continuam sem página ou horário fictício.

A auditoria encontrou também um valor padrão que apresentava **“Vagas disponíveis”** mesmo quando a fonte não trazia status. Como nenhum dos 66 horários locais de fallback tem status explícito, o padrão foi removido; os indicadores de vagas aparecem somente quando há status vindo dos dados ou de override institucional explícito.

## Diagnóstico e mudanças

A consulta pública inspecionada não retornou horários ativos do Supabase; o catálogo continuou carregando a lista de referência local. Não foi identificada uma falha técnica de conexão que justificasse desativar a integração, e o banco não foi alterado.

Foram retiradas do DOM e da renderização pública as mensagens técnicas de origem do catálogo e do detalhe. Os diagnósticos continuam no console: aviso quando o cliente Supabase não está disponível, informação quando a consulta não retorna horários ativos e erro quando uma consulta falha. O fallback local e o tratamento de erros permanecem ativos. Não houve ocultação de erro por CSS.

Foram mantidos o estado acessível de carregamento, a mensagem útil de “nenhum curso encontrado”, o estado de oficina não encontrada e o acesso às opções de agendamento por WhatsApp. A mensagem de página não encontrada foi reformulada para orientar o visitante de volta ao catálogo.

## Cobertura das oficinas

| Resultado | Quantidade |
|---|---:|
| Horários regulares no catálogo local | 66 |
| Nomes distintos elegíveis para “Saiba mais” | 33 |
| Descrições específicas disponíveis | 33 |
| Templates já existentes revisados e mantidos | 4 |
| Complementos locais específicos adicionados | 29 |
| Opções exclusivas de agendamento, sem página de detalhe | 3 |
| Status explícitos de vagas nos horários de fallback | 0 de 66 |

A matriz completa, com nome, slug, texto da descrição, origem, elegibilidade, validação, confiança e observações, está em [Matriz de verificação das oficinas (CSV)](./MATRIZ_VERIFICACAO_OFICINAS.csv).

As opções **Violino, Informática e Flauta** permanecem no fluxo de agendamento por WhatsApp. Não foram criados detalhes ou horários fictícios para elas.

## Regras de conteúdo e correspondência

A prioridade é: (1) descrição confiável do Supabase; (2) template específico existente no projeto; (3) complemento local específico; (4) mensagem neutra com aviso técnico no console se surgir uma oficina nova cuja modalidade não esteja identificada com segurança. A associação usa slugs exatos, sem busca por prefixo; o ID da oficina continua sendo o identificador principal quando disponível e o slug mantém compatibilidade com links existentes.

Os textos são descrições gerais das atividades, não currículos da instituição. Professor, categoria, faixa etária, dia e horário continuam sendo exibidos a partir dos registros usados pelo catálogo, sem novos dados de turma. A disponibilidade de vagas só aparece quando está explícita na fonte ou em um override confirmado.

## Informações que ainda precisam de validação institucional

- **Alongamento Danjeon (confiança baixa):** o cadastro não explica “Danjeon”. O texto limita-se ao sentido geral de alongamento; confirmar com a equipe antes de atribuir uma técnica ou metodologia.
- **Artesanato infantil, Expressão corporal adulto, Inglês e Musicalização (confiança média):** a descrição é deliberadamente geral porque os arquivos consultados não detalham projetos/materiais, exercícios/técnicas, nível/conteúdo do idioma ou práticas musicais específicas.
- **Conteúdo pedagógico de todas as oficinas:** currículo, método, repertório, exercícios e resultados específicos da turma não foram fornecidos; nenhum foi inventado.
- **Horários, professores, categoria e faixas etárias atuais:** como a consulta pública do Supabase não apresentou linhas ativas durante a auditoria, os horários e nomes mostrados vêm do fallback local existente e não puderam ser conferidos contra registros ativos. A instituição deve confirmar que essa referência ainda está atualizada.
- **Vagas:** não há status explícito para os 66 horários do fallback. Por isso, “Vagas disponíveis” não é mais presumido e os indicadores ficam ocultos até haver informação confirmada.

## Testes realizados

- `node --test tests/*.test.cjs`: **18 aprovados, 0 falhas**. Inclui consulta/fallback, status explícito, cobertura de 33 nomes, prioridade de fontes, slugs semelhantes, neutralização de oficina desconhecida e exclusão de agendamentos.
- `node --check` nos arquivos JavaScript e `git diff --check`: aprovados.
- Chromium/Playwright: foram acessados pelos links “Saiba mais” todos os **33 slugs elegíveis**; todos carregaram título, descrição e estado de carregamento concluído. Não apareceram mensagens técnicas nem status de vagas não confirmados.
- Testes adicionais: atualização do navegador, botão voltar ao catálogo, ID inexistente, oficina inexistente, busca por “xadrez”, filtro noturno, páginas com e sem template e páginas sem status.
- Viewports desktop de 1280×900 e móvel de 390×844: 66 cards e 3 links de agendamento; sem overflow horizontal. Na amostra móvel e desktop, a disponibilidade não confirmada ficou oculta.
- Durante o smoke test: 0 erros de página JavaScript, 0 requisições falhas e 0 respostas de erro para arquivos do site.

## Arquivos incluídos nesta entrega

- `app.js`, `curso.js`, `dados.js`, `curso-conteudo.js`, `index.html`, `curso.html` e `styles.css`.
- `tests/catalog-data.test.cjs` e `tests/course-content.test.cjs`.
- `MATRIZ_VERIFICACAO_OFICINAS.csv`.

## Pendências externas

Nenhuma alteração de banco foi necessária. A PR permanece aberta para revisão/merge. A confirmação institucional das pendências de conteúdo e atualização dos dados de horário/professor/vagas é recomendada; sem dados ativos no Supabase, esta tarefa não pode confirmar que a lista local de referência represente a programação atual.


## Complemento de validação e publicação

A revisão das descrições resultou em **28 de confiança alta, 4 média e 1 baixa**; essas classificações e as observações por oficina estão na matriz CSV. O segundo smoke test carregou diretamente os 33 detalhes e registrou **0 erros no console, 0 erros de página, 0 requisições falhas e 0 respostas de erro HTTP do site**.

Após o push do commit `bc809cc`, a verificação da Vercel reportou o deployment como concluído. A URL [Preview da branch](https://conexoes-polo1-git-feature-saiba-mais-conexoes-1.vercel.app/) redireciona visitantes sem sessão para o login da Vercel (SSO/proteção do projeto). Portanto, o deployment foi confirmado pela Vercel, mas a inspeção visual diretamente nesse Preview depende de acesso autenticado ao projeto; os testes locais acima cobrem as rotas e viewports solicitados.
