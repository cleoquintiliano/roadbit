# RoadBit: esboço da atividade gamificada (5W2H)

Versão 0.2 · 17 de novembro de 2026 · Cléo Quintiliano Fernandes de Brito

> O jogo se chamava **O Mensageiro** até 16/11/2026; o mensageiro continua como personagem. A versão deste esboço que acompanhou a v0.1 está em [versoes/v0.1/docs](../versoes/v0.1/docs/esboco-5W2H.md).

## Visão geral

RoadBit é uma aplicação web gamificada em que o estudante faz o papel do computador: lê um código, executa, prevê, explica e conserta. A inspiração inicial foi o Compute It (Toxicode), mas o RoadBit se posiciona no campo das ferramentas de leitura, rastreio e depuração de código, como UUhistle, Python Tutor, Gidget, PRIMM e My Trace Table, e reúne num só jogo o que cada uma delas faz em parte: rastrear, prever, depurar, explicar e teste de mesa, com narrativa e retorno em camadas (ver "RoadBit e as ferramentas do mesmo escopo" e o relatório de novidade).

- **Formato:** plugado, aplicação web que roda no navegador de computador ou celular, sem instalação. O código aparece em pseudocódigo em português com símbolos gráficos; a arquitetura já prevê blocos, Python e JavaScript.
- **Narrativa em uma frase:** um robô mensageiro atravessa a cidade levando pão, remédio e cartas; cada missão é alguém que precisa dele, e cada código é o caminho até essa pessoa.
- **Ideia central:** entender um programa vem antes de escrevê-lo. O estudante rastreia (executa o código de cabeça), prevê o resultado, encontra erros e explica o que o código faz.
- **Trilha da v0.2:** 16 marcos num mapa único (12 principais e 4 bônus), com 12 missões cada, num total de 192 missões. A justificativa está em [trilha-de-aprendizagem.md](trilha-de-aprendizagem.md).
- **Valores implícitos:** cuidado com quem está à margem do caminho, partilha, buscar quem se perdeu e recomeço sem punição. Nenhuma referência religiosa é explícita, o que mantém o material adequado à escola pública laica e à escola confessional.

## Estrutura adotada: 5W2H com a Taxonomia de Toda no "Como"

O planejamento segue o Framework 5W2H de Klock, Gasparini e Pimenta (2016), e a taxonomia de Toda et al. (2019) fornece os elementos de jogo da dimensão "Como".

1. **Processo, não catálogo.** A taxonomia lista elementos em cinco dimensões; o 5W2H obriga a decidir público, finalidade, momento, implementação e avaliação. Isso evita gamificação reduzida a pontos e medalhas.
2. **Aplicação por outros docentes.** As dimensões "Quando" e "Onde" se convertem no guia do professor exigido para a MEC RED.
3. **Avaliação.** A dimensão "Quanto" torna a atividade pesquisável, o que interessa ao mestrado.
4. **Coerência teórica.** Ana Carolina Tomé Klock é coautora das duas obras, então usá-las juntas segue a própria linha de pesquisa dos autores.

## 1. Quem (Who): público-alvo

Estudantes do 7º e 8º ano do Ensino Fundamental, com extensão possível ao 6º e ao 9º ano e ao 1º ano do Ensino Médio técnico como revisão de lógica de programação.

| Característica | Implicação no design |
| --- | --- |
| 11 a 14 anos, já tiveram contato com programação em blocos | Pseudocódigo em português, curto, com cores e formas; progressão do concreto ao abstrato |
| Níveis de leitura e de experiência muito diferentes na mesma turma | 12 missões por marco, 3 dicas gratuitas por marco, missões guiadas no início de cada marco e marcos bônus para quem avança mais rápido |
| Muitos estudantes de territórios vulneráveis | Sem ranking público; protagonismo positivo na narrativa; erro sem punição |
| Menores de idade | Nenhum dado pessoal na v0.2: progresso no aparelho e em código de progresso |
| Acesso desigual a equipamentos | Arquivo único que funciona sem internet, em computador de laboratório e em celular, inclusive em dupla num único aparelho |
| Estudantes com daltonismo ou baixa visão | Condições por forma e cor juntas; código grande que se ajusta à tela, nunca abaixo de 14 px |

**Docentes** são o segundo público: professores de Computação que vão aplicar o material sem a presença do autor, a partir da MEC RED.

