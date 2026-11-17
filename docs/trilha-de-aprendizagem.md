# RoadBit: trilha de aprendizagem da versão 0.2

**Autor:** Cléo Quintiliano Fernandes de Brito
**Programa:** Mestrado Profissional em Ensino de Computação (ProfComp/UENP)
**Data:** 17 de novembro de 2026

Este documento descreve e justifica a trilha de aprendizagem do RoadBit a partir da versão 0.2: quais objetos de aprendizagem o jogo trabalha, em que ordem, com que tipo de missão e com que apoio da literatura de Ensino de Computação. Termos técnicos são definidos na primeira vez em que aparecem.

## 1. Visão geral

O RoadBit é um jogo de **leitura de código**: o estudante faz o papel do computador e executa, prevê, explica e conserta programas escritos em pseudocódigo em português. A trilha da v0.2 tem **16 marcos**, cada um ligado a um objeto de aprendizagem, organizados num **mapa único** da cidade:

- **12 marcos principais**, em percurso contínuo, que cobrem a lógica de programação prevista no eixo Pensamento Computacional da BNCC Computação para os anos finais do Ensino Fundamental;
- **4 marcos bônus** (recursão, grafos, criptografia e inteligência artificial), que aprofundam ou ampliam a trilha.

Cada marco tem **12 missões**, num total de **192 missões**. Antes da primeira missão, o estudante vê um **cartão de conceito**: o que vai aprender, em linguagem simples, com um exemplo de código e a habilidade da BNCC correspondente. O cartão pode ser reaberto a qualquer momento pelo botão Conceito.

## 2. Princípios de desenho e sua fundamentação

### 2.1 Trajetórias de aprendizagem

Uma **trajetória de aprendizagem** é uma sequência hipotética de objetivos, do mais simples ao mais elaborado, que descreve como o entendimento de um conceito costuma se desenvolver. Rich et al. (2017) derivaram, a partir de mais de 100 artigos de pesquisa, trajetórias para **sequência, repetição e condicionais** no ensino fundamental (K-8). O mesmo grupo propôs trajetórias para **decomposição** (RICH et al., 2018), **depuração** (RICH et al., 2019) e **variáveis** (RICH et al., 2022).

O RoadBit usa essas trajetórias de duas formas: (a) para ordenar os marcos, de modo que cada conceito novo se apoie em conceitos já praticados; e (b) para graduar as missões dentro de cada marco, do caso mais simples ao caso combinado.

**Ressalva importante para o artigo:** as trajetórias são hipóteses construídas a partir da literatura, não sequências comprovadas experimentalmente. A ordem entre conceitos no RoadBit é, portanto, uma decisão de desenho **fundamentada em** essas trajetórias, não uma ordem "comprovada".

### 2.2 Ler antes de escrever

Xie et al. (2019) propõem uma teoria de instrução para habilidades iniciais de programação em que **ler e rastrear código** (acompanhar a execução linha por linha) vem antes de escrever código. Nelson, Xie e Ko (2017) avaliaram um tutor de rastreamento com essa abordagem, e Sentance, Waite e Kallia (2019) descrevem o PRIMM, sequência didática que começa por **prever** e **executar** antes de modificar e criar. O RoadBit fica nesse lado da sequência: todos os modos são de leitura.

### 2.3 Máquina nocional e visualização da execução

**Máquina nocional** é o modelo simplificado de computador que o estudante usa para explicar como um programa é executado (SORVA, 2013). Muitas dificuldades de iniciantes vêm de modelos incorretos dessa máquina, por exemplo, achar que a variável guarda uma fórmula e não um valor (QIAN; LEHMAN, 2017). Por isso, o RoadBit torna visível o que o computador faz: a linha em execução, o valor de cada variável, a volta de cada laço, a resposta de cada condição, a saída e o caminho percorrido.

A meta-análise de Hundhausen, Douglas e Stasko (2002) indica que a eficácia de uma visualização de algoritmo depende mais do **que o estudante faz com ela** do que de quão sofisticada ela é. Por isso, o estudante não apenas assiste: ele executa cada passo (Rastrear), aposta no resultado antes de ver (Prever), descreve o comportamento (Explicar) e conserta o programa (Depurar).

### 2.4 Carga cognitiva e sinalização

Mayer e Moreno (2003) descrevem formas de reduzir a carga cognitiva em materiais multimídia, entre elas **sinalizar** o que é essencial e **segmentar** a informação em partes. As orientações do orientador implementadas na v0.2 seguem essa linha:

