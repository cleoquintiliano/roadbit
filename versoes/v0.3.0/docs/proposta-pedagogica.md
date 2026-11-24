# RoadBit: proposta pedagógica e gamificação

Versão 0.3 · 24 de novembro de 2026 · Cléo Quintiliano Fernandes de Brito

Este documento explica, para professores, coordenadores e pesquisadores, o que é o RoadBit, para quem ele foi pensado, o que o estudante aprende, como o jogo funciona e como avaliar os resultados. O planejamento segue o Framework 5W2H, apresentado na seção seguinte. Para aplicar o jogo em sala, veja também o [guia do professor](guia-do-professor.md) e os [planos de aula](planos-de-aula.md).

> Até a v0.2, este documento se chamava "Esboço da atividade gamificada (5W2H)". As versões anteriores continuam em [versoes/v0.2/docs](../../v0.2/docs/esboco-5W2H.md) e [versoes/v0.1/docs](../../v0.1/docs/esboco-5W2H.md).

## Em resumo

O RoadBit é um jogo para navegador em que o estudante faz o papel do computador. Ele lê um programa curto e executa uma instrução de cada vez para levar um robô mensageiro pela cidade, entregando pão, remédio e cartas. A cada entrega certa, uma casa se acende e alguém aparece à janela.

- **Ideia central:** entender um programa vem antes de escrevê-lo. O estudante executa o código de cabeça, prevê o resultado, encontra erros e explica o que o código faz.
- **Formato:** um único arquivo que roda no navegador do computador ou do celular, sem instalação e sem internet depois de aberto.
- **Código:** pseudocódigo em português, com símbolos de forma e cor (● ▲ ■).
- **Trilha:** 16 marcos num mapa único da cidade, 12 principais e 4 bônus, com 12 missões em cada um, num total de 192 missões. A ordem dos marcos está justificada na [trilha de aprendizagem](trilha-de-aprendizagem.md).
- **Valores implícitos:** cuidado com quem está à margem do caminho, partilha, buscar quem se perdeu e recomeço sem punição. Nenhuma referência religiosa é explícita, o que mantém o material adequado tanto à escola pública laica quanto à escola confessional.

## Como esta proposta foi planejada

**Gamificação** é o uso de elementos de jogo, como narrativa, progressão e pontos, em uma atividade que não é um jogo em si. O RoadBit vai além: é um jogo educacional completo. Para planejar seus elementos, usamos dois trabalhos:

- o **Framework 5W2H** de Klock, Gasparini e Pimenta (2016), que organiza o planejamento em sete perguntas: quem (who), o quê (what), por quê (why), quando (when), como (how), onde (where) e quanto (how much);
- a **taxonomia de elementos de jogo** de Toda et al. (2019), que lista os elementos possíveis em cinco dimensões e é usada aqui para responder ao "como".

Usar os dois juntos tem três vantagens. O 5W2H obriga a decidir público, finalidade, momento e forma de avaliação, o que evita uma gamificação reduzida a pontos e medalhas. As respostas de "quando" e "onde" se transformam diretamente no guia do professor. E a resposta de "quanto" torna a atividade avaliável e pesquisável.

## 1. Quem: público

Estudantes do 7º e do 8º ano do Ensino Fundamental, com uso possível no 6º e no 9º ano e no 1º ano do Ensino Médio técnico, como revisão de lógica de programação.

| Característica do público | Como o jogo responde |
| --- | --- |
| 11 a 14 anos, muitos já com contato com programação em blocos | Pseudocódigo em português, curto, com cores e formas; progressão do concreto ao abstrato |
| Níveis de leitura e de experiência muito diferentes na mesma turma | 12 missões por marco, missões guiadas no início de cada marco, 2 dicas por missão e marcos bônus para quem avança mais rápido |
| Muitos estudantes de territórios vulneráveis | Sem ranking público, erro sem punição e protagonismo positivo na história |
| Menores de idade | Nenhum dado pessoal: o progresso fica no aparelho e num código de progresso |
| Acesso desigual a equipamentos | Funciona sem internet, em computador de laboratório ou em celular, inclusive em dupla num único aparelho |
| Estudantes com daltonismo ou baixa visão | Condições indicadas por forma e cor ao mesmo tempo; código grande que se ajusta à tela, nunca abaixo de 14 px |