## 2. O quê (What): conteúdos e tarefas

Os jogos de leitura de código voltados à escola básica, como Compute It, Light-Bot e Gidget, trabalham sobretudo o fluxo de controle e deixam de fora os dados: variável, operador, entrada, saída e lista. As ferramentas que mostram dados, como UUhistle, Python Tutor e My Trace Table, foram feitas para o ensino superior e não são jogos. O RoadBit mantém o fluxo de controle e acrescenta esse núcleo da lógica de programação, sempre dentro da história.

### Conteúdos: os 16 marcos

| Marco | Objeto de aprendizagem | Exemplo no RoadBit |
| --- | --- | --- |
| 1. A Padaria | Sequência | `direita()`, `baixo()`, `entregar()` |
| 2. A Rua Comprida | Repetição contada | `repetir (4) { direita() }`, com "volta 2 de 4" ao lado da linha |
| 3. As Calçadas Coloridas | Seleção: se e senão | `se ● { cima() } senão { direita() }` |
| 4. A Avenida Verde | Enquanto | `enquanto ■ { direita() }` |
| 5. A Mochila | Variáveis, tipos, entrada e saída | `pães ← 3`, `ler(n)`, `escrever(nome)`, `chovendo ← verdadeiro` |
| 6. A Balança | Operadores, contador e acumulador | `total ← total + placa()`, `r ← n % 3` |
| 7. A Portaria | Condições com variáveis | `se pães > 0 e aberta { entregar() }` |
| 8. Os Quarteirões | Laços aninhados | `para i de 1 até 2 { para j de 1 até 3 { ... } }` |
| 9. A Oficina | Funções: decomposição e reúso | `função degrau() { direita() baixo() }` |
| 10. A Central | Parâmetros e retorno | `função dobro(n) { retorna n * 2 }` |
| 11. O Armazém | Listas e registros | `rota ← [→, ↓, →]`, `casa.rua` |
| 12. O Arquivo | Algoritmos sobre listas | soma, contagem, maior e menor, busca, troca para ordenar |
| Bônus: O Espelho | Recursão | `função andar(n) { se n > 0 { direita() andar(n - 1) } }` |
| Bônus: As Pontes | Grafos | `enquanto livre(→) { direita() }`, rota como lista de arestas |
| Bônus: O Cofre | Criptografia: cifra de César | `c ← (m + chave) % 10` |
| Bônus: A Árvore | IA: árvore de decisão | `se peso > 5 { ... } senão { ... }`, ajustar o limite a partir de exemplos |

### Tarefas do estudante (4 modos e a reprodução)

1. **Rastrear:** executar o código passo a passo com setas, deslizando o dedo ou tocando nos botões. O foco passa por todas as linhas que o computador executa sozinho e para na linha da ação.
2. **Prever:** antes de executar, tocar na calçada onde o mensageiro vai parar ou escolher o valor final de uma variável. Ao conferir, o caminho aparece marcado.
3. **Depurar:** o código deveria levar o mensageiro até alguém, mas não leva. O estudante toca no valor suspeito, muda o número ou a direção e executa de novo; o mensageiro volta visivelmente ao início a cada mudança.
4. **Explicar:** escolher, entre três frases, a que descreve o que o código faz.
5. **Reproduzir:** ao fim de qualquer missão, rever a execução passo a passo, sem estrelas.

## 3. Por quê (Why): finalidade e estímulos

O objetivo é desenvolver a leitura e a compreensão de código, que vêm antes da escrita, e a capacidade de encontrar e corrigir erros.

**Objetivos de aprendizagem.** Ao final, o estudante deve conseguir:

- rastrear um programa com variáveis, seleção, repetição, funções e listas, acompanhando o teste de mesa;
- prever o resultado de um programa antes de executá-lo;
- localizar e corrigir erros de lógica;
- explicar o propósito de um trecho de código.

**Habilidades da BNCC Computação** (Normas sobre Computação na Educação Básica, Resolução CNE/CEB nº 1/2022). A relação completa por marco está na trilha de aprendizagem. Principais:

