# RoadBit: Game Design Document (GDD)

Versão 0.2 · 2026-11-17 · Cléo Quintiliano Fernandes de Brito

> O jogo se chamava **O Mensageiro** até a v0.1. A partir da v0.2 o produto se chama **RoadBit**; o mensageiro continua sendo o personagem. O histórico de mudanças está no [CHANGELOG](../../../CHANGELOG.md).

## 1. Visão geral

**Conceito em uma frase:** o estudante faz o papel do computador e conduz um robô mensageiro pela cidade, lendo, executando, prevendo e consertando o código que leva pão, remédio e cartas a quem precisa.

| Item | Definição |
| --- | --- |
| Gênero | Quebra-cabeça educacional de leitura e depuração de código, com progressão por mapa |
| Público principal | Estudantes do 7º e 8º ano do Ensino Fundamental (11 a 14 anos) |
| Público secundário | Docentes de Computação que aplicam o material a partir da MEC RED |
| Plataforma | Aplicação web no navegador, em computador de laboratório ou celular, sem instalação |
| Duração | Missões de 2 a 5 minutos; trilha principal em cerca de 8 a 12 aulas de 50 minutos, com uso por marco |
| Modo de jogo | Individual ou em dupla (piloto e navegador) |
| Versão atual | v0.2: trilha completa com 16 marcos (12 principais e 4 bônus), 192 missões, modos Rastrear, Prever, Depurar e Explicar |
| Base pedagógica | Compreensão de código antes da escrita; trajetórias de aprendizagem (Rich et al., 2017, 2018, 2019, 2022); BNCC Computação, eixo Pensamento Computacional |
| Planejamento | Framework 5W2H (Klock; Gasparini; Pimenta, 2016) com a Taxonomia de Toda et al. (2019) |

**Pilares de design.** Toda decisão do jogo passa por estes cinco critérios:

1. **Ritmo primeiro.** Uma tecla é uma instrução, com resposta imediata. Recurso que deixa o ciclo mais lento sai ou vira opcional.
2. **O código manda.** O que importa é o que o código diz, não o desenho. Mapas e casas ajudam, mas não substituem a leitura.
3. **Errar é recomeçar, não perder.** O erro ensina em camadas e o estudante continua do ponto onde errou.
4. **Valores mostrados, não ditos.** A casa acende e alguém aparece à janela. Nenhuma frase moral na tela.
5. **Leve e sóbrio.** Visual limpo, pouco texto, nada infantilizado para adolescentes.

## 2. Narrativa, mundo e personagens

**Premissa.** Uma pequena cidade acorda com as casas apagadas. O mensageiro começa a trabalhar na padaria e, a cada entrega, uma casa se acende e alguém aparece à janela. Ao fim da jornada, a cidade inteira está iluminada e os moradores se reúnem numa festa.

**Tom.** Acolhedor e leve, sem vilão e sem violência. O conflito é sempre o mesmo: alguém precisa de algo e o caminho até essa pessoa está escrito em código.

**Valores implícitos.** Servir, partilhar, parar para ajudar quem está à margem do caminho, buscar quem se perdeu e recomeçar sem culpa. Eles aparecem nas situações da história, nunca em frases morais. Assim, o material serve tanto à escola pública laica quanto à escola confessional.

**Como a história é contada.** Cada marco é um lugar da cidade (a Padaria, a Rua Comprida, a Mochila, a Oficina e outros). Durante as missões, a história vive no mapa: o nome da missão diz quem espera a entrega e a casa acesa mostra que a entrega aconteceu.

### Personagens

| Personagem | Papel | Direção de arte |
| --- | --- | --- |
| O Mensageiro | Avatar controlado pelo estudante. Não fala: quem "pensa" por ele é o estudante | Robô redondo com anel turquesa, rosto simples e bolsa amarela |
| Moradores | Destinatários das entregas: Ana, Seu João, Dona Rosa, a creche e outros | Silhuetas que aparecem à janela quando a casa acende; sem rosto detalhado, para que qualquer estudante se reconheça |
| O novato (futuro) | Mensageiro iniciante a quem o jogador ensina rotas, ligado ao marco de funções | Versão menor do Mensageiro |
| O filhote (futuro) | Animal perdido que o mensageiro procura, ligado ao marco de recursão | Silhueta simples |