O segundo público são os **professores de Computação** que vão aplicar o material sem a presença do autor, a partir da plataforma MEC RED (Plataforma de Recursos Educacionais Digitais do Ministério da Educação).

## 2. O quê: conteúdos e tarefas

Muitos jogos de programação para a escola básica trabalham sobretudo o fluxo de controle, isto é, a ordem em que as instruções acontecem, e deixam de fora os dados: variáveis, operadores, entrada, saída e listas. O RoadBit trabalha os dois, sempre dentro da história.

### Os 16 marcos

| Marco | Objeto de aprendizagem | Exemplo no jogo |
| --- | --- | --- |
| 1. A Padaria | Sequência | `direita()`, `baixo()`, `entregar()` |
| 2. A Rua Comprida | Repetição contada | `repetir (4) { direita() }`, com "volta 2 de 4" ao lado da linha |
| 3. As Calçadas Coloridas | Seleção: se e senão | `se ● { cima() } senão { direita() }` |
| 4. A Avenida Verde | Repetição com condição: enquanto | `enquanto ■ { direita() }` |
| 5. A Mochila | Variáveis, tipos, entrada e saída | `pães ← 3`, `ler(n)`, `escrever(nome)` |
| 6. A Balança | Operadores, contador e acumulador | `total ← total + placa()`, `r ← n % 3` |
| 7. A Portaria | Condições com variáveis | `se pães > 0 e aberta { entregar() }` |
| 8. Os Quarteirões | Laços aninhados | `para i de 1 até 2 { para j de 1 até 3 { ... } }` |
| 9. A Oficina | Funções: decomposição e reúso | `função degrau() { direita() baixo() }` |
| 10. A Central | Parâmetros e retorno | `função dobro(n) { retorna n * 2 }` |
| 11. O Armazém | Listas e registros | `rota ← [→, ↓, →]`, `casa.rua` |
| 12. O Arquivo | Algoritmos sobre listas | soma, contagem, maior e menor, busca e troca para ordenar |
| Bônus: O Espelho | Recursão | `função andar(n) { se n > 0 { direita() andar(n - 1) } }` |
| Bônus: As Pontes | Grafos | `enquanto livre(→) { direita() }` |
| Bônus: O Cofre | Criptografia: cifra de César | `c ← (m + chave) % 10` |
| Bônus: A Árvore | Inteligência artificial: árvore de decisão | `se peso > 5 { ... } senão { ... }` |

### O que o estudante faz: quatro modos e a reprodução

1. **Rastrear:** executar o código passo a passo, com as setas, o teclado ou deslizando o dedo no mapa. Um foco passa pelas linhas que o computador executa sozinho e para na linha em que o estudante precisa agir.
2. **Prever:** sem executar, tocar na calçada onde o mensageiro vai parar ou escolher o valor final de uma variável. Ao conferir, o computador executa e o caminho fica marcado.
3. **Depurar:** o código deveria levar o mensageiro até alguém, mas não leva. O estudante toca no número ou na direção suspeita, muda e executa de novo.
4. **Explicar:** escolher, entre três frases, a que descreve o que o código faz.
5. **Reproduzir:** ao fim de qualquer missão, rever a execução passo a passo, sem estrelas.

## 3. Por quê: objetivos

O objetivo é desenvolver a **leitura e a compreensão de código**, que vêm antes da escrita, e a capacidade de **encontrar e corrigir erros**. Ao final da trilha principal, o estudante deve conseguir:

- acompanhar a execução de um programa com variáveis, seleção, repetição, funções e listas;
- prever o resultado de um programa antes de executá-lo;
- localizar e corrigir erros de lógica;
- explicar com as próprias palavras o que um trecho de código faz.

**Habilidades da BNCC Computação** (complemento à Base Nacional Comum Curricular aprovado pela Resolução CNE/CEB nº 1/2022). A relação completa por marco está na trilha de aprendizagem.