| Recurso | Sinalização ou segmentação |
|---|---|
| O foco passa linha a linha, inclusive chaves e linhas de função, e para na linha da ação com cor mais forte | Segmenta a execução e sinaliza onde o estudante deve agir. É rápido, pode ser pulado e desligado, para não virar espera. |
| A linha pisca ao voltar ao início do laço e mostra "volta 2 de 4" | Sinaliza o retorno do fluxo e o estado do laço, uma das dificuldades recorrentes com repetição (QIAN; LEHMAN, 2017). |
| As condições mostram "sim" ou "não" | Torna visível a avaliação da condição, que normalmente fica implícita. |
| O caminho percorrido fica marcado | Mantém visível o histórico da execução; no Prever, só aparece depois de conferir, para não entregar a resposta. |
| Modo Reproduzir, sem estrelas, com controle de passo | Permite rever a execução no próprio ritmo, sem pressão de pontuação. |
| No Depurar, o mensageiro volta ao início ao mudar um valor | Deixa claro que cada execução recomeça do zero, o que corrige a impressão de que o programa continua de onde parou. |

### 2.5 Retorno ao estudante

Hattie e Timperley (2007) mostram que o retorno é mais útil quando diz onde o estudante está, para onde vai e qual o próximo passo. O erro no RoadBit é tratado em camadas: primeiro um "fantasma" mostra para onde o estudante tentou ir, depois uma pista sobre a linha e o contexto (por exemplo, "você está na volta 2 de 4 do laço"), e só então o botão certo é indicado. O estudante continua do ponto onde estava.

### 2.6 Jogo e motivação

A aprendizagem baseada em jogos combina fundamentos cognitivos, motivacionais, afetivos e socioculturais (PLASS; HOMER; KINZER, 2015). Na perspectiva da Teoria da Autodeterminação (RYAN; DECI, 2000), o RoadBit busca apoiar **competência** (desafio graduado, estrelas, reforço), **autonomia** (escolha da missão dentro do marco, rejogar, ligar ou desligar o foco) e propósito narrativo (acender as casas da cidade). O planejamento da gamificação segue o Framework 5W2H (KLOCK; GASPARINI; PIMENTA, 2016) e a taxonomia de elementos de Toda et al. (2019), detalhados no esboço da atividade.

## 3. Os 16 marcos

Os códigos da BNCC Computação (BRASIL, 2022) indicam a habilidade principal de cada marco.

| Marco | Lugar no mapa | Objeto de aprendizagem | BNCC | Por que nesta posição |
|---|---|---|---|---|
| 1 | A Padaria | Sequência | EF06CO02 | Base de todas as trajetórias: instruções executadas em ordem (RICH et al., 2017). |
| 2 | A Rua Comprida | Repetição contada | EF06CO02 | A repetição depende de entender sequência; começa com número fixo de voltas, o nível mais simples da trajetória de repetição. |
| 3 | As Calçadas Coloridas | Seleção: se e senão | EF06CO02 | Condicionais vêm depois de sequência; começam com condição sobre o ambiente (a cor da calçada), sem variáveis. |
| 4 | A Avenida Verde | Repetição com condição: enquanto | EF06CO02 | Combina repetição e condição; só faz sentido depois das duas. |
| 5 | A Mochila | Variáveis, tipos, entrada e saída | EF06CO01, EF06CO05 | Introduz a variável como valor guardado e substituído, os tipos e a entrada e saída. Segue os níveis de pensamento sobre variáveis de Rich et al. (2022). |
| 6 | A Balança | Operadores, contador e acumulador | EF06CO03 | Operações sobre variáveis e padrões clássicos de contador e acumulador. |
| 7 | A Portaria | Condições com variáveis | EF06CO02 | Retoma o se e o enquanto com comparações e com e, ou e não, agora sobre variáveis. |
| 8 | Os Quarteirões | Laços aninhados | EF06CO02 | Combinação de estruturas, o nível mais alto das trajetórias de repetição. |
| 9 | A Oficina | Funções: decomposição e reúso | EF06CO04, EF07CO05 | Decompor o problema em partes com nome e reutilizá-las (RICH et al., 2018). |
| 10 | A Central | Parâmetros e retorno | EF06CO06 | Generalização: a mesma função resolve casos diferentes. |
| 11 | O Armazém | Listas e registros | EF07CO01, EF08CO02 | Estruturas de dados, que pedem variáveis, laços e índices. |
| 12 | O Arquivo | Algoritmos sobre listas | EF08CO03 | Soma, contagem, maior e menor, busca e ordenação: síntese de todos os marcos anteriores. |
| Bônus | O Espelho | Recursão | EF08CO01 | Exige funções com parâmetros; abre com 8 missões do marco 10. |
| Bônus | As Pontes | Grafos | EF07CO04 | O mapa como vértices e arestas; abre com 8 missões do marco 11. |
| Bônus | O Cofre | Criptografia: cifra de César | EF09CO05 | Usa operadores e resto da divisão; abre com 8 missões do marco 12. |
| Bônus | A Árvore | Inteligência Artificial: árvore de decisão | extensão | Classificação com se e senão aninhados e ajuste de limites a partir de exemplos; abre com 8 missões do marco 7. |