### O mundo

A cidade é um **mapa único**, com um marco para cada objeto de aprendizagem. Os mapas das missões trazem elementos que antecipam o conceito: calçadas com formas e cores que mudam o caminho (seleção), placas com números (variáveis e operadores), paredes (grafos) e uma rua numerada de 0 a 9 (criptografia). O mapa das missões dá a volta nas bordas (mapa toroidal), o que exige ler o código em vez de confiar no desenho.

## 3. Mecânicas centrais

Todas as missões usam o mesmo motor: um interpretador que executa o código uma instrução por vez e compara cada passo com a jogada do estudante.

| Modo | O que o estudante faz | Interação | Objetivo de aprendizagem |
| --- | --- | --- | --- |
| **Rastrear** | Executa o código linha a linha, movendo o mensageiro | Setas do teclado, botões na tela ou deslizar o dedo; Entregar com Enter ou botão | Seguir o fluxo de controle e o estado do programa |
| **Prever** | Antes de executar, toca na calçada onde o mensageiro vai parar ou escolhe o valor final de uma variável | Um toque no mapa ou botões − e +, e o botão Conferir | Raciocinar sobre o programa inteiro e acabar com o avanço por tentativa e erro |
| **Depurar** | O código deveria acender as casas, mas falha. O estudante executa, observa, toca no número ou na direção suspeita e muda o valor | Executar, tocar no valor, girar para cima ou para baixo | EF07CO02: detectar e remover erros |
| **Explicar** | Escolhe, entre três frases, a que descreve o que o código faz; pode ver o código executar antes | Um toque | Dizer o propósito do código com palavras |

**Visualização da execução (v0.2, orientações do orientador).**

- **Foco linha a linha:** depois de cada ação, o destaque passa por todas as linhas que o computador executa sozinho, inclusive chaves, chamadas e linhas de função, e para na próxima linha de ação com cor mais forte. É rápido, qualquer tecla ou toque pula a passagem e o botão Foco desliga o recurso.
- **Contador de voltas:** ao voltar ao início de um laço, a linha pisca e mostra "volta 2 de 4" (ou "item 2 de 3" no para cada, "volta 2" e "sai do laço" no enquanto). As condições mostram "sim" ou "não".
- **Caminho percorrido:** as calçadas por onde o mensageiro passou ficam marcadas; no Prever, só depois de conferir.
- **Reproduzir:** ao fim da missão, o estudante pode rever a execução sem estrelas, com código, mapa e teste de mesa sincronizados e botões de passo a passo.
- **Volta ao início no Depurar:** ao mudar um valor, o mensageiro volta visivelmente ao ponto de partida, deixando claro que a próxima execução recomeça do zero.

**Quadro de variáveis e teste de mesa.** Abaixo do mapa, um quadro mostra o valor atual de cada variável, a saída de `escrever()`, os valores de entrada de `ler()` e o nível de chamada de função. Nas telas largas, aparece também o teste de mesa: uma tabela com a linha executada e o valor das variáveis a cada mudança.

**Cartão de conceito.** Cada marco abre com um cartão que diz o que o estudante vai aprender, com um exemplo de código e a habilidade da BNCC. O botão Conceito reabre o cartão durante a missão.

**Condições por forma e cor.** As calçadas têm ● laranja, ▲ roxo e ■ verde. A forma garante que estudantes com daltonismo leiam a condição. A partir do marco 7, as condições passam a usar variáveis e operadores.

**Armadilhas didáticas.** Desenho que engana (o mapa sugere um caminho, o código manda outro), "se" que não é "enquanto", mapa que dá a volta nas bordas e laços aninhados.