| Código | Habilidade (resumo) | Onde aparece no RoadBit |
| --- | --- | --- |
| EF06CO02 | Elaborar algoritmos com instruções sequenciais, de repetição e de seleção | Marcos 1 a 4, 7 e 8 |
| EF07CO02 | Analisar programas para detectar e remover erros | Modo Depurar, em todos os marcos |
| EF06CO01, EF06CO05 | Tipos de dados, entradas e saídas | Marco 5 |
| EF06CO03 | Operações e expressões | Marco 6 |
| EF06CO04, EF07CO05 | Decomposição e reúso | Marco 9 |
| EF06CO06 | Algoritmo genérico com parâmetros | Marco 10 |
| EF07CO01, EF08CO02 | Registros, vetores e listas | Marco 11 |
| EF08CO03 | Algoritmos sobre listas | Marco 12 |
| EF08CO01 | Recursão | Bônus O Espelho |
| EF07CO04 | Grafos | Bônus As Pontes |
| EF09CO05 | Criptografia | Bônus O Cofre |

O texto de EF06CO02 e de EF07CO02 foi conferido em fonte secundária; os demais códigos devem ser conferidos no anexo oficial do Parecer CNE/CEB nº 2/2022. Aprendizado de máquina não tem habilidade específica no eixo Pensamento Computacional dos anos finais; o marco bônus A Árvore é uma extensão.

**Motivação.** O jogo busca apoiar três necessidades descritas pela Teoria da Autodeterminação (RYAN; DECI, 2000): **competência** (desafio graduado e sensação de acertar), **autonomia** (escolher a missão, decidir quando usar uma dica, rejogar) e **pertencimento** (trabalho em dupla e uma história em que o estudante ajuda alguém).

## 4. Quando: a trilha e o tempo de aula

Cada marco tem 12 missões curtas, de 2 a 5 minutos cada: 2 guiadas, 4 de rastrear, 2 de prever, 2 de depurar, 1 de explicar e 1 desafio final. O próximo marco abre quando o estudante conclui 8 das 12 missões.

A repetição necessária para aprender acontece dentro do jogo:

- **Reforço por marco:** cada conceito é praticado 12 vezes, em quatro modos diferentes.
- **Rejogar com variação:** ao rejogar uma missão, o mapa aparece espelhado, para que o estudante leia o código de novo em vez de decorar o caminho.
- **Estrelas por domínio:** cada missão vale de 1 a 3 estrelas. Voltar para buscar a terceira estrela é uma repetição escolhida, não imposta.

**Duração.** Os [planos de aula](planos-de-aula.md) trazem dois percursos de aulas de 50 minutos:

| Percurso | Aulas | Marcos | Para quem |
| --- | --- | --- | --- |
| Completo | 15 | 1 a 12, com bônus opcionais | 8º ano, ou uma turma que tenha um semestre de Computação |
| Curto | 8 | 1 a 6 | 7º ano, ou uma primeira experiência com o jogo |

Nos dois, a primeira aula traz o pré-teste e a última, o pós-teste. Como o progresso fica salvo e pode ser levado num código, o estudante pode continuar em casa ou em outro computador.

## 5. Como: mecânicas e elementos de jogo

Os elementos de jogo foram escolhidos para servir à compreensão do código, e não como enfeite.

**Erro em camadas, sem punição.** Quando o estudante erra um passo no modo Rastrear:

1. **1º erro:** a linha treme e um "fantasma" do mensageiro mostra para onde ele tentou ir. O estudante continua do ponto onde estava, não do zero.
2. **2º erro no mesmo passo:** aparece uma pista ligada à linha e ao contexto, por exemplo "você está na volta 2 de 4 do laço".
3. **3º erro:** a pista se completa e o botão certo pisca.

No Prever, depois de um erro, o caminho executado fica na tela até o estudante decidir tentar de novo. Depois do 3º erro, a resposta aparece marcada e ele precisa confirmá-la para concluir.