A **depuração** (EF07CO02) é transversal: todos os marcos têm duas missões de depurar. Isso segue a trajetória de depuração de Rich et al. (2019), que trata encontrar e corrigir erros como prática que acompanha cada conceito, e não como um tópico isolado.

## 4. Composição das 12 missões de cada marco

| Missões | Tipo | Função na aprendizagem |
|---|---|---|
| 1 e 2 | Guiadas (rastrear com apoio) | A missão 1 mostra o botão certo e um texto de orientação; a 2 mantém só o texto. Exemplo trabalhado e primeira prática. |
| 3, 5, 7 e 9 | Rastrear | Prática com variação de mapa e de código, incluindo casos que costumam gerar erro (por exemplo, a rua que dá a volta, o laço que não roda nenhuma vez, o se sem senão). |
| 4 e 8 | Prever | Ler o programa sem executar e apostar na posição final ou no valor final de uma variável. |
| 6 e 10 | Depurar | Encontrar e corrigir um único valor ou direção errada. |
| 11 | Explicar | Escolher a frase que descreve o que o código faz. Leva da execução linha a linha para a compreensão do propósito do programa, no sentido proposto por Xie et al. (2019). |
| 12 | Desafio | Rastrear um programa mais longo que combina o conceito do marco com os anteriores. |

**Reforço:** com 12 missões por marco, cada conceito é praticado de quatro maneiras diferentes, em contextos variados. Ao rejogar uma missão, o mapa aparece espelhado, para que o estudante leia o código de novo em vez de repetir o caminho de memória.

**Liberação dos marcos:** o próximo marco abre quando o estudante conclui 8 das 12 missões do marco anterior (cerca de dois terços). Dentro do marco, as missões abrem em sequência. O limite de 8 é uma decisão de desenho para equilibrar domínio e ritmo de turma, e deve ser avaliado nos testes com estudantes.

## 5. Cobertura da BNCC e lacunas

A trilha cobre as habilidades de lógica de programação do eixo Pensamento Computacional dos anos finais. Pontos a observar:

- **Conferência dos códigos:** os códigos de habilidade foram associados a partir do documento de Normas sobre Computação na Educação Básica (BRASIL, 2022). Antes da publicação do artigo, cada código deve ser conferido no anexo oficial.
- **9º ano parcial:** autômatos e linguagens formais (EF09CO03) não são tratados nesta versão.
- **Inteligência Artificial:** não há habilidade específica de aprendizado de máquina no Pensamento Computacional dos anos finais. O marco bônus de árvore de decisão é uma extensão proposta, que pode ser discutida no artigo como contribuição frente a essa lacuna.

## 6. Posição em relação ao campo

O relatório de novidade compara o RoadBit com ferramentas de visualização de programas (como o Online Python Tutor e o UUhistle), jogos de programação por blocos e de depuração (como o Light-Bot e o Gidget) e sequências didáticas de leitura de código (como o PRIMM). A v0.2 acrescenta a essa comparação três características pouco frequentes em conjunto no mesmo produto para os anos finais: uma trilha completa da BNCC organizada por trajetórias de aprendizagem, quatro modos de leitura (rastrear, prever, depurar, explicar) em todos os marcos e a visualização da execução com controle do estudante.

## Referências

BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. **Resolução CNE/CEB nº 1, de 4 de outubro de 2022**. Normas sobre Computação na Educação Básica, complemento à BNCC. Diário Oficial da União, Brasília, DF, 6 out. 2022, Seção 1, p. 33.

HATTIE, J.; TIMPERLEY, H. The power of feedback. **Review of Educational Research**, v. 77, n. 1, p. 81-112, 2007. DOI: 10.3102/003465430298487.