| Código | Habilidade (resumo) | Onde aparece no RoadBit |
| --- | --- | --- |
| EF06CO02 | Elaborar algoritmos com instruções sequenciais, de repetição e de seleção | Marcos 1 a 4, 7 e 8 |
| EF07CO02 | Analisar programas para detectar e remover erros | Modo Depurar, em todos os marcos |
| EF06CO01, EF06CO05 | Tipos de dados, entradas e saídas | Marco 5 |
| EF06CO04, EF07CO05 | Decomposição e reúso | Marco 9 |
| EF06CO06 | Algoritmo genérico com parâmetros | Marco 10 |
| EF07CO01, EF08CO02 | Registros, vetores e listas | Marco 11 |
| EF08CO03 | Algoritmos sobre listas | Marco 12 |
| EF08CO01 | Recursão | Bônus O Espelho |
| EF07CO04 | Grafos | Bônus As Pontes |
| EF09CO05 | Criptografia | Bônus O Cofre |

O texto de EF07CO02 e EF06CO02 foi conferido em fonte secundária; os demais códigos e textos devem ser conferidos no anexo oficial do Parecer CNE/CEB nº 2/2022 antes da entrega e do artigo. Aprendizado de máquina não tem habilidade específica no eixo Pensamento Computacional dos anos finais; o marco bônus A Árvore é uma extensão.

**Estímulos a promover:** curiosidade pela história, sensação de competência ao acertar na primeira tentativa, autonomia ao escolher a missão e decidir quando usar uma dica, e pertencimento ao trabalhar em dupla (Ryan; Deci, 2000).

## 4. Quando (When): trilha e momentos de uso

A trilha tem 12 marcos principais e 4 marcos bônus, num mapa único. Cada marco tem 12 missões curtas, de 2 a 5 minutos (microlearning): 2 guiadas, 4 de rastrear, 2 de prever, 2 de depurar, 1 de explicar e 1 desafio final. O próximo marco abre com 8 das 12 missões concluídas.

**Repetição dentro da aplicação.** A repetição que importa para aprender fica a cargo do jogo, não da perda de progresso:

- **Reforço por marco:** 12 missões por conceito, em quatro modos diferentes.
- **Rejogar com variação:** uma missão concluída pode ser rejogada; o mapa aparece espelhado, para que não dê para decorar.
- **Estrelas por domínio:** a missão vale de 1 a 3 estrelas. Voltar para buscar a terceira estrela é uma repetição escolhida, não imposta.

**Sugestão de uso em sala.** O professor pode usar um marco por aula de 50 minutos, conforme o plano da escola. Um percurso possível para o 7º ano, em 8 aulas:

1. Pré-teste de rastreio (10 min) e marco 1.
2. Marcos 2 e 3.
3. Marco 4 e início do marco 5.
4. Marcos 5 e 6.
5. Marco 7, em dupla.
6. Marco 8.
7. Marco 9 e marco bônus A Árvore para quem terminar.
8. Pós-teste e roda de conversa sobre a história e os erros mais comuns.

Os marcos 10 a 12 e os bônus servem para o 8º e o 9º ano ou para quem avança mais rápido. Como o progresso fica salvo e pode ser levado por código, o estudante pode continuar em casa ou em outro computador.

## 5. Como (How): mecânicas e elementos de jogo

Os elementos de jogo foram escolhidos para servir à compreensão do código, e não como enfeite.

**Erro em camadas, sem punição e sem texto moral.**

1. **1º erro:** a linha treme e um "fantasma" do mensageiro mostra para onde o estudante tentou ir. O estudante continua do ponto do erro, não do zero.
2. **2º erro no mesmo passo:** uma pista ligada à linha e ao contexto, por exemplo "você está na volta 2 de 4 do laço".
3. **3º erro ou dica:** a explicação do passo e o botão certo pisca.

**Visualização da execução** (orientações do orientador, validadas na literatura; ver a trilha de aprendizagem): foco que passa linha a linha, inclusive chaves e linhas de função, e para na linha da ação com cor mais forte; linha que pisca ao voltar ao laço, com "volta 2 de 4"; condições com "sim" ou "não"; caminho percorrido marcado; reprodução passo a passo sem estrelas; e volta do mensageiro ao início no Depurar.

**Elementos da Taxonomia de Toda et al. (2019) utilizados:**

