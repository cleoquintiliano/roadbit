# RoadBit: guia do professor

Versão 0.3 · 24 de novembro de 2026 · Cléo Quintiliano Fernandes de Brito

Este guia é para o professor que vai usar o RoadBit em sala sem ter participado da criação do jogo. Ele explica como preparar a turma, como conduzir as aulas, como ajudar o estudante que trava e como avaliar. Os roteiros aula a aula estão nos [planos de aula](planos-de-aula.md); a fundamentação está na [proposta pedagógica](proposta-pedagogica.md).

## 1. O RoadBit em um minuto

No RoadBit, **o estudante faz o papel do computador**. Ele lê um programa curto, em português, e executa uma linha de cada vez para levar um robô mensageiro pela cidade. Cada entrega certa acende uma casa.

- **Para quem:** 7º e 8º ano, com uso possível do 6º ano ao 1º ano do Ensino Médio.
- **O que se aprende:** ler e acompanhar programas com sequência, repetição, seleção, variáveis, operadores, funções e listas; prever resultados; encontrar e corrigir erros. Os 12 marcos principais cobrem a lógica de programação do eixo Pensamento Computacional da BNCC Computação para os anos finais.
- **Onde:** no navegador, em computador ou celular, sem instalação: https://cleoquintiliano.github.io/roadbit/jogo/
- **Quanto tempo:** de 8 a 15 aulas de 50 minutos, conforme o percurso escolhido.