**A execução fica visível.** O jogo mostra o que o computador faz: a linha em execução, o valor de cada variável, a volta de cada laço, a resposta de cada condição ("sim" ou "não"), a saída e o caminho percorrido. Nas telas largas, aparece também o **teste de mesa**, a tabela que registra o valor das variáveis a cada passo.

**Dicas sem economia.** Cada missão oferece 2 dicas, sem moedas e sem compra. Cada dica conta como um erro na hora das estrelas. A dica é um andaime, isto é, um apoio temporário que o estudante decide quando usar.

**Tour guiado.** Na primeira vez, o jogo apresenta cada parte da tela: o mapa da cidade, o código, os controles, as dicas, o conceito e o foco. Na primeira missão de cada modo, uma dica curta explica o que fazer. O tour pode ser pulado e reaberto pelo botão "Como jogar".

**Elementos da taxonomia de Toda et al. (2019) usados no jogo:**

| Dimensão | Elemento | Como aparece |
| --- | --- | --- |
| Ficcional | Narrativa | Um lugar da cidade em cada marco e um morador em cada missão; a casa acende e alguém aparece à janela |
| Desempenho | Progressão | Mapa único com 16 marcos; cada marco mostra quantas das 12 missões foram concluídas |
| Desempenho | Pontos | Estrelas por missão, visíveis no mapa e no fim da missão, nunca durante o jogo |
| Pessoal | Quebra-cabeça e objetivo | Cada missão tem um destino e uma pessoa explícitos |
| Pessoal | Novidade | Missões espelhadas ao rejogar e quatro modos em cada marco |
| Pessoal | Sensação | Sons curtos e casa que acende, com opção de silenciar e de reduzir o movimento |
| Social | Cooperação | Modo em dupla: quem pilota executa e quem navega lê o código e confere; os papéis trocam a cada missão |

**Elementos evitados de propósito:**

- **Ranking público:** expor quem está em último lugar desmotiva, sobretudo estudantes de territórios vulneráveis.
- **Competição individual:** só como desafio opcional entre equipes, se o professor quiser.
- **Pressão de tempo:** acompanhar um código exige atenção, não pressa.

**Princípios de interface.** Uma tecla corresponde a uma instrução e a resposta é imediata. Tudo o que o estudante precisa ler cabe na tela, sem rolagem nem zoom, do celular ao monitor. O visual é sóbrio, com a fonte Ubuntu. O jogo pode ser usado inteiro pelo teclado e respeita a preferência do aparelho de reduzir animações.

O funcionamento detalhado do jogo está no [Game Design Document (GDD)](GDD.md).

## 6. Onde: como o recurso chega à escola

- **Endereço do jogo:** https://cleoquintiliano.github.io/roadbit/jogo/, que abre sempre a versão mais recente. Cada versão também tem um endereço fixo, listado na [página do projeto](https://cleoquintiliano.github.io/roadbit/).
- **Equipamento:** qualquer navegador atual, em computador ou celular. Depois de aberto, o jogo funciona sem internet.
- **Progresso:** fica salvo no próprio aparelho. Para continuar em outro, o estudante anota o código de progresso (RB2-…) e o digita em "Tenho um código". Nenhum dado pessoal é coletado.
- **Para o professor:** o endereço do jogo seguido de `?tudo` abre todas as missões, para planejar a aula ou projetar uma missão para a turma.

**Coleção na MEC RED.** O recurso é publicado como uma coleção com o link da aplicação, o [guia do professor](guia-do-professor.md), os [planos de aula](planos-de-aula.md), o [pré e pós-teste](avaliacao/README.md) e um vídeo curto de demonstração, sob licença aberta: código sob a licença MIT e textos sob Creative Commons Atribuição 4.0 (CC BY 4.0).

## 7. Quanto: avaliação dos resultados

