# RoadBit: pré e pós-teste e fichas de saída

Versão 0.3 · 24 de novembro de 2026 · Cléo Quintiliano Fernandes de Brito

A avaliação do RoadBit tem duas partes: um **pré e pós-teste** para a trilha inteira, que mede o aprendizado, e uma **ficha de saída** curta no fim de cada marco, que ajuda o professor a planejar a aula seguinte. Nesta versão, os materiais são para imprimir; uma versão dentro do jogo está prevista.

## Materiais

| Material | Para quê | Arquivos |
| --- | --- | --- |
| Teste, forma A | Pré-teste para metade da turma e pós-teste para a outra metade | [PDF](forma-A.pdf) · [página](forma-A.html) |
| Teste, forma B | A outra metade | [PDF](forma-B.pdf) · [página](forma-B.html) |
| Gabarito e quadro de especificação | Correção e relação de cada questão com o marco e a habilidade da BNCC | [PDF](gabarito.pdf) · [página](gabarito.html) · [dados](gabarito.json) |
| Planilha do ganho | Lançar os acertos e calcular o ganho da turma | [planilha-ganho.xlsx](planilha-ganho.xlsx) |
| Fichas de saída | Uma por marco, 5 minutos, duas por folha | [PDF](fichas-de-saida.pdf) · [página](fichas-de-saida.html) |

## Como aplicar o pré e pós-teste

1. **Na primeira aula, antes de jogar,** distribua as formas alternadas: forma A para um estudante, forma B para o seguinte. Anote quem fez qual forma.
2. **Na última aula,** cada estudante faz a outra forma: quem fez A no pré faz B no pós, e vice-versa.
3. O teste dura até 50 minutos, sem computador. Leia as instruções em voz alta e diga que ele não vale nota.
4. Corrija com o gabarito (1 ponto por questão, de 0 a 24) e lance os acertos na planilha, que calcula o ganho normalizado da turma.
5. **No percurso curto** (marcos 1 a 6), aplique e corrija só as questões 1 a 12, que são as desses marcos, e ajuste o total para 12 na planilha.

Para identificar o estudante, use o número da chamada em vez do nome, principalmente se os resultados forem usados em pesquisa.

## Como o teste foi construído

**Um par de testes para a trilha, e não um para cada marco.** Seriam 24 aplicações, tomando boa parte das aulas que deveriam ser de jogo, e o próprio jogo já registra o desempenho em cada marco. Além disso, responder a perguntas antes de estudar melhora o aprendizado posterior, mesmo quando o estudante erra (RICHLAND; KORNELL; KAO, 2009): com um pré-teste por marco, parte do ganho viria dos próprios testes, e não seria possível separar o efeito do jogo. Por fim, um teste de 2 ou 3 questões tem pouca confiabilidade, isto é, o resultado varia muito por acaso.

**Duas questões por marco principal, 24 no total.** Os marcos bônus ficam de fora, porque nem todos os estudantes chegam a eles. O [gabarito](gabarito.pdf) traz o quadro de especificação: qual questão mede qual marco, de que tipo é e qual habilidade da BNCC Computação trabalha.

**Quatro tipos de questão, na mesma hierarquia de habilidades que sustenta os modos do jogo.**

| Tipo | O que o estudante faz | Base |
| --- | --- | --- |
| Rastrear | Diz a saída do programa | Lister et al. (2004) testaram estudantes de sete países em prever o resultado de trechos curtos de código |
| Prever | Diz o valor final de uma variável | Mesma base; foco nos erros de concepção sobre variáveis e laços (QIAN; LEHMAN, 2017) |
| Explicar | Escolhe a frase que descreve o propósito do código | Lopez et al. (2008) situam explicar o código num nível intermediário, acima de conhecer as estruturas |
| Depurar | Escolhe a mudança que conserta o programa | Trajetória de depuração usada na trilha (RICH et al., 2019) e habilidade EF07CO02 |

Cada forma tem 9 questões de rastrear, 4 de prever, 6 de explicar e 5 de depurar.

**Transferência, e não decoreba do jogo.** As questões usam o mesmo pseudocódigo do RoadBit, mas sem o mapa e o mensageiro, para medir se o estudante entendeu o conceito e não só se ficou bom no jogo. Avaliar com um pseudocódigo próprio tem precedente no FCS1, o primeiro teste validado de conhecimentos de programação que funciona para várias linguagens (TEW; GUZDIAL, 2011).