**Rejogar com variação.** Uma missão já concluída pode voltar espelhada, para que o estudante não decore o caminho.

**Controles.**

- Teclado: setas para mover, Enter para entregar.
- Toque: botões grandes e deslizar o dedo sobre o mapa.
- Em dupla: o piloto controla, o navegador lê o código em voz alta e confere; os papéis trocam a cada missão.

## 4. Loop de jogo e mapa de progressão

### Loop central (cada missão, 3 a 5 minutos)

Ler o código, executar ou prever, receber retorno imediato, entregar, ver a casa acender e voltar ao mapa.

### Loop de sessão (uma aula)

Entrar, abrir o marco atual no mapa, ler o cartão de conceito, avançar pelas missões do marco e anotar o código de progresso.

### Mapa de progressão da cidade (decisão de design)

**Situação atual (v0.2).** O mapa é **único**: os 12 marcos principais seguem uma rua contínua em zigue-zague e os 4 marcos bônus ficam no Bairro bônus. Cada marco mostra o lugar, o objeto de aprendizagem e quantas das 12 missões foram concluídas; o mensageiro fica ao lado do marco atual. Tocar num marco abre o cartão do marco, com o conceito e as 12 missões. O próximo marco abre com 8 das 12 missões concluídas. Na v0.1, havia um mapa por bairro (capítulo).

**Proposta original (v0.1).** Trocar a lista por um mapa da cidade no estilo dos mapas de mundo dos jogos de plataforma, como o de Super Mario Bros. 3: o mensageiro anda por ruas que ligam as missões, e cada bairro corresponde a um capítulo.

**Por que vale a pena.**

- **A progressão vira parte da história.** Neste jogo, o mapa é o próprio mundo. As casas acesas nas missões continuam acesas no mapa, e a cidade se ilumina diante do estudante. Isso mostra os valores sem dizer nada.
- **Atende ao elemento Progressão** da dimensão de desempenho da taxonomia de Toda et al. (2019), já previsto no esboço, de forma muito mais visível que uma lista.
- **Apoia competência e autonomia**, duas das necessidades psicológicas básicas da Teoria da Autodeterminação (Ryan; Deci, 2000): o estudante vê quanto já percorreu e pode escolher caminhos opcionais.
- **Orienta o professor.** Numa olhada, ele vê em que bairro cada estudante está.

**Riscos e como evitá-los.**

| Risco | Cuidado no design |
| --- | --- |
| Mais um clique antes de jogar quebra o ritmo | Botão "Continuar" na tela inicial leva direto à próxima missão; o mapa é para quem quer explorar |
| Mapa grande demais no celular | Duas colunas de marcos no celular; a rolagem do mapa é permitida, mas a tela da missão nunca rola |
| Caminhos livres deixam pular pré-requisitos | Caminho principal linear; só os ramos opcionais são livres |
| Mapa vira enfeite caro de produzir | Mapa em SVG gerado a partir dos dados das missões, sem ilustração feita à mão |
| Acessibilidade | Navegação por teclado entre os pontos e uma vista em lista como alternativa |

**Elementos inspirados nos mapas de mundo, adaptados ao jogo.**

| Elemento | No RoadBit |
| --- | --- |
| Fase | Marco da cidade (um objeto de aprendizagem), com 12 missões |
| Avatar que anda no mapa | O mensageiro fica ao lado do marco atual |
| Castelo do fim do mundo | Desafio final de cada marco (missão 12) |
| Casas de bônus | Bairro bônus: recursão, grafos, criptografia e árvore de decisão |
| Atalhos | Liberados ao concluir um bairro com todas as estrelas; nunca obrigatórios |
| Mundo seguinte | Novo marco abre com 8 de 12 missões do anterior |

**Escopo.** Feito na v0.2: mapa único com 16 marcos, cartão do marco, liberação por 8 de 12 missões e botão Continuar. Atalhos e animação do mensageiro andando entre marcos ficam para versões futuras.

## 5. Estrutura de conteúdo