HUNDHAUSEN, C. D.; DOUGLAS, S. A.; STASKO, J. T. A meta-study of algorithm visualization effectiveness. **Journal of Visual Languages and Computing**, v. 13, n. 3, p. 259-290, 2002. DOI: 10.1006/jvlc.2002.0237.

KLOCK, A. C. T.; GASPARINI, I.; PIMENTA, M. S. 5W2H Framework: a guide to design, develop and evaluate the user-centered gamification. In: BRAZILIAN SYMPOSIUM ON HUMAN FACTORS IN COMPUTING SYSTEMS, 15., 2016, São Paulo. **Proceedings** [...]. New York: ACM, 2016. p. 14:1-14:10.

MAYER, R. E.; MORENO, R. Nine ways to reduce cognitive load in multimedia learning. **Educational Psychologist**, v. 38, n. 1, p. 43-52, 2003.

NELSON, G. L.; XIE, B.; KO, A. J. Comprehension first: evaluating a novel pedagogy and tutoring system for program tracing in CS1. In: ACM CONFERENCE ON INTERNATIONAL COMPUTING EDUCATION RESEARCH (ICER), 2017. **Proceedings** [...]. New York: ACM, 2017. p. 2-11. DOI: 10.1145/3105726.3106178.

PLASS, J. L.; HOMER, B. D.; KINZER, C. K. Foundations of game-based learning. **Educational Psychologist**, v. 50, n. 4, p. 258-283, 2015. DOI: 10.1080/00461520.2015.1122533.

QIAN, Y.; LEHMAN, J. Students' misconceptions and other difficulties in introductory programming: a literature review. **ACM Transactions on Computing Education**, v. 18, n. 1, art. 1, 2017. DOI: 10.1145/3077618.

RICH, K. M.; STRICKLAND, C.; BINKOWSKI, T. A.; MORAN, C.; FRANKLIN, D. K-8 learning trajectories derived from research literature: sequence, repetition, conditionals. In: ACM CONFERENCE ON INTERNATIONAL COMPUTING EDUCATION RESEARCH (ICER), 2017, Tacoma. **Proceedings** [...]. New York: ACM, 2017. p. 182-190. DOI: 10.1145/3105726.3106166.

RICH, K. M.; BINKOWSKI, T. A.; STRICKLAND, C.; FRANKLIN, D. Decomposition: a K-8 computational thinking learning trajectory. In: ACM CONFERENCE ON INTERNATIONAL COMPUTING EDUCATION RESEARCH (ICER), 2018, Espoo. **Proceedings** [...]. New York: ACM, 2018. p. 124-132. DOI: 10.1145/3230977.3230979.

RICH, K. M.; STRICKLAND, C.; BINKOWSKI, T. A.; FRANKLIN, D. A K-8 debugging learning trajectory derived from research literature. In: ACM TECHNICAL SYMPOSIUM ON COMPUTER SCIENCE EDUCATION (SIGCSE), 50., 2019, Minneapolis. **Proceedings** [...]. New York: ACM, 2019. p. 745-751.

RICH, K. M.; FRANKLIN, D.; STRICKLAND, C.; ISAACS, A.; EATINGER, D. A learning trajectory for variables based in computational thinking literature: using levels of thinking to develop instruction. **Computer Science Education**, v. 32, n. 2, p. 213-234, 2022.

RYAN, R. M.; DECI, E. L. Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. **American Psychologist**, v. 55, n. 1, p. 68-78, 2000. DOI: 10.1037/0003-066X.55.1.68.

SENTANCE, S.; WAITE, J.; KALLIA, M. Teaching computer programming with PRIMM: a sociocultural perspective. **Computer Science Education**, v. 29, n. 2-3, p. 136-176, 2019. DOI: 10.1080/08993408.2019.1608781.

SORVA, J. Notional machines and introductory programming education. **ACM Transactions on Computing Education**, v. 13, n. 2, art. 8, p. 1-31, 2013. DOI: 10.1145/2483710.2483713.

TODA, A. M. et al. Analysing gamification elements in educational environments using an existing gamification taxonomy. **Smart Learning Environments**, v. 6, n. 1, art. 16, p. 1-14, 2019. DOI: 10.1186/s40561-019-0106-1.

XIE, B. et al. A theory of instruction for introductory programming skills. **Computer Science Education**, v. 29, n. 2-3, p. 205-253, 2019. DOI: 10.1080/08993408.2019.1565235.