| O que se avalia | Instrumento | Indicador |
| --- | --- | --- |
| Aprendizagem de leitura, rastreio e depuração | [Pré e pós-teste](avaliacao/README.md), com duas formas equivalentes (A e B) | Ganho normalizado da turma (HAKE, 1998) |
| Acompanhamento de cada marco | Ficha de saída de 5 minutos e estrelas no jogo | Acertos na ficha e missões concluídas com 3 estrelas |
| Autonomia | Observação do professor e, numa versão futura, registros do jogo | Dicas usadas ao longo dos marcos |
| Erros de concepção | Fichas de saída e observação | Erros mais frequentes, por exemplo tratar `se` como se fosse `enquanto` |
| Percepção dos estudantes | Roda de conversa ao fim da sequência | Interesse, dificuldade percebida e relação da história com o cotidiano |

O pré e o pós-teste cobrem os 12 marcos principais, com duas questões por marco. Não há um teste por marco: muitas aplicações tomariam o tempo do jogo, e o próprio pré-teste influencia o aprendizado (RICHLAND; KORNELL; KAO, 2009), o que dificultaria saber o efeito do jogo. A justificativa completa do desenho está no [documento de avaliação](avaliacao/README.md).

**Teste de jogo.** Em novembro de 2026, um teste informal com a versão inicial mostrou que estudantes que já conheciam outros jogos de leitura de código consideraram o RoadBit mais completo e mais divertido. Esse relato orienta o desenho, mas não é dado de pesquisa. Para que os resultados entrem numa pesquisa, a aplicação precisa passar antes pelo comitê de ética.

## O RoadBit entre as ferramentas do mesmo escopo

O RoadBit não se define contra uma ferramenta específica, e sim pelo que reúne do campo das ferramentas de leitura, rastreio e depuração de código, como UUhistle, Online Python Tutor, Gidget, Light-Bot, a sequência didática PRIMM e o My Trace Table. Cada uma faz parte do que o RoadBit faz: simular a execução, prever, depurar, explicar, ver o teste de mesa. A contribuição está em combinar essas práticas num só jogo, com narrativa, em português e com uma trilha completa alinhada à BNCC para os anos finais. A comparação detalhada, característica por característica, está no [relatório de novidade](relatorio-novidade.md).

## Referências

BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. **Parecer CNE/CEB nº 2/2022**, aprovado em 17 de fevereiro de 2022. Normas sobre Computação na Educação Básica, Complemento à Base Nacional Comum Curricular (BNCC). Brasília, DF: MEC, 2022.

BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. **Resolução CNE/CEB nº 1, de 4 de outubro de 2022**. Normas sobre Computação na Educação Básica, Complemento à BNCC. Diário Oficial da União, Brasília, DF, 6 out. 2022, Seção 1, p. 33.

HAKE, R. R. Interactive-engagement versus traditional methods: a six-thousand-student survey of mechanics test data for introductory physics courses. **American Journal of Physics**, v. 66, n. 1, p. 64-74, 1998. DOI: 10.1119/1.18809.

KLOCK, A. C. T.; GASPARINI, I.; PIMENTA, M. S. 5W2H Framework: a guide to design, develop and evaluate the user-centered gamification. In: BRAZILIAN SYMPOSIUM ON HUMAN FACTORS IN COMPUTING SYSTEMS, 15., 2016, São Paulo. **Proceedings** [...]. New York: ACM, 2016. p. 14:1-14:10.

RICHLAND, L. E.; KORNELL, N.; KAO, L. S. The pretesting effect: do unsuccessful retrieval attempts enhance learning? **Journal of Experimental Psychology: Applied**, v. 15, n. 3, p. 243-257, 2009. DOI: 10.1037/a0016496.

RYAN, R. M.; DECI, E. L. Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. **American Psychologist**, v. 55, n. 1, p. 68-78, 2000. DOI: 10.1037/0003-066X.55.1.68.

TODA, A. M. et al. Analysing gamification elements in educational environments using an existing gamification taxonomy. **Smart Learning Environments**, v. 6, n. 1, art. 16, p. 1-14, 2019. DOI: 10.1186/s40561-019-0106-1.

As referências das ferramentas comparadas estão no [relatório de novidade](relatorio-novidade.md) e as que fundamentam a ordem da trilha, na [trilha de aprendizagem](trilha-de-aprendizagem.md#referências).