A trilha completa, com a justificativa de cada marco e as referências, está em [trilha-de-aprendizagem.md](trilha-de-aprendizagem.md). Resumo:

| Marco | Lugar | Objeto de aprendizagem | BNCC |
| --- | --- | --- | --- |
| 1 | A Padaria | Sequência | EF06CO02 |
| 2 | A Rua Comprida | Repetição contada | EF06CO02 |
| 3 | As Calçadas Coloridas | Seleção: se e senão | EF06CO02 |
| 4 | A Avenida Verde | Repetição com condição: enquanto | EF06CO02 |
| 5 | A Mochila | Variáveis, tipos, entrada e saída | EF06CO01, EF06CO05 |
| 6 | A Balança | Operadores, contador e acumulador | EF06CO03 |
| 7 | A Portaria | Condições com variáveis | EF06CO02 |
| 8 | Os Quarteirões | Laços aninhados | EF06CO02 |
| 9 | A Oficina | Funções: decomposição e reúso | EF06CO04, EF07CO05 |
| 10 | A Central | Parâmetros e retorno | EF06CO06 |
| 11 | O Armazém | Listas e registros | EF07CO01, EF08CO02 |
| 12 | O Arquivo | Algoritmos sobre listas | EF08CO03 |
| Bônus | O Espelho | Recursão | EF08CO01 |
| Bônus | As Pontes | Grafos | EF07CO04 |
| Bônus | O Cofre | Criptografia: cifra de César | EF09CO05 |
| Bônus | A Árvore | IA: árvore de decisão | extensão |

Os códigos da BNCC devem ser conferidos no anexo oficial antes da publicação do artigo.

**Composição de cada marco (12 missões):** 2 guiadas, 4 de rastrear, 2 de prever, 2 de depurar, 1 de explicar e 1 desafio final.

### Regras de desenho das missões

- No máximo 16 linhas de código e mapa de até 10 por 5 calçadas, para caber na tela sem rolagem.
- As casas são colocadas onde o código correto entrega: o mapa nunca contradiz o código.
- Toda missão de depurar tem um único erro plantado (um número de 0 a 9 ou uma direção); qualquer correção que acenda todas as casas é aceita.
- Um teste automático confere todas as missões, inclusive espelhadas, e um teste de interface confere em cinco tamanhos de tela que nada do que o estudante lê fica fora da tela.
- Ao rejogar, a missão aparece espelhada.

## 6. Feedback, erro e dicas

**Erro em camadas.** O retorno cresce aos poucos, para não quebrar o ritmo:

| Momento | O que acontece | Texto na tela |
| --- | --- | --- |
| 1º erro no passo | A linha treme e um "fantasma" do mensageiro mostra para onde o código mandava ir | Nenhum |
| 2º erro no mesmo passo | Pista ligada à linha e ao contexto, por exemplo "você está na volta 2 de 4 do laço" | Uma frase |
| 3º erro ou dica pedida | Explicação do passo e o botão certo pisca | Uma ou duas frases |

O estudante continua do ponto do erro, nunca do zero.

**Dicas.** Três dicas gratuitas por marco, sem moedas e sem compra. A dica é um andaime que o estudante decide quando usar.

**Estrelas.** De 1 a 3 por missão: 3 sem erro e sem dica; 2 com até dois erros ou dicas; 1 nos demais casos. No Prever, no Depurar e no Explicar, as estrelas dependem do número de tentativas. Aparecem só no mapa e na tela de fim de missão, nunca durante o jogo.

**Acerto.** A casa acende, alguém aparece à janela e um som curto confirma a entrega.

**Depurar.** Ao executar o código com erro, o mensageiro percorre o caminho, as casas que ficaram apagadas são marcadas e uma frase curta orienta o estudante a tocar num número do código. Se o mensageiro não para nunca, a frase avisa que algo no código não muda. A linha do erro só é destacada quando o estudante usa uma dica, para que ele procure primeiro. Ao mudar um valor, o mensageiro volta ao início antes da nova execução.