**Duas formas equivalentes.** As formas A e B têm a mesma estrutura, questão por questão: mesmo marco, mesmo tipo, mesmo tamanho de código e o mesmo erro de concepção nos distratores, com valores e contextos diferentes. Metade da turma faz A no pré e B no pós, e a outra metade o contrário, o que reduz o efeito de lembrar das respostas. O SCS1 foi construído do mesmo modo, como versão isomórfica do FCS1 (PARKER; GUZDIAL; ENGLEMAN, 2016).

**Redação das questões.** As questões seguem as diretrizes de Haladyna, Downing e Rodriguez (2002): cada item mede um conteúdo e um tipo de raciocínio previstos no quadro de especificação, há uma única alternativa certa, não há pegadinhas, a leitura é curta e as alternativas numéricas estão em ordem crescente. Os distratores, isto é, as alternativas erradas, vêm de erros comuns de iniciantes (QIAN; LEHMAN, 2017), e o gabarito diz qual erro cada um representa. A posição da resposta certa foi sorteada sem mais de três letras iguais seguidas, e as duas formas não repetem o gabarito, para que copiar do colega ao lado não funcione.

**Conferência automática.** Cada programa do teste está escrito no mesmo formato das missões do jogo e é executado pelo motor do RoadBit antes de gerar as folhas (`node src/avaliacao-build.js`). Nas questões de rastrear e prever, a resposta do gabarito precisa ser a saída real do programa. Nas de depurar, a alternativa certa precisa consertar o programa e nenhuma outra pode consertá-lo. Se algo não confere, nenhuma folha é gerada.

**Análise.** O resultado da turma é o **ganho normalizado** de Hake (1998):

```
ganho = (média do pós - média do pré) / (100% - média do pré)
```

Ele mostra que parte do que faltava aprender a turma aprendeu, o que permite comparar turmas que começaram em níveis diferentes. A soma das duas questões de um marco serve para descrever a turma naquele conceito, nunca para avaliar um estudante isoladamente.

## Fichas de saída

Cada marco tem uma ficha de 5 minutos, para o fim da aula: uma questão de rastrear, uma pergunta curta sobre o conceito e uma autoavaliação ("entendi bem", "entendi em parte", "ainda tenho dúvida"). As respostas esperadas estão na última página do PDF. As fichas são **formativas**: servem para o professor decidir a próxima aula, por exemplo retomar um conceito, formar duplas ou liberar um marco bônus. Não entram na nota nem na pesquisa. A avaliação formativa é parte essencial do trabalho em sala e pode elevar o desempenho dos estudantes (BLACK; WILIAM, 1998).

## Para pesquisa

- **Turma de comparação.** Pré e pós numa turma só não permitem afirmar que o ganho veio do jogo, porque os estudantes também aprendem com outras coisas no mesmo período (CAMPBELL; STANLEY, 1963). Se possível, compare com uma turma que estudou os mesmos conteúdos sem o jogo. Brackmann, Caetano e Silva (2019) usaram um desenho quase-experimental desse tipo com Pensamento Computacional desplugado em duas escolas brasileiras.
- **Medida externa.** Para comparar com um instrumento já validado, há o Teste de Pensamento Computacional (CTt), aplicado a 1.251 estudantes espanhóis do 5º ao 10º ano, com confiabilidade e validade de critério relatadas (ROMÁN-GONZÁLEZ; PÉREZ-GONZÁLEZ; JIMÉNEZ-FERNÁNDEZ, 2017). Ele não substitui este teste, que mede os conteúdos do RoadBit.
- **Validação deste teste.** As questões ainda não foram aplicadas em estudo piloto. Antes de usá-las num artigo, convém revisar o conteúdo com outros professores, aplicar a uma turma piloto e calcular a dificuldade e a discriminação de cada questão e a confiabilidade das formas.
- **Ética.** Pesquisa com estudantes menores de idade precisa de aprovação do comitê de ética e de termos de consentimento e assentimento.

## Versão futura dentro do jogo

