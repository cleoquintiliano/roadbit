# RoadBit

**Jogo de leitura de código para o Pensamento Computacional, em que o estudante faz o papel do computador.**

O estudante conduz um robô mensageiro pela cidade lendo um código: executa cada instrução passo a passo, prevê onde o programa vai terminar, explica o que o código faz e encontra e corrige erros. A cada entrega certa, uma casa se acende e alguém aparece à janela.

| | Link |
|---|---|
| Página do projeto (todas as versões) | https://cleoquintiliano.github.io/roadbit/ |
| Jogo, versão mais recente | https://cleoquintiliano.github.io/roadbit/jogo/ |
| Jogo v0.3.0 | https://cleoquintiliano.github.io/roadbit/versoes/v0.3.0/jogo/ |
| Jogo v0.2.1 | https://cleoquintiliano.github.io/roadbit/versoes/v0.2.1/jogo/ |
| Jogo v0.2 | https://cleoquintiliano.github.io/roadbit/versoes/v0.2/jogo/ |
| Jogo v0.1 (demonstração, O Mensageiro) | https://cleoquintiliano.github.io/roadbit/versoes/v0.1/jogo/ |
| Guia do professor (PDF) | https://cleoquintiliano.github.io/roadbit/versoes/v0.3.0/docs/guia-do-professor.pdf |
| Planos de aula (PDF) | https://cleoquintiliano.github.io/roadbit/versoes/v0.3.0/docs/planos-de-aula.pdf |
| Pré e pós-teste e fichas de saída | [docs/avaliacao](docs/avaliacao/README.md) |
| Vídeo de demonstração | https://cleoquintiliano.github.io/roadbit/versoes/v0.3.0/video/roadbit-demonstracao.mp4 |
| Apresentação do recurso para professores (v0.2, .pptx) | https://cleoquintiliano.github.io/roadbit/versoes/v0.2/apresentacao/RoadBit-v0.2-recurso-educacional.pptx |
| Apresentação da proposta (v0.1) | https://cleoquintiliano.github.io/roadbit/versoes/v0.1/apresentacao/ |
| Trilha de aprendizagem | [docs/trilha-de-aprendizagem.md](docs/trilha-de-aprendizagem.md) |
| Game Design Document (GDD) | [docs/GDD.md](docs/GDD.md) |
| Proposta pedagógica e gamificação (5W2H) | [docs/proposta-pedagogica.md](docs/proposta-pedagogica.md) |
| Relatório de novidade e diferenciação | [docs/relatorio-novidade.md](docs/relatorio-novidade.md) |
| Histórico de mudanças | [CHANGELOG.md](CHANGELOG.md) |

## Para quem é

- **Estudantes** dos anos finais do Ensino Fundamental, sobretudo 7º e 8º ano (11 a 14 anos), em computador de laboratório ou celular, sem instalação.
- **Docentes de Computação** que queiram aplicar a atividade em sala. O [guia do professor](docs/guia-do-professor.md) e os [planos de aula](docs/planos-de-aula.md) trazem dois percursos, de 8 e de 15 aulas de 50 minutos, com pré e pós-teste. Para abrir todas as missões, use o endereço do jogo seguido de `?tudo`.

## O que tem na versão 0.3

- **Tour guiado** no mapa, na missão e na primeira missão de cada modo, que pode ser pulado e reaberto em "Como jogar".
- **Coleção para professores (MEC RED):** guia do professor, planos de aula, pré e pós-teste para impressão (formas A e B, gabarito conferido pelo motor do jogo, fichas de saída e planilha do ganho) e vídeo de demonstração.
- **Correções da v0.2.1** e 2 dicas por missão.

A trilha e os modos vêm da versão 0.2:


- **Mapa único com 16 marcos:** 12 principais, que cobrem a lógica de programação do eixo Pensamento Computacional da BNCC Computação, e 4 bônus (recursão, grafos, criptografia e árvore de decisão).
- **192 missões**, 12 por marco: 2 guiadas, 4 de rastrear, 2 de prever, 2 de depurar, 1 de explicar e 1 desafio.
- **Cartão de conceito** em cada marco: o estudante sabe o que está aprendendo.
- **Quatro modos:** Rastrear, Prever, Depurar e Explicar, mais a reprodução passo a passo ao fim da missão.
- **Visualização da execução:** foco que passa linha a linha, contador de voltas dos laços, resposta das condições, caminho percorrido, quadro de variáveis e teste de mesa.
- **Tudo visível sem rolagem nem zoom**, do celular ao monitor.
- **Erro em camadas, sem punição**, 2 dicas por missão e estrelas.
- **Progresso** salvo no aparelho e num código de progresso. Nenhum dado pessoal é coletado.
- **Acessibilidade:** condições por forma e cor (● ▲ ■), uso completo pelo teclado e respeito à preferência de reduzir movimento.