| Dimensão | Elemento | Como aparece |
| --- | --- | --- |
| Ficcional | Narrativa e contar histórias | Lugares da cidade por marco e um morador em cada missão; a casa acende e alguém aparece à janela |
| Desempenho | Progressão e nível | Mapa único com 16 marcos; cada marco mostra quantas das 12 missões foram concluídas |
| Desempenho | Pontos e estatísticas | Estrelas por missão, visíveis no mapa e na tela de fim, nunca durante o jogo |
| Desempenho | Reconhecimento | Insígnias por conceito dominado (versão futura) |
| Pessoal | Quebra-cabeça e objetivo | Cada missão tem destino e pessoa explícitos |
| Pessoal | Novidade e renovação | Missões espelhadas ao rejogar; quatro modos por marco |
| Pessoal | Sensação | Sons curtos e casa que acende, com opção de silenciar e de reduzir o movimento |
| Social | Cooperação | Modo em dupla: o piloto executa, o navegador lê o código e confere; os papéis trocam a cada missão |

**Dicas sem economia.** Cada marco oferece 3 dicas gratuitas, sem moedas. O andaime continua, sem uma economia competindo com o desafio pela atenção do estudante.

**Elementos evitados de propósito:**

- **Ranking público e pressão social:** expor quem está em último lugar desmotiva, sobretudo estudantes de territórios vulneráveis.
- **Competição individual:** só como desafio opcional entre equipes, escolhido pelo professor.
- **Pressão de tempo:** rastrear código exige atenção, não pressa.

### Experiência do estudante (UX e UI)

O que prende os estudantes nos jogos de leitura de código é o ritmo: uma tecla é uma instrução, a resposta é imediata, há pouco texto, o visual é sóbrio e errar custa pouco. O risco do RoadBit é somar recursos e perder isso. Por isso, o projeto segue estes princípios:

1. **Proteger o ciclo central.** Uma tecla é uma instrução; o foco linha a linha é rápido, pode ser pulado e desligado.
2. **Tudo visível sem rolagem nem zoom.** O código e o mapa se ajustam ao tamanho da tela; um teste automático confere as 192 missões em cinco tamanhos de tela.
3. **Revelação progressiva.** O quadro de variáveis só aparece quando a missão tem variáveis; o teste de mesa completo aparece nas telas largas.
4. **Erro em camadas** e **valores mostrados, não ditos.**
5. **Manipulação direta.** Prever é tocar na calçada; depurar é tocar no valor e girar.
6. **Recompensas discretas.** Estrelas só no mapa e no fim da missão; dicas gratuitas e limitadas.
7. **Visual sóbrio e adolescente.** Formas planas, paleta clara e leve, fonte Ubuntu (Ubuntu Mono no código), personagem sem diálogos; celular primeiro.
8. **Acessibilidade sem perder estética.** Condições por forma e cor (● ▲ ■), uso completo pelo teclado, áreas de toque grandes e respeito à preferência de reduzir movimento.

### Mapa de progressão da cidade

Na v0.1, cada bairro (capítulo) tinha seu próprio mapa. Na v0.2, o mapa é **único**: os 12 marcos seguem uma rua contínua e os 4 marcos bônus ficam no Bairro bônus. Cada marco trabalha um objeto de aprendizagem e abre um cartão com o conceito, um exemplo de código, a habilidade da BNCC e as 12 missões. A progressão visível fortalece o elemento Progressão de Toda et al. (2019) e apoia as necessidades de competência e autonomia (Ryan; Deci, 2000).

O detalhamento completo do jogo está no [Game Design Document (GDD)](GDD.md).

## 6. Onde (Where): implementação

**v0.2 (entrega de 23/11).** Um único arquivo HTML, com fontes embutidas, que funciona sem internet depois de aberto, publicado no GitHub Pages. O progresso fica no aparelho e num código de progresso (RB2-…) que o estudante anota para continuar em outro computador. Nenhum dado pessoal é coletado.

### Arquitetura: uma estrutura, várias linguagens

Cada missão é guardada como uma árvore sintática abstrata (AST), uma estrutura de dados que representa o programa sem depender de linguagem. Um único interpretador executa essa árvore e gera o rastro completo da execução; cada linguagem é apenas uma forma de exibi-la.

| Forma de exibição | Exemplo da mesma condição | Versão |
| --- | --- | --- |
| Pseudocódigo em português com símbolos gráficos | `se ● {` | v0.1 e v0.2 |
| Blocos (Blockly) | Bloco colorido de condição | Futura |
| Python | `if casa_laranja():` | Futura |
| JavaScript | `if (casaLaranja()) {` | Futura |

### Versão futura com servidor