**Explicar.** Uma frase errada escolhida fica riscada e o estudante pode ver o código executar antes de tentar de novo; a dica risca uma frase errada.

**Prever.** Ao conferir, a execução é mostrada passo a passo, com o caminho marcado. Se o mensageiro parar em outro lugar, ou se o valor previsto da variável estiver errado, uma frase curta diz qual dos dois falhou e o estudante prevê de novo.

## 7. Gamificação

Os elementos seguem a Taxonomia de Toda et al. (2019), dentro da dimensão "Como" do Framework 5W2H (Klock; Gasparini; Pimenta, 2016). Cada elemento precisa servir à compreensão do código.

| Dimensão | Elemento | Como aparece | Versão |
| --- | --- | --- | --- |
| Ficcional | Narrativa e contar histórias | Lugares da cidade por marco; morador em cada missão | v0.1 e v0.2 |
| Desempenho | Progressão | Mapa único com marcos que se completam (seção 4) | v0.2 |
| Desempenho | Pontos e estatísticas | Estrelas de 1 a 3, visíveis no mapa e no cartão do marco | v0.1 e v0.2 |
| Desempenho | Reconhecimento | Insígnias por conceito dominado | Completa |
| Pessoal | Quebra-cabeça e objetivo | Cada missão tem destino e pessoa explícitos | v0.1 e v0.2 |
| Pessoal | Novidade e renovação | Missões espelhadas ao rejogar; revisão do dia | v0.2 (espelho) e futura |
| Pessoal | Sensação | Casa que acende, sons curtos, opção de silenciar | v0.1 e v0.2 |
| Social | Cooperação | Dupla de piloto e navegador | Guia do professor |

**Evitados de propósito.**

- **Moedas e loja:** substituídas por 3 dicas gratuitas por marco, para não criar uma economia que compete com o desafio.
- **Ranking público:** expõe quem está atrás, o que desmotiva sobretudo estudantes de territórios vulneráveis.
- **Pressão de tempo:** rastrear exige atenção, não pressa. Só em missões bônus opcionais.
- **Frases morais na tela:** adolescentes rejeitam sermão; os valores ficam na história.

## 8. Arte, interface e tipografia

**Direção de arte.** Leve, limpa e sóbria, com formas planas e muito espaço em branco. Nada de texturas, sombras pesadas ou personagens infantis.

**Paleta.**

| Uso | Cor |
| --- | --- |
| Fundo | #F7F9FC |
| Texto principal | #1F2A44 |
| Azul de ação (botões, linha atual) | #1D3F86 |
| Turquesa (mensageiro, acertos) | #16A8A6 |
| Amarelo (entregar, luz da janela) | #FFD45C |
| Coral (telhado da casa acesa) | #FF7A59 |
| Palavra-chave do código | #B4235A |
| Condições | ● laranja #FF9F43 · ▲ roxo #8E6CEF · ■ verde #2BB673 |

**Tipografia.** Ubuntu para a interface e Ubuntu Mono para o código, as duas embutidas no arquivo, para funcionar sem internet. O tamanho do código se ajusta à tela: 23 px em telas largas, 16 a 19 px no celular e nunca menos de 14 px. Tudo o que o estudante precisa ler cabe na tela, sem rolagem nem redução de zoom.

**Elementos visuais.**

- Casa em SVG: apagada em tons de cinza; acesa com telhado coral, janela amarela e alguém à janela.
- Mensageiro em SVG: anel turquesa, rosto simples e bolsa amarela. Ao chegar a uma casa, ele diminui e se posiciona ao lado dela para não cobri-la.
- Ruas como círculos cinza claros em grade.

**Telas.**

| Tela | Conteúdo |
| --- | --- |
| Início | Nome do jogo, frase de chamada, Jogar, Tenho um código e uma fileira de casas animada |
| Mapa | Mapa único com 16 marcos, botão Continuar e barra de missões concluídas (seção 4) |
| Cartão do marco | Conceito, exemplo de código, BNCC e as 12 missões |
| Missão | Barra superior (voltar, título, modo, Conceito, Dica, Foco, Som), código à esquerda, mapa e quadro de variáveis no centro, teste de mesa à direita nas telas largas, controles embaixo |
| Fim de missão | Estrelas, o que o estudante praticou, Reproduzir, De novo, Próxima e Mapa |