O vídeo de demonstração, na [página do projeto](https://cleoquintiliano.github.io/roadbit/), mostra o jogo em pouco mais de um minuto.

## 2. Antes da primeira aula

- [ ] **Jogue as três primeiras missões** do marco 1 e uma missão de cada modo. Leva uns 15 minutos.
- [ ] **Escolha o percurso:** completo (15 aulas, marcos 1 a 12) ou curto (8 aulas, marcos 1 a 6). Veja os [planos de aula](planos-de-aula.md).
- [ ] **Teste o endereço** nos computadores ou celulares da escola. Se a internet for instável, abra o jogo uma vez em cada aparelho antes da aula: depois de aberto, ele funciona sem internet. Também é possível baixar o arquivo `index.html` e abri-lo direto no navegador.
- [ ] **Imprima** o pré-teste (formas A e B alternadas) e, se for usar, as fichas de saída. Os arquivos estão em [avaliação](avaliacao/README.md).
- [ ] **Planeje as duplas.** O jogo funciona bem com um aparelho por dupla (veja a seção 4).
- [ ] **Prepare a projeção** do jogo, se houver projetor, para as aberturas coletivas.

**Atalho do professor:** o endereço do jogo seguido de `?tudo` (https://cleoquintiliano.github.io/roadbit/jogo/?tudo) abre todas as missões e pula o tour. Use para planejar ou para projetar uma missão específica. Não passe esse endereço para os estudantes: ele também libera os marcos ainda fechados.

## 3. O que o estudante encontra no jogo

| Parte | O que é |
| --- | --- |
| **Tour guiado** | Na primeira vez, o jogo apresenta o mapa da cidade e a tela da missão. Pode ser pulado e reaberto em "Como jogar". |
| **Mapa da cidade** | 12 marcos em sequência e 4 marcos bônus. O próximo marco abre quando o estudante conclui 8 das 12 missões do anterior. |
| **Cartão de conceito** | No início de cada marco: o que vai ser aprendido, um exemplo e a habilidade da BNCC. Pode ser reaberto no botão Conceito. |
| **Missões** | 12 por marco: 2 guiadas, 4 de rastrear, 2 de prever, 2 de depurar, 1 de explicar e 1 desafio. |
| **Estrelas** | De 1 a 3 por missão, conforme os erros e as dicas. Aparecem só no fim da missão e no mapa. |
| **Dicas** | 2 por missão. Cada dica conta como um erro nas estrelas. |
| **Código de progresso** | O progresso fica salvo no aparelho. O botão "Meu código" mostra um código (RB2-…) que leva o progresso para outro aparelho, em "Tenho um código". |

**Os quatro modos**

| Modo | O estudante | O que trabalha |
| --- | --- | --- |
| Rastrear | Executa cada linha com as setas e o botão Entregar | Acompanhar a execução, linha a linha |
| Prever | Toca na calçada onde o mensageiro vai parar, ou escolhe o valor final de uma variável | Ler o programa inteiro antes de executar |
| Depurar | Toca num número ou direção em laranja, muda e executa | Encontrar e corrigir um erro |
| Explicar | Escolhe a frase que descreve o que o código faz | Entender o propósito, não só os passos |

Ao fim de cada missão, o botão **Reproduzir** mostra a execução de novo, passo a passo, sem estrelas. Ao rejogar uma missão já concluída, o mapa aparece espelhado, para que o estudante leia o código de novo em vez de decorar o caminho.

## 4. Como conduzir uma aula

Os planos de aula seguem a mesma estrutura de 50 minutos:

| Momento | Tempo | O que fazer |
| --- | --- | --- |
| Abertura | 10 min | Projete o cartão de conceito do marco e resolva a primeira missão guiada com a turma, em voz alta. Pergunte "e agora, qual linha o computador executa?" antes de cada passo. |
| Jogo em duplas | 30 min | As duplas jogam o marco. Circule pela sala e use as perguntas da seção 5. |
| Fechamento | 10 min | Ficha de saída (5 min) e conversa: qual missão foi mais difícil, que erro apareceu mais. |

**Duplas com papéis.** Com um aparelho por dupla, um estudante é o **piloto**, que aperta os botões, e o outro é o **navegador**, que lê o código em voz alta e confere cada passo. Os papéis trocam a cada missão. Isso faz os dois lerem o código e conversa com a ideia de programação em pares.

**Ritmo diferente na mesma turma.** É normal que alguns estudantes avancem dois marcos enquanto outros fazem metade de um. Quem terminar pode buscar 3 estrelas nas missões já feitas (o mapa vem espelhado) ou abrir os marcos bônus. Quem estiver atrás pode continuar em casa com o código de progresso.

**Projetar o erro.** Quando um erro aparece em várias duplas, pare a turma por 2 minutos, projete a missão com `?tudo` e resolva junto.

## 5. Quando o estudante trava

Antes de dar a resposta, faça perguntas que levem o estudante a ler o código:

- "Qual é a linha destacada? O que ela manda fazer?"
- "Em que volta do laço você está? Olhe o contador ao lado da linha."
- "A condição deu sim ou não? Por quê?"
- "Qual é o valor da variável agora? Olhe o quadro de variáveis."
- "Leia de novo, em voz alta, e aponte com o dedo."

O jogo já ajuda em camadas: no primeiro erro, um "fantasma" mostra para onde o estudante tentou ir; no segundo, aparece uma pista sobre a linha e o contexto; no terceiro, o botão certo pisca. No Prever, depois de três erros, a resposta aparece marcada e o estudante precisa confirmá-la.

**Erros comuns por marco** (QIAN; LEHMAN, 2017)

| Marco | Erro comum | Como ajudar |
| --- | --- | --- |
| 1. Sequência | Pular uma linha ou executar fora de ordem | Pedir para apontar cada linha com o dedo |
| 2. Repetição | Repetir só a primeira linha do bloco, ou repetir também a linha depois da } | Mostrar onde o bloco começa e termina; contar as voltas com a turma |
| 3. Seleção | Executar o bloco do se e o do senão | Perguntar "a condição deu sim ou não?" e lembrar que só um dos blocos roda |
| 4. Enquanto | Achar que o enquanto testa a condição uma vez só, como o se | Mostrar que a pergunta é feita de novo a cada volta |
| 5. Variáveis | Achar que b ← a liga as duas variáveis para sempre | Explicar a variável como uma caixa com um valor: ← copia o valor naquele momento |
| 6. Operadores | Esquecer que o valor antigo é usado do lado direito (total ← total + 1) | Ler a linha da direita para a esquerda: primeiro a conta, depois guarda |
| 7. Condições com variáveis | Confundir e com ou | Testar as duas partes separadamente, como sim ou não |
| 8. Laços aninhados | Rodar o laço de dentro uma vez só por volta de fora | Acompanhar os dois contadores no quadro de variáveis |
| 9. Funções | Executar a função onde ela foi escrita, e não onde foi chamada | Mostrar que a definição só "ensina" a receita; a chamada é que executa |
| 10. Parâmetros e retorno | Não saber que valor o parâmetro recebe | Escrever no quadro: na chamada andar(3), n vale 3 |
| 11. Listas e registros | Contar as posições a partir do 1 | Lembrar que a primeira posição é a 0 |
| 12. Algoritmos sobre listas | Perder o valor do acumulador ou do maior a cada volta | Usar o teste de mesa na tela larga ou no caderno |

## 6. Avaliação

- **Pré e pós-teste:** 24 questões, formas A e B, na primeira e na última aula. Corrija com o gabarito e use a planilha para calcular o ganho da turma. Veja [avaliação](avaliacao/README.md).
- **Fichas de saída:** uma por marco, 5 minutos no fim da aula, para decidir a próxima aula.
- **No jogo:** peça para cada estudante mostrar o mapa no fim da aula. O número de missões e de estrelas em cada marco mostra o avanço. Missões com 1 estrela indicam um conceito para retomar.
- **Conversa final:** ao fim da sequência, uma roda de conversa sobre a história, os erros mais comuns e a relação com o cotidiano.

Se a escola precisar de nota, use o pós-teste e as fichas, nunca o número de estrelas: as estrelas premiam acertar de primeira, e o jogo foi feito para que errar e tentar de novo faça parte do aprendizado.

## 7. Inclusão e acessibilidade

- **Teclado:** o jogo inteiro funciona pelo teclado (setas, Enter e Esc).
- **Cores:** toda condição é indicada por forma e cor ao mesmo tempo (● ▲ ■), para estudantes com daltonismo.
- **Leitura:** o código nunca fica abaixo de 14 px e tudo cabe na tela, sem rolagem.
- **Movimento:** o jogo respeita a opção do aparelho de reduzir animações. O foco linha a linha pode ser desligado no botão Foco.
- **Som:** pode ser desligado no botão Som.
- **Celular:** funciona na vertical; os controles ficam embaixo da tela.
- **Leitura em voz alta:** nas duplas, o navegador lê o código para o piloto, o que apoia estudantes com dificuldade de leitura.

## 8. Privacidade

O RoadBit **não coleta dados pessoais**: não pede nome, e-mail ou foto, não tem anúncios nem rastreadores. O progresso fica no próprio aparelho e no código de progresso, que não identifica o estudante. Em computadores compartilhados, cada estudante deve anotar o seu código no caderno, porque outro estudante pode continuar o progresso salvo naquele aparelho.

## 9. Problemas comuns

| Situação | O que fazer |
| --- | --- |
| O progresso sumiu | O navegador foi limpo ou o aparelho é outro. Use "Tenho um código" com o código anotado. |
| O marco seguinte não abre | É preciso concluir 8 das 12 missões do marco anterior. |
| O estudante quer pular o tour | Botão "Pular tour" ou tecla Esc. Para rever, "Como jogar". |
| Acabaram as dicas | São 2 por missão; elas voltam na missão seguinte. |
| A animação do foco está lenta | Qualquer tecla pula a animação; o botão Foco a desliga. |
| A tela é pequena | O jogo ajusta o tamanho do código e do mapa. Em celular, use na vertical. |
| Sem internet na aula | Abra o jogo antes, com internet, ou use o arquivo baixado. |

## 10. Licença e como citar

O código do jogo está sob a licença MIT e os textos, o guia, os planos de aula e a avaliação estão sob a licença Creative Commons Atribuição 4.0 (CC BY 4.0). Você pode usar, copiar e adaptar o material, inclusive na MEC RED, desde que cite o autor e indique o que foi alterado.

> BRITO, Cléo Quintiliano Fernandes de. **RoadBit**: jogo de leitura de código para o ensino de lógica de programação. Versão 0.3.0. Londrina: ProfComp/UENP, 2026. Jogo digital. Disponível em: https://cleoquintiliano.github.io/roadbit/. Acesso em: dia mês ano.

## Referência

QIAN, Y.; LEHMAN, J. Students' misconceptions and other difficulties in introductory programming: a literature review. **ACM Transactions on Computing Education**, v. 18, n. 1, art. 1, 2017. DOI: 10.1145/3077618.