Para uso em escala, está prevista uma versão com servidor (React com TypeScript como PWA, Supabase na região de São Paulo), com duas formas de entrar: e-mail institucional da escola ou apelido aleatório com código de recuperação, cuja relação com o nome real fica só com o professor, no papel. Regras de proteção de dados: melhor interesse do estudante (LGPD, art. 14; Enunciado CD/ANPD nº 1/2023), mínimo de dados, sem anúncios nem rastreadores e exclusão dos dados ao fim do ano letivo. Essas regras são uma proposta de projeto, não um parecer jurídico; a escola ou a secretaria deve validar o termo de uso antes da aplicação.

### Painel do professor (futuro)

Criação da turma, mapa de calor dos conceitos com mais erros e dicas, liberação de marcos e exportação dos resultados. Na v0.2, o professor pode abrir todas as missões com o endereço do jogo seguido de `?tudo`.

### Publicação na MEC RED

Uma coleção com: link da aplicação, guia do professor, plano de aulas, pré e pós-teste e vídeo curto de demonstração, sob licença aberta (Creative Commons).

## 7. Quanto (How much): avaliação dos resultados

| O que se mede | Instrumento | Indicador |
| --- | --- | --- |
| Aprendizagem de rastreio e depuração | Pré e pós-teste com questões equivalentes | Diferença de acertos |
| Domínio por conceito | Registros da aplicação (versão com servidor) | Acertos na primeira tentativa, por marco |
| Autonomia | Registros da aplicação | Dicas usadas e sua queda ao longo dos marcos |
| Concepções equivocadas | Registros da aplicação | Erros mais frequentes, por exemplo tratar `se` como `enquanto` |
| Engajamento e percepção | Questionário validado (a escolher) | Interesse, dificuldade percebida, vontade de continuar |
| Valores trabalhados | Roda de conversa guiada | Relações entre a história e o cotidiano |

**Teste de jogo.** Um primeiro teste informal foi feito em novembro de 2026 com a v0.1: os estudantes, que já conheciam jogos de leitura de código, relataram que o RoadBit é mais completo e mais divertido. Esse relato orienta o desenho, mas não é dado de pesquisa. O teste formal será uma aula de 50 minutos com uma turma de 7º ano, observando onde os estudantes travam, comemoram e desistem. Para virar dado da dissertação, o caminho ético da pesquisa com estudantes precisa estar resolvido antes.

## RoadBit e as ferramentas do mesmo escopo

O RoadBit não se define contra uma ferramenta, mas pelo que reúne do campo. A matriz resume a comparação com aplicações e pesquisas de leitura, rastreio e depuração de código (detalhes no [relatório de novidade](relatorio-novidade.md)). Legenda: ✓ tem; ◐ tem em parte; ✗ não tem.

| Característica | RoadBit v0.2 | Compute It | UUhistle | Python Tutor | Gidget | PRIMM | My Trace Table | Light-Bot |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Estudante simula a execução | ✓ | ✓ | ✓ | ✗ | ◐ | ✗ | ◐ | ✗ |
| Prever o resultado antes | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Depurar código dado | ✓ | ✗ | ✗ | ✗ | ✓ | ◐ | ✗ | ✗ |
| Explicar o propósito do código | ✓ | ✗ | ✗ | ✗ | ✗ | ◐ | ✗ | ✗ |
| Teste de mesa e variáveis visíveis | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ |
| Foco linha a linha, voltas do laço e reprodução controlada | ✓ | ✗ | ◐ | ◐ | ✗ | ✗ | ✗ | ✗ |
| Erro em camadas (fantasma, pista, dica) | ✓ | ✗ | ◐ | ✗ | ◐ | ✗ | ◐ | ✗ |
| Narrativa com valores implícitos | ✓ | ✗ | ✗ | ✗ | ◐ | ✗ | ✗ | ✗ |
| Pseudocódigo em português | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Condições por forma e cor | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ◐ |
| Trilha completa alinhada à BNCC Computação | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Mapa de progressão e missões espelhadas | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Progresso fora do navegador, sem dados pessoais | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ◐ | ✗ |
| Modo em dupla com papéis | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |

A marcação segue as descrições publicadas de cada ferramenta e deve ser revista por um segundo avaliador antes de entrar na dissertação. A alegação defensável é de novidade de combinação e de contexto, não de invenção de cada mecânica.

## Referências