As mesmas questões vão entrar no jogo como um modo próprio, sem estrelas e sem dicas, com registro das respostas por questão. Cada questão já tem marco, tipo e habilidade da BNCC registrados em `gabarito.json`, o que permite levá-las para o jogo sem reescrever.

## Referências

BLACK, P.; WILIAM, D. Assessment and classroom learning. **Assessment in Education: Principles, Policy & Practice**, v. 5, n. 1, p. 7-74, 1998. DOI: 10.1080/0969595980050102.

BRACKMANN, C. P.; CAETANO, S. V. N.; SILVA, A. R. Pensamento computacional desplugado: ensino e avaliação na educação primária brasileira. **RENOTE**, Porto Alegre, v. 17, n. 3, p. 636-647, 2019. DOI: 10.22456/1679-1916.99894.

CAMPBELL, D. T.; STANLEY, J. C. **Experimental and quasi-experimental designs for research**. Chicago: Rand McNally, 1963.

HAKE, R. R. Interactive-engagement versus traditional methods: a six-thousand-student survey of mechanics test data for introductory physics courses. **American Journal of Physics**, v. 66, n. 1, p. 64-74, 1998. DOI: 10.1119/1.18809.

HALADYNA, T. M.; DOWNING, S. M.; RODRIGUEZ, M. C. A review of multiple-choice item-writing guidelines for classroom assessment. **Applied Measurement in Education**, v. 15, n. 3, p. 309-333, 2002.

LISTER, R. et al. A multi-national study of reading and tracing skills in novice programmers. **ACM SIGCSE Bulletin**, v. 36, n. 4, p. 119-150, 2004. DOI: 10.1145/1041624.1041673.

LOPEZ, M.; WHALLEY, J.; ROBBINS, P.; LISTER, R. Relationships between reading, tracing and writing skills in introductory programming. In: ACM WORKSHOP ON INTERNATIONAL COMPUTING EDUCATION RESEARCH (ICER), 2008, Sydney. **Proceedings** [...]. New York: ACM, 2008. p. 101-111.

PARKER, M. C.; GUZDIAL, M.; ENGLEMAN, S. Replication, validation, and use of a language independent CS1 knowledge assessment. In: ACM CONFERENCE ON INTERNATIONAL COMPUTING EDUCATION RESEARCH (ICER), 2016, Melbourne. **Proceedings** [...]. New York: ACM, 2016. p. 93-101. DOI: 10.1145/2960310.2960316.

QIAN, Y.; LEHMAN, J. Students' misconceptions and other difficulties in introductory programming: a literature review. **ACM Transactions on Computing Education**, v. 18, n. 1, art. 1, 2017. DOI: 10.1145/3077618.

RICH, K. M.; STRICKLAND, C.; BINKOWSKI, T. A.; FRANKLIN, D. A K-8 debugging learning trajectory derived from research literature. In: ACM TECHNICAL SYMPOSIUM ON COMPUTER SCIENCE EDUCATION (SIGCSE), 50., 2019, Minneapolis. **Proceedings** [...]. New York: ACM, 2019. p. 745-751.

RICHLAND, L. E.; KORNELL, N.; KAO, L. S. The pretesting effect: do unsuccessful retrieval attempts enhance learning? **Journal of Experimental Psychology: Applied**, v. 15, n. 3, p. 243-257, 2009. DOI: 10.1037/a0016496.

ROMÁN-GONZÁLEZ, M.; PÉREZ-GONZÁLEZ, J.-C.; JIMÉNEZ-FERNÁNDEZ, C. Which cognitive abilities underlie computational thinking? Criterion validity of the Computational Thinking Test. **Computers in Human Behavior**, v. 72, p. 678-691, 2017. DOI: 10.1016/j.chb.2016.08.047.

TEW, A. E.; GUZDIAL, M. The FCS1: a language independent assessment of CS1 knowledge. In: ACM TECHNICAL SYMPOSIUM ON COMPUTER SCIENCE EDUCATION (SIGCSE), 42., 2011, Dallas. **Proceedings** [...]. New York: ACM, 2011. p. 111-116.

As páginas e o DOI de Parker, Guzdial e Engleman (2016) e as páginas de Tew e Guzdial (2011) precisam ser conferidos nas fontes antes da publicação de um artigo.