## Estrutura do repositório

```
index.html                  página inicial com todas as versões (gerada de versoes.json)
versoes.json                lista das versões do jogo e da documentação
jogo/index.html             versão mais recente do jogo (arquivo único, funciona sem internet)
versoes/v0.3.0/             jogo, documentos, avaliação e vídeo da v0.3.0
versoes/v0.2.1/             jogo da v0.2.1 (correções)
versoes/v0.2/               jogo e documentos da v0.2
versoes/v0.1/               jogo, apresentação e documentos da v0.1 (O Mensageiro)
docs/                       documentação em desenvolvimento (guia, planos, proposta, GDD, trilha)
docs/avaliacao/             pré e pós-teste, gabarito, fichas de saída e planilha
docs/video/                 vídeo de demonstração
src/engine.js               motor: árvore sintática, tradutor e interpretador
src/missoes.js              trilha: marcos, cartões de conceito e missões
src/app.html                interface do jogo
src/build.js                junta tudo em versoes/v<versão>/jogo/ e jogo/
src/landing.js              gera index.html a partir de versoes.json
src/avaliacao.js            questões do pré e pós-teste e das fichas de saída
src/avaliacao-build.js      confere as questões no motor e gera as folhas
src/pdf.py, src/docs-pdf.py geram os PDFs da avaliação e dos documentos
src/video.py                grava o vídeo de demonstração a partir do jogo
src/test.js                 confere todas as missões
testes/interface.py         confere a interface em cinco tamanhos de tela (Playwright)
testes/regressao.py         confere as correções da v0.2.1 (Playwright)
CHANGELOG.md                histórico de mudanças
```

## Como rodar e alterar

Basta abrir `jogo/index.html` no navegador. Para alterar o jogo:

```bash
node src/test.js            # confere se todas as missões têm solução
node src/build.js           # gera o arquivo único do jogo (versão atual de versoes.json)
node src/landing.js         # atualiza a página inicial a partir de versoes.json
python3 testes/interface.py # confere a interface (requer Playwright e Chrome)
python3 testes/regressao.py # confere as correções de jogabilidade e o tour
node src/avaliacao-build.js # confere as questões e gera a avaliação
python3 src/pdf.py docs/avaliacao && python3 src/docs-pdf.py docs   # PDFs
python3 src/video.py        # regrava o vídeo de demonstração
```

## Fundamentação

- **BNCC Computação** (Resolução CNE/CEB nº 1/2022), eixo Pensamento Computacional, com a depuração (EF07CO02) em todos os marcos.
- **Trajetórias de aprendizagem** de Rich et al. (2017, 2018, 2019, 2022) para ordenar os conceitos.
- **Ler antes de escrever** (Xie et al., 2019; Sentance; Waite; Kallia, 2019) e **visualização com participação ativa** (Hundhausen; Douglas; Stasko, 2002).
- **Framework 5W2H** (Klock; Gasparini; Pimenta, 2016) com a **Taxonomia de Toda et al. (2019)** para planejar a gamificação.

As referências completas, em ABNT, estão na [trilha de aprendizagem](docs/trilha-de-aprendizagem.md#referências) e no [GDD](docs/GDD.md#14-referências).

## Licença

- **Código** (`src/`, `jogo/`, `versoes/*/jogo/`, `index.html`, `testes/`): [MIT](LICENSE).
- **Textos, apresentação, documentos, avaliação e vídeo** (`docs/`, `versoes/*/docs/`, `versoes/*/apresentacao/`, `versoes/*/video/`): [Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)](LICENSE-CONTEUDO.md).

As fontes Ubuntu e Ubuntu Mono, embutidas nos arquivos, seguem a Ubuntu Font Licence 1.0.

## Autor

**Cléo Quintiliano Fernandes de Brito**
Mestrado Profissional em Ensino de Computação (ProfComp/UENP), 2026.