**Celular primeiro.** Na tela estreita, o código fica em cima, o mapa embaixo e os controles ao alcance do polegar. Botões com pelo menos 44 px.

## 9. Áudio, acessibilidade e inclusão

**Áudio.** Sons curtos gerados no próprio navegador (Web Audio), sem arquivos: passo, entrega, acerto e erro. O erro tem som suave, nunca de punição. O botão Mudo fica sempre visível, porque o jogo é usado em laboratório com muitos computadores juntos. Música de fundo não está prevista.

**Acessibilidade.**

| Necessidade | Solução | Situação |
| --- | --- | --- |
| Daltonismo | Condições por forma e cor juntas (● ▲ ■) | Feito |
| Uso sem mouse | Teclado completo: setas, Enter e navegação por Tab | Feito |
| Leitor de tela | Rótulos descritivos nos botões e nas missões do mapa | Parcial |
| Sensibilidade a movimento | Respeita a preferência de reduzir movimento do sistema | Feito |
| Baixa visão | Alto contraste e código grande; tamanho de letra ajustável | Ajuste de letra na versão completa |
| Coordenação motora | Áreas de toque grandes e nenhuma ação com tempo limite | Feito |

**Inclusão.**

- Sem ranking e sem exposição de quem erra.
- Moradores sem rosto detalhado, para que qualquer estudante se reconheça.
- Funciona em computador antigo de laboratório e em celular, inclusive com dois estudantes num aparelho.
- Funciona sem internet depois de aberto.
- Pouco texto na tela, para não excluir quem ainda lê devagar.

## 10. Progresso, dados e privacidade

**Problema a resolver.** Jogos que guardam o progresso só no navegador fazem o estudante recomeçar do zero ao trocar de computador ou limpar o navegador, o que frustra. A repetição deve ser escolhida dentro do jogo, não imposta pela perda de progresso.

| Versão | Como o progresso é salvo | Dados pessoais |
| --- | --- | --- |
| v0.2 (23/11) | No aparelho (chave roadbit.v2, com migração automática do progresso da v0.1) e num **código de progresso** (RB2-…, um caractere por marco) que o estudante anota e digita em outro computador. O código tem um dígito de verificação para detectar erro de digitação | Nenhum |
| Completa | No servidor, por login com o e-mail institucional da escola ou por apelido aleatório com código de recuperação | E-mail institucional, ou nenhum no caso do apelido |

**Apelido aleatório.** O professor cria a turma, a aplicação gera apelidos como "Lontra 427" e o professor imprime um cartão por estudante. A relação entre apelido e nome real fica só com o professor, no papel.

**Regras de proteção de dados.**

- Melhor interesse do estudante, conforme a LGPD, art. 14, e o Enunciado CD/ANPD nº 1/2023.
- Mínimo de dados: sem nome, foto, localização ou contato; sem anúncios e sem rastreadores de terceiros.
- Exclusão dos dados da turma ao fim do ano letivo ou a pedido.
- O termo de uso deve ser validado pela escola ou pela secretaria de educação antes da aplicação. Estas regras são proposta de projeto, não parecer jurídico.

## 11. Tecnologia e arquitetura

**Uma estrutura, várias linguagens.** Cada missão é guardada como uma árvore sintática abstrata (AST), uma estrutura de dados que representa o programa sem depender de linguagem. Um único interpretador executa a árvore e gera o rastro completo da execução (posição, variáveis, casas acesas a cada passo). Cada linguagem é só uma forma de exibir a mesma árvore.

