# Histórico de mudanças

Todas as mudanças relevantes do RoadBit ficam registradas aqui. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/). Cada versão publicada continua disponível em `versoes/vX.Y/` no GitHub Pages.

## [0.2.0] - 2026-11-17

Primeira versão com a trilha de aprendizagem completa. O jogo passa a se chamar **RoadBit**.

### Adicionado
- Trilha com 16 marcos num mapa único: 12 marcos principais (sequência, repetição, seleção, enquanto, variáveis e entrada e saída, operadores, condições com variáveis, laços aninhados, funções, parâmetros e retorno, listas e registros, algoritmos sobre listas) e 4 marcos bônus (recursão, grafos, cifra de César e árvore de decisão).
- 12 missões por marco, 192 no total: 2 guiadas, 4 de rastrear, 2 de prever, 2 de depurar, 1 de explicar e 1 desafio final.
- Cartão de conceito em cada marco, com explicação, exemplo de código e habilidade da BNCC Computação; botão Conceito durante a missão.
- Modo Explicar e Prever valor de variável.
- Foco que passa linha a linha, inclusive chaves e linhas de função, e para na linha da ação; pode ser pulado e desligado.
- Contador de voltas nos laços ("volta 2 de 4"), linha que pisca ao voltar ao laço e resposta das condições ("sim" ou "não").
- Caminho percorrido marcado no mapa (no Prever, só depois de conferir).
- Modo Reproduzir ao fim da missão, sem estrelas, com controle de passo.
- Quadro de variáveis, saída de `escrever()`, valores de entrada de `ler()` e nível de chamada de função; teste de mesa nas telas largas.
- Linguagem do motor ampliada: senão se, `/`, `%`, `e`, `ou`, `não`, textos, lógicos, funções com parâmetros e retorno, recursão, listas, registros, placas numéricas e paredes no mapa.
- Encaixe automático na tela: nada do que o estudante lê fica fora da tela, sem rolagem nem zoom, com fonte mínima de 14 px.
- Parâmetro `?tudo` para o professor abrir todas as missões.
- Documento `docs/trilha-de-aprendizagem.md` com a justificativa da trilha.
- Teste automático das 192 missões (`src/test.js`) e teste de interface em cinco tamanhos de tela (`testes/interface.py`).
- Página inicial com todas as versões do jogo e da documentação, gerada de `versoes.json`.

### Alterado
- Próximo marco liberado com 8 de 12 missões; dentro do marco, missões em sequência.
- No Depurar, o mensageiro volta visivelmente ao início ao mudar um valor; direções também podem ser corrigidas.
- Progresso salvo na chave `roadbit.v2`, com migração automática do progresso da v0.1, e novo código de progresso `RB2-…`.
- GDD e esboço 5W2H atualizados; o esboço compara o RoadBit com todo o campo, não mais com uma única ferramenta.
- `jogo/` passa a apontar sempre para a versão mais recente.

### Removido
- Mapas separados por bairro, substituídos pelo mapa único.

## [0.1.0] - 2026-11-06

Versão de demonstração, ainda com o nome **O Mensageiro**. Disponível em `versoes/v0.1/`.

### Adicionado
- Motor com árvore sintática, tradutor para pseudocódigo e interpretador que gera o rastro da execução.
- 4 bairros e 19 missões nos modos Rastrear, Prever e Depurar.
- Mapa da cidade por bairro, teste de mesa, erro em camadas, dicas e estrelas.
- Código de progresso `M1-…` e progresso salvo no aparelho.
- Apresentação com animações, GDD, esboço 5W2H e relatório de novidade.

[0.2.0]: https://github.com/cleoquintiliano/roadbit/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/cleoquintiliano/roadbit/releases/tag/v0.1.0