AUTORIDADE NACIONAL DE PROTEÇÃO DE DADOS (Brasil). **Enunciado CD/ANPD nº 1, de 24 de maio de 2023**. Trata das hipóteses legais para o tratamento de dados pessoais de crianças e adolescentes. Brasília, DF: ANPD, 2023.

BRASIL. **Lei nº 13.709, de 14 de agosto de 2018**. Lei Geral de Proteção de Dados Pessoais (LGPD). Brasília, DF: Presidência da República, 2018.

BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. **Parecer CNE/CEB nº 2/2022**, aprovado em 17 de fevereiro de 2022. Normas sobre Computação na Educação Básica, Complemento à Base Nacional Comum Curricular (BNCC). Brasília, DF: MEC, 2022.

BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. **Resolução CNE/CEB nº 1, de 4 de outubro de 2022**. Normas sobre Computação na Educação Básica, Complemento à BNCC. Diário Oficial da União, Brasília, DF, 6 out. 2022, Seção 1, p. 33.

GOUWS, L. A.; BRADSHAW, K.; WENTWORTH, P. Computational thinking in educational activities: an evaluation of the educational game Light-Bot. In: ACM CONFERENCE ON INNOVATION AND TECHNOLOGY IN COMPUTER SCIENCE EDUCATION, 18., 2013. **Proceedings** [...]. New York: ACM, 2013. p. 10-15.

GUO, P. J. Online Python Tutor: embeddable web-based program visualization for CS education. In: ACM TECHNICAL SYMPOSIUM ON COMPUTER SCIENCE EDUCATION, 44., 2013, Denver. **Proceedings** [...]. New York: ACM, 2013. p. 579-584. DOI: 10.1145/2445196.2445368.

KLOCK, A. C. T.; GASPARINI, I.; PIMENTA, M. S. 5W2H Framework: a guide to design, develop and evaluate the user-centered gamification. In: BRAZILIAN SYMPOSIUM ON HUMAN FACTORS IN COMPUTING SYSTEMS, 15., 2016, São Paulo. **Proceedings** [...]. New York: ACM, 2016. p. 14:1-14:10.

LEE, M. J. et al. Principles of a debugging-first puzzle game for computing education. In: IEEE SYMPOSIUM ON VISUAL LANGUAGES AND HUMAN-CENTRIC COMPUTING (VL/HCC), 2014. **Proceedings** [...]. IEEE, 2014. DOI: 10.1109/vlhcc.2014.6883023.

RYAN, R. M.; DECI, E. L. Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. **American Psychologist**, v. 55, n. 1, p. 68-78, 2000. DOI: 10.1037/0003-066X.55.1.68.

SENTANCE, S.; WAITE, J.; KALLIA, M. Teaching computer programming with PRIMM: a sociocultural perspective. **Computer Science Education**, v. 29, n. 2-3, p. 136-176, 2019. DOI: 10.1080/08993408.2019.1608781.

SORVA, J.; SIRKIÄ, T. UUhistle: a software tool for visual program simulation. In: KOLI CALLING INTERNATIONAL CONFERENCE ON COMPUTING EDUCATION RESEARCH, 10., 2010. **Proceedings** [...]. New York: ACM, 2010. DOI: 10.1145/1930464.1930471.

SOUZA, A.; SILVA, J.; REBOUÇAS, A. My Trace Table e My Trace Table Manager: sistemas para apoiar a compreensão de códigos em disciplinas introdutórias de programação. In: SIMPÓSIO BRASILEIRO DE EDUCAÇÃO EM COMPUTAÇÃO (EDUCOMP), 6., 2026, Campo Grande. **Anais** [...]. Porto Alegre: SBC, 2026.

TODA, A. M. et al. Analysing gamification elements in educational environments using an existing gamification taxonomy. **Smart Learning Environments**, v. 6, n. 1, art. 16, p. 1-14, 2019. DOI: 10.1186/s40561-019-0106-1.

TOXICODE. **Compute It**. [S. l.]: Toxicode, [20--]. Jogo digital. Disponível em: https://compute-it.toxicode.fr/. Acesso em: 5 nov. 2026.

As referências que fundamentam a ordem da trilha (Rich et al., 2017, 2018, 2019, 2022; Xie et al., 2019; Sorva, 2013 e outras) estão em [trilha-de-aprendizagem.md](trilha-de-aprendizagem.md#referências).