| Exibição | Exemplo da mesma condição | Versão |
| --- | --- | --- |
| Pseudocódigo em português com símbolos | `se ● {` | v0.1 e v0.2 |
| Blocos (Blockly) | Bloco colorido de condição | Futura |
| Python | `if casa_laranja():` | Futura |
| JavaScript | `if (casaLaranja()) {` | Futura |

**v0.2 (feita).**

| Parte | Tecnologia |
| --- | --- |
| Motor | JavaScript puro: construtores da árvore, `layout` (gera as linhas de código), `simulate` (gera o rastro, com funções, recursão, listas, registros, entrada e saída) e espelhamento de missões |
| Trilha | `src/missoes.js`: 16 marcos, cartões de conceito e 192 missões |
| Interface | Um único arquivo HTML com CSS e JavaScript, fontes embutidas, sem dependências externas |
| Progresso | localStorage e código de progresso |
| Qualidade | Teste automático das 192 missões, inclusive espelhadas, e teste de interface com Playwright em cinco tamanhos de tela |

**Versão completa (prevista).**

| Camada | Tecnologia |
| --- | --- |
| Interface | React com TypeScript (Vite), como PWA |
| Motor | Interpretador da árvore em TypeScript |
| Missões | Arquivos JSON com árvore, mapa, erro plantado e dicas |
| Sem internet | Service Worker e IndexedDB |
| Servidor | Supabase (PostgreSQL, autenticação e Row Level Security), região São Paulo |
| Login | OAuth com Google restrito ao domínio da escola |
| Hospedagem | CDN, como Cloudflare Pages ou Vercel |
| Qualidade | Vitest, Playwright, axe e GitHub Actions |

## 12. Avaliação, métricas, escopo e cronograma

**O que medir.**

| O que se mede | Instrumento | Indicador |
| --- | --- | --- |
| Rastreio e depuração | Pré e pós-teste com questões equivalentes | Diferença de acertos |
| Domínio por conceito | Registros da aplicação | Acertos de primeira por conceito |
| Autonomia | Registros da aplicação | Dicas usadas e sua queda ao longo dos marcos |
| Concepções equivocadas | Registros da aplicação | Erros mais frequentes, como tratar "se" como "enquanto" |
| Experiência | Teste de jogo com uma turma de 7º ano | Onde travam, comemoram e desistem |
| Engajamento | Questionário validado (a escolher) | Interesse e vontade de continuar |
| Valores | Roda de conversa guiada | Relações entre a história e o cotidiano |

**Escopo por versão.**

| Item | v0.1 (demonstração) | v0.2 (23/11) | Futura |
| --- | --- | --- | --- |
| Conteúdo | 4 capítulos, 19 missões | 16 marcos, 192 missões | Revisão do dia e missões geradas |
| Modos | Rastrear, Prever, Depurar | Mais Explicar e Reproduzir | Escrever pequenas partes do código |
| Mapa | Um mapa por bairro | Mapa único | Atalhos |
| Progresso | Aparelho e código M1 | Aparelho e código RB2 | Servidor, e-mail institucional ou apelido |
| Linguagens | Pseudocódigo com símbolos | Pseudocódigo com símbolos | Blocos, Python e JavaScript |
| Idioma | Português | Português (código preparado para tradução) | Inglês e espanhol |
| Professor | Guia e plano de aulas | Parâmetro ?tudo para abrir todas as missões | Painel da turma |

**Cronograma.**

| Data | Entrega |
| --- | --- |
| 06/11/2026 | Apresentação de 5 minutos da proposta |
| 17/11/2026 | v0.2 publicada: trilha completa e mapa único |
| Até 20/11 | Teste de jogo com turma, guia do professor e plano de aulas |
| 23/11/2026 | Coleção na MEC RED e envio por e-mail ao professor da disciplina |

## 13. Riscos e decisões em aberto

**Decisões em aberto.**

| Decisão | Opções | Recomendação |
| --- | --- | --- |
| Liberação do próximo marco | Decidido em 17/11: 8 de 12 missões | Avaliar no teste com estudantes |
| Casa visível nas missões de rastrear | Na v0.2, as casas ficam onde o código entrega | Avaliar se as casas viram atalho e, se preciso, incluir casas que despistam |
| Questionário de engajamento | Escolher instrumento validado na literatura | Escolher e conferir a referência antes do teste |
| Códigos e texto oficial das habilidades da BNCC | Conferir no anexo do Parecer CNE/CEB nº 2/2022 | Fazer antes da entrega e do artigo |

**Riscos.**

| Risco | Efeito | Mitigação |
| --- | --- | --- |
| Somar recursos e perder o ritmo | Estudantes perdem o interesse | Pilar "ritmo primeiro"; tudo novo é opcional ou aparece só quando necessário |
| Casa visível virar atalho | Estudante não lê o código | Casas que despistam e caminhos não óbvios |
| Escopo maior que o prazo | Entrega incompleta em 23/11 | Trilha da v0.2 concluída e testada; o restante vai documentado |
| Trilha longa demais para a turma | Turma não chega aos marcos finais | Uso por marco, conforme o plano da escola; marcos bônus opcionais |
| Login institucional depender da secretaria | Atraso na versão completa | Código de progresso funciona sem login |
| Internet instável no laboratório | Aula interrompida | Arquivo único que funciona sem internet |
| Narrativa de valores parecer sermão | Rejeição pelos adolescentes | Valores só nas situações, nunca em frases |

## 14. Referências

AUTORIDADE NACIONAL DE PROTEÇÃO DE DADOS (Brasil). **Enunciado CD/ANPD nº 1, de 24 de maio de 2023**. Trata das hipóteses legais para o tratamento de dados pessoais de crianças e adolescentes. Brasília, DF: ANPD, 2023.

BRASIL. **Lei nº 13.709, de 14 de agosto de 2018**. Lei Geral de Proteção de Dados Pessoais (LGPD). Brasília, DF: Presidência da República, 2018.

BRASIL. Conselho Nacional de Educação. Câmara de Educação Básica. **Resolução CNE/CEB nº 1, de 4 de outubro de 2022**. Normas sobre Computação na Educação Básica, Complemento à BNCC. Diário Oficial da União, Brasília, DF, 6 out. 2022, Seção 1, p. 33.

KLOCK, A. C. T.; GASPARINI, I.; PIMENTA, M. S. 5W2H Framework: a guide to design, develop and evaluate the user-centered gamification. In: BRAZILIAN SYMPOSIUM ON HUMAN FACTORS IN COMPUTING SYSTEMS, 15., 2016, São Paulo. **Proceedings** [...]. New York: ACM, 2016. p. 14:1-14:10.

RICH, K. M.; STRICKLAND, C.; BINKOWSKI, T. A.; MORAN, C.; FRANKLIN, D. K-8 learning trajectories derived from research literature: sequence, repetition, conditionals. In: ACM CONFERENCE ON INTERNATIONAL COMPUTING EDUCATION RESEARCH (ICER), 2017, Tacoma. **Proceedings** [...]. New York: ACM, 2017. p. 182-190. DOI: 10.1145/3105726.3106166.

As demais referências da trilha (Rich et al., 2018, 2019, 2022 e outras) estão em [trilha-de-aprendizagem.md](trilha-de-aprendizagem.md#referências).

RYAN, R. M.; DECI, E. L. Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. **American Psychologist**, v. 55, n. 1, p. 68-78, 2000. DOI: 10.1037/0003-066X.55.1.68.

TODA, A. M. et al. Analysing gamification elements in educational environments using an existing gamification taxonomy. **Smart Learning Environments**, v. 6, n. 1, art. 16, p. 1-14, 2019. DOI: 10.1186/s40561-019-0106-1.

TOXICODE. **Compute It**. Jogo digital. Disponível em: https://compute-it.toxicode.fr/. Acesso em: 5 nov. 2026.

Documentos relacionados: trilha de aprendizagem, esboço da atividade (5W2H), relatório de novidade e diferenciação e apresentação de 06/11/2026 (v0.1).
