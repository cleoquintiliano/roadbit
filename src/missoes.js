// ===== RoadBit: trilha de aprendizagem (marcos, cartões de conceito e missões) =====
// 12 marcos principais e 4 marcos bônus, com 12 missões cada.
// Composição de cada marco: 2 missões guiadas, 4 de rastrear, 2 de prever, 2 de depurar,
// 1 de explicar e 1 desafio final. A ordem dos marcos está justificada em docs/trilha-de-aprendizagem.md.

(function (raiz) {
  const E = typeof module !== 'undefined' ? require('./engine.js') : raiz.RoadBitMotor;
  const { N, T, BO, V, B, NAO, S, PL, LIVRE, LS, IX, TAM, REC, FLD, FC, R_, L_, U_, D_, ENT, mvx, rep, cada, se, enq,
    set, setx, esc, ler, def, call, ret, clone, layout, simulate, coletar } = E;

  // ---------- marcos: lugar da cidade, objeto de aprendizagem e cartão de conceito ----------
  // req: marco que precisa ter 8 missões concluídas para este abrir (0 = aberto desde o início)
  const MARCOS = [
    { id: 1, lugar: 'A Padaria', objeto: 'Sequência', bncc: 'EF06CO02', req: 0,
      texto: 'Um algoritmo é uma lista de instruções. O computador executa uma instrução de cada vez, de cima para baixo, sem pular nenhuma. Trocar a ordem muda o resultado.',
      exemplo: ['<span class="fn">direita()</span>', '<span class="fn">direita()</span>', '<span class="fn">entregar()</span>'],
      aprendeu: 'ler um algoritmo na ordem, uma instrução de cada vez' },
    { id: 2, lugar: 'A Rua Comprida', objeto: 'Repetição', bncc: 'EF06CO02', req: 1,
      texto: 'Repetir é mandar o computador executar o mesmo bloco várias vezes. O número entre parênteses diz quantas voltas. Ao chegar na chave }, ele volta para o início do bloco.',
      exemplo: ['<span class="kw">repetir</span> (<span class="num">3</span>) {', '  <span class="fn">direita()</span>', '}'],
      aprendeu: 'acompanhar um bloco que se repete um número certo de vezes' },
    { id: 3, lugar: 'As Calçadas Coloridas', objeto: 'Seleção: se e senão', bncc: 'EF06CO02', req: 2,
      texto: 'Com o se, o computador faz uma pergunta e decide. Se a resposta for sim, executa o bloco. Se for não, pula o bloco ou executa o bloco do senão. Aqui a pergunta é sobre a calçada onde o mensageiro está.',
      exemplo: ['<span class="kw">se</span> <span class="sym s-o">●</span> {', '  <span class="fn">cima()</span>', '} <span class="kw">senão</span> {', '  <span class="fn">direita()</span>', '}'],
      aprendeu: 'decidir o caminho a partir de uma condição' },
    { id: 4, lugar: 'A Avenida Verde', objeto: 'Repetição com condição: enquanto', bncc: 'EF06CO02', req: 3,
      texto: 'O enquanto repete o bloco sem saber antes quantas voltas serão. A cada volta ele faz a pergunta de novo. Quando a resposta for não, a repetição acaba.',
      exemplo: ['<span class="kw">enquanto</span> <span class="sym s-g">■</span> {', '  <span class="fn">direita()</span>', '}'],
      aprendeu: 'acompanhar uma repetição que depende de uma condição' },
    { id: 5, lugar: 'A Mochila', objeto: 'Variáveis, tipos, entrada e saída', bncc: 'EF06CO01, EF06CO05', req: 4,
      texto: 'Uma variável é um espaço com nome que guarda um valor. A seta ← guarda um valor novo e apaga o antigo. O valor pode ser número, texto ou verdadeiro e falso. ler() recebe um valor de fora. escrever() mostra um valor.',
      exemplo: ['<span class="var">pães</span> ← <span class="num">3</span>', '<span class="fn">ler</span>(<span class="var">casas</span>)', '<span class="fn">escrever</span>(<span class="var">pães</span>)'],
      aprendeu: 'guardar, trocar e usar valores em variáveis' },
    { id: 6, lugar: 'A Balança', objeto: 'Operadores, contador e acumulador', bncc: 'EF06CO03', req: 5,
      texto: 'Operadores fazem contas: + soma, - subtrai, * multiplica, / divide e % dá o resto da divisão. Um contador soma 1 a cada volta. Um acumulador vai somando valores diferentes.',
      exemplo: ['<span class="var">entregas</span> ← <span class="num">0</span>', '<span class="var">entregas</span> ← <span class="var">entregas</span> + <span class="num">1</span>'],
      aprendeu: 'calcular com variáveis, contar e acumular' },
    { id: 7, lugar: 'A Portaria', objeto: 'Condições com variáveis', bncc: 'EF06CO02', req: 6,
      texto: 'Uma condição compara valores: = igual, ≠ diferente, > maior, < menor. O e exige que as duas partes sejam verdadeiras. O ou aceita uma só. O não inverte a resposta.',
      exemplo: ['<span class="kw">se</span> <span class="var">pães</span> > <span class="num">0</span> <span class="kw">e</span> <span class="var">aberta</span> {', '  <span class="fn">entregar()</span>', '}'],
      aprendeu: 'montar e ler perguntas com comparações, e, ou e não' },
    { id: 8, lugar: 'Os Quarteirões', objeto: 'Laços aninhados', bncc: 'EF06CO02', req: 7,
      texto: 'Um laço pode ficar dentro de outro. A cada volta do laço de fora, o laço de dentro roda inteiro, do começo ao fim.',
      exemplo: ['<span class="kw">repetir</span> (<span class="num">2</span>) {', '  <span class="kw">repetir</span> (<span class="num">3</span>) {', '    <span class="fn">direita()</span>', '  }', '  <span class="fn">baixo()</span>', '}'],
      aprendeu: 'acompanhar um laço dentro de outro' },
    { id: 9, lugar: 'A Oficina', objeto: 'Funções: decomposição e reúso', bncc: 'EF06CO04, EF07CO05', req: 8,
      texto: 'Uma função é um bloco de instruções com nome. Quando o nome é chamado, o computador vai até a função, executa o bloco e volta para onde estava. Assim um problema grande vira partes pequenas, que podem ser usadas várias vezes.',
      exemplo: ['<span class="kw">função</span> <span class="fn">degrau</span>() {', '  <span class="fn">direita()</span>', '  <span class="fn">baixo()</span>', '}', '<span class="fn">degrau</span>()'],
      aprendeu: 'dividir um problema em funções e reaproveitá-las' },
    { id: 10, lugar: 'A Central', objeto: 'Parâmetros e retorno', bncc: 'EF06CO06', req: 9,
      texto: 'Um parâmetro é uma variável que a função recebe ao ser chamada. Com ele, a mesma função resolve casos diferentes. O retorna devolve uma resposta para quem chamou.',
      exemplo: ['<span class="kw">função</span> <span class="fn">dobro</span>(<span class="var">n</span>) {', '  <span class="kw">retorna</span> <span class="var">n</span> * <span class="num">2</span>', '}', '<span class="var">p</span> ← <span class="fn">dobro</span>(<span class="num">3</span>)'],
      aprendeu: 'generalizar uma solução com parâmetros e retorno' },
    { id: 11, lugar: 'O Armazém', objeto: 'Listas e registros', bncc: 'EF07CO01, EF08CO02', req: 10,
      texto: 'Uma lista guarda vários valores em ordem. Cada um tem uma posição, e a primeira posição é a 0. Um registro junta dados diferentes sobre a mesma coisa, cada um com seu nome.',
      exemplo: ['<span class="var">rota</span> ← [<span class="num">2</span>, <span class="num">1</span>, <span class="num">3</span>]', '<span class="var">rota</span>[<span class="num">0</span>]', '<span class="var">casa</span> ← {rua: <span class="num">2</span>, andar: <span class="num">1</span>}', '<span class="var">casa</span>.rua'],
      aprendeu: 'guardar e percorrer vários dados em listas e registros' },
    { id: 12, lugar: 'O Arquivo', objeto: 'Algoritmos sobre listas', bncc: 'EF08CO03', req: 11,
      texto: 'Alguns algoritmos aparecem o tempo todo: somar os itens de uma lista, contar, achar o maior ou o menor, buscar um valor e colocar em ordem. Todos percorrem a lista item por item.',
      exemplo: ['<span class="var">maior</span> ← <span class="num">0</span>', '<span class="kw">para cada</span> <span class="var">n</span> <span class="kw">em</span> <span class="var">lista</span> {', '  <span class="kw">se</span> <span class="var">n</span> > <span class="var">maior</span> {', '    <span class="var">maior</span> ← <span class="var">n</span>', '  }', '}'],
      aprendeu: 'somar, contar, buscar e ordenar itens de uma lista' },
    { id: 13, bonus: true, lugar: 'O Espelho', objeto: 'Recursão', bncc: 'EF08CO01', req: 10,
      texto: 'Uma função recursiva chama a si mesma para resolver uma parte menor do problema. O caso base é a condição que faz as chamadas pararem. Sem caso base, ela nunca termina.',
      exemplo: ['<span class="kw">função</span> <span class="fn">andar</span>(<span class="var">n</span>) {', '  <span class="kw">se</span> <span class="var">n</span> > <span class="num">0</span> {', '    <span class="fn">direita()</span>', '    <span class="fn">andar</span>(<span class="var">n</span> - <span class="num">1</span>)', '  }', '}'],
      aprendeu: 'acompanhar uma função que chama a si mesma até o caso base' },
    { id: 14, bonus: true, lugar: 'As Pontes', objeto: 'Grafos', bncc: 'EF07CO04', req: 11,
      texto: 'Um grafo é um conjunto de pontos ligados por linhas. Os pontos são os vértices e as linhas são as arestas. O mapa da cidade é um grafo: as esquinas são vértices e as ruas são arestas. Um caminho é uma sequência de arestas.',
      exemplo: ['<span class="kw">enquanto</span> <span class="fn">livre(</span>→<span class="fn">)</span> {', '  <span class="fn">direita()</span>', '}'],
      aprendeu: 'ver o mapa como vértices e arestas e seguir caminhos' },
    { id: 15, bonus: true, lugar: 'O Cofre', objeto: 'Criptografia: cifra de César', bncc: 'EF09CO05', req: 12,
      texto: 'Criptografar é embaralhar uma mensagem para que só quem tem a chave consiga ler. Na cifra de César, cada símbolo anda um número fixo de posições, a chave. Quando passa do fim, dá a volta ao começo: é o resto da divisão.',
      exemplo: ['<span class="var">c</span> ← (<span class="var">m</span> + <span class="var">chave</span>) % <span class="num">10</span>'],
      aprendeu: 'cifrar e decifrar com uma chave e o resto da divisão' },
    { id: 16, bonus: true, lugar: 'A Árvore', objeto: 'Inteligência Artificial: árvore de decisão', bncc: 'extensão', req: 7,
      texto: 'Uma árvore de decisão classifica um exemplo fazendo perguntas em sequência, cada uma com um se. No aprendizado de máquina, o computador escolhe as perguntas e os limites olhando exemplos já classificados. Aqui você faz esse papel.',
      exemplo: ['<span class="kw">se</span> <span class="var">peso</span> > <span class="num">5</span> {', '  <span class="fn">direita()</span>', '} <span class="kw">senão</span> {', '  <span class="fn">esquerda()</span>', '}'],
      aprendeu: 'classificar exemplos com uma árvore de decisão e ajustar seus limites' }
  ];

  // ---------- missões ----------
  const MISSIONS = [];
  const grade = m => typeof m === 'string' ? Array.from({ length: +m.split('x')[1] }, () => '.'.repeat(+m.split('x')[0])) : m;
  // modo: r rastrear, p prever, d depurar, e explicar
  const MODO = { r: 'rastrear', p: 'prever', d: 'depurar', e: 'explicar' };
  function M(marco, modo, titulo, mapa, start, code, extra) {
    const n = MISSIONS.filter(q => q.marco === marco).length + 1;
    MISSIONS.push(Object.assign({ id: marco + '-' + n, marco, n, modo: MODO[modo], titulo, map: grade(mapa), start, code }, extra || {}));
  }
  const gt = (a, b) => B('>', a, b), lt = (a, b) => B('<', a, b), mais = (a, b) => B('+', a, b), menos = (a, b) => B('-', a, b);
  const menos1 = n => menos(V(n), 1), mais1 = n => mais(V(n), 1);

  // ===== Marco 1: sequência =====
  M(1, 'r', 'Pão para Ana', '5x1', [0, 0], [R_, R_, R_, R_, ENT], { guia: 'Você é o computador. Execute a linha destacada: use as setas do teclado, os botões ou deslize o dedo.' });
  M(1, 'r', 'Leite para Seu João', '3x3', [0, 2], [U_, U_, R_, R_, ENT], { guia: 'Uma linha de cada vez, de cima para baixo. No fim, aperte Entregar.' });
  M(1, 'r', 'O desenho engana', ['.tttt', '.t..t', '.....'], [0, 2], [R_, R_, R_, R_, ENT]);
  M(1, 'p', 'Onde ele para?', '4x3', [0, 0], [R_, D_, R_, U_, R_, D_, D_]);
  M(1, 'r', 'Duas entregas', '4x3', [0, 0], [R_, R_, ENT, D_, D_, ENT]);
  M(1, 'd', 'Carta extraviada', '4x3', [0, 1], [R_, R_, U_, ENT], { bug: { m: 2, d: 'D' }, alvo: 'a casa' });
  M(1, 'r', 'A rua dá a volta', '4x2', [3, 0], [R_, R_, D_, ENT]);
  M(1, 'p', 'Volta ao mundo', '3x3', [2, 2], [R_, D_, R_, D_]);
  M(1, 'r', 'Três vizinhos', '4x3', [0, 0], [R_, ENT, D_, R_, ENT, D_, R_, ENT]);
  M(1, 'd', 'Remédio com pressa', '5x3', [0, 0], [R_, R_, D_, R_, D_, ENT], { bug: { m: 3, d: 'L' }, alvo: 'a casa' });
  M(1, 'e', 'O que este código faz?', '4x3', [0, 0], [R_, R_, D_, D_, ENT], { casas: true,
    opcoes: ['Anda 2 para a direita, 2 para baixo e entrega.', 'Anda 2 para baixo, 2 para a direita e entrega.', 'Entrega primeiro e depois anda.'] });
  M(1, 'r', 'Entrega geral', '5x3', [0, 2], [U_, R_, ENT, R_, U_, ENT, R_, R_, R_, ENT], { desafio: true });

  // ===== Marco 2: repetição contada =====
  M(2, 'r', 'A rua comprida', '6x1', [0, 0], [rep(5, [R_]), ENT], { guia: 'O bloco entre { e } se repete. Veja o contador de voltas ao lado da linha.' });
  M(2, 'r', 'Escada de quarteirões', '4x4', [0, 0], [rep(3, [R_, D_]), ENT], { guia: 'A cada volta, execute as duas linhas do bloco, na ordem.' });
  M(2, 'r', 'Duas de cada vez', '5x1', [0, 0], [rep(2, [R_, R_, ENT])]);
  M(2, 'p', 'Sobe e anda', '4x4', [0, 3], [rep(3, [R_, U_])]);
  M(2, 'r', 'Sete passos numa rua de quatro', '4x1', [1, 0], [rep(7, [R_]), ENT]);
  M(2, 'd', 'Remédio para Dona Rosa', '5x1', [0, 0], [rep(4, [R_]), ENT], { bug: { n: 0, v: 3 }, alvo: 'a casa de Dona Rosa' });
  M(2, 'r', 'Desce e vira', '4x4', [0, 0], [rep(3, [D_]), rep(2, [R_]), ENT]);
  M(2, 'p', 'Para a esquerda', '4x3', [1, 0], [rep(5, [L_]), D_]);
  M(2, 'r', 'Casa por casa', '4x3', [0, 0], [rep(3, [R_, ENT]), D_, ENT]);
  M(2, 'd', 'Escada quebrada', '4x4', [0, 0], [rep(3, [R_, D_]), ENT], { bug: { n: 0, v: 2 }, alvo: 'a casa' });
  M(2, 'e', 'O que este código faz?', '5x1', [0, 0], [rep(4, [R_, ENT])], { casas: true,
    opcoes: ['Entrega em 4 casas seguidas.', 'Anda 4 vezes e entrega uma vez só.', 'Entrega 4 vezes na mesma casa.'] });
  M(2, 'r', 'Ida e volta', '5x3', [0, 0], [rep(2, [R_, R_, D_]), ENT, rep(3, [L_]), ENT], { desafio: true });

  // ===== Marco 3: seleção por símbolo =====
  const O = S('o'), P = S('p'), G = S('g');
  M(3, 'r', 'A calçada laranja', ['....', '.o..', '....'], [0, 1], [R_, se(O, [U_]), R_, ENT], { guia: 'O se faz uma pergunta: o mensageiro está na calçada ●? Se sim, execute o bloco. Se não, pule.' });
  M(3, 'r', 'Sem laranja, sem desvio', '4x3', [0, 1], [R_, se(O, [U_]), R_, ENT], { guia: 'Agora não há calçada ●. O bloco do se é pulado.' });
  M(3, 'r', 'Subir ou seguir', ['....', '....', '..p.', '.p..'], [0, 3], [rep(4, [se(P, [U_], [R_])]), ENT]);
  M(3, 'p', 'Verde desce', ['...', '.g.', '...'], [0, 1], [R_, se(G, [D_], [U_]), R_]);
  M(3, 'r', 'Degraus laranja', ['.o...', '..o..', '...o.', '.....'], [0, 0], [rep(4, [se(O, [D_]), R_]), ENT]);
  M(3, 'd', 'Carta para a creche', ['..o..', '.....', '.....'], [0, 0], [rep(3, [R_, se(O, [D_])]), ENT], { bug: { n: 0, v: 2 }, alvo: 'a creche' });
  M(3, 'r', 'Três caminhos', ['...p.', '.o...', '.....'], [0, 1], [rep(5, [se(O, [U_], [se(P, [D_], [R_])])]), ENT]);
  M(3, 'p', 'Se não for verde', ['..g.', '....', '....'], [0, 0], [rep(3, [se(S('g', true), [R_], [D_])])]);
  M(3, 'r', 'Roxo e laranja', ['....', '..o.', 'p...'], [0, 2], [se(P, [U_]), R_, R_, se(O, [U_], [D_]), ENT]);
  M(3, 'd', 'Desvio errado', ['....', '.o..', '....'], [0, 1], [R_, se(O, [U_]), R_, R_, ENT], { bug: { m: 1, d: 'D' }, alvo: 'a casa' });
  M(3, 'e', 'O que este código faz?', ['.o...', '..o..', '.....'], [0, 0], [rep(3, [se(O, [D_]), R_]), ENT], { casas: true,
    opcoes: ['Anda para a direita e, quando pisa em ●, desce antes.', 'Desce 3 vezes seguidas.', 'Só anda se a calçada for ●.'] });
  M(3, 'r', 'Bairro das cores', ['....', '..g.', '....', '..p.'], [0, 1], [rep(2, [R_]), se(G, [D_], [U_]), ENT, rep(2, [se(P, [L_]), D_]), ENT], { desafio: true });

  // ===== Marco 4: enquanto =====
  M(4, 'r', 'Enquanto for verde', ['gggg.'], [0, 0], [enq(G, [R_]), ENT], { guia: 'A cada volta a pergunta é feita de novo: ainda estou no ■? Quando a resposta for não, o laço acaba.' });
  M(4, 'r', 'Até achar o laranja', ['....', '...o', '....'], [0, 1], [enq(S('o', true), [R_]), U_, ENT], { guia: 'Aqui a pergunta é: não estou no ●? Ande enquanto isso for verdade.' });
  M(4, 'r', 'Verde desce, laranja anda', ['g...', 'g...', 'oo..'], [0, 0], [enq(G, [D_]), enq(O, [R_]), ENT]);
  M(4, 'p', 'Onde o verde acaba', ['ggg..', '.....', '.....'], [0, 0], [enq(G, [R_]), D_]);
  M(4, 'r', 'Laço com desvio', ['....p', '.o...', '.....'], [0, 1], [enq(S('p', true), [se(O, [U_]), R_]), D_, ENT]);
  M(4, 'd', 'Dois quarteirões abaixo', ['ggg.', '....', '....', '....'], [0, 0], [enq(G, [R_]), rep(2, [D_]), ENT], { bug: { n: 0, v: 1 }, alvo: 'a casa' });
  M(4, 'r', 'A volta completa', ['..o.', '....', '....'], [0, 0], [enq(S('o', true), [L_]), D_, ENT]);
  M(4, 'p', 'Se não é enquanto', ['ggg..', '.....', '.....'], [0, 0], [se(G, [R_]), se(G, [R_]), D_]);
  M(4, 'r', 'Verde e mais dois', ['gg...', '.....', '.....'], [0, 0], [enq(G, [R_]), rep(2, [R_]), D_, ENT]);
  M(4, 'd', 'Subida trocada', ['....', 'ggg.', '....'], [0, 1], [enq(G, [R_]), U_, ENT], { bug: { m: 1, d: 'D' }, alvo: 'a casa' });
  M(4, 'e', 'O que este código faz?', ['ggg..'], [0, 0], [enq(G, [R_]), ENT], { casas: true,
    opcoes: ['Anda para a direita enquanto a calçada for ■, depois entrega.', 'Anda uma vez só, se a calçada for ■.', 'Entrega em todas as calçadas ■.'] });
  M(4, 'r', 'Avenida inteira', ['g....', 'g.o..', '.....'], [0, 0], [enq(G, [D_]), R_, ENT, U_, enq(S('o', true), [R_]), rep(2, [R_]), ENT], { desafio: true });

  // ===== Marco 5: variáveis, tipos, entrada e saída =====
  M(5, 'r', 'A mochila', '5x1', [0, 0], [set('passos', 3), rep(V('passos'), [R_]), ENT], { guia: 'A variável passos guarda o valor 3. Acompanhe o valor no quadro de variáveis.' });
  M(5, 'r', 'Dois pães, duas casas', '4x1', [0, 0], [set('pães', 2), rep(2, [R_, ENT, set('pães', menos1('pães'))])], { guia: 'A cada entrega, a variável pães recebe um valor novo: o antigo menos 1.' });
  M(5, 'r', 'O pedido chega', '6x1', [0, 0], [ler('n'), rep(V('n'), [R_]), ENT], { entrada: [4] });
  M(5, 'p', 'Cópia não é espelho', '3x1', [0, 0], [set('a', 2), set('b', V('a')), set('a', 5)], { soVar: true, predictVar: 'b' });
  M(5, 'r', 'Nome e número', '3x4', [0, 0], [set('nome', 'Ana'), set('pães', 2), rep(V('pães'), [D_]), ENT, esc(V('nome'))]);
  M(5, 'd', 'Faltou passo', '6x1', [0, 0], [set('passos', 4), rep(V('passos'), [R_]), ENT], { bug: { n: 0, v: 2 }, alvo: 'a casa' });
  M(5, 'r', 'Está chovendo?', '4x3', [0, 1], [set('chovendo', true), R_, se(V('chovendo'), [D_], [U_]), R_, ENT]);
  M(5, 'p', 'Troca de mochilas', '3x1', [0, 0], [set('a', 1), set('b', 2), set('t', V('a')), set('a', V('b')), set('b', V('t'))], { soVar: true, predictVar: 'a' });
  M(5, 'r', 'Dois pedidos', '5x4', [0, 0], [ler('x'), ler('y'), rep(V('x'), [R_]), rep(V('y'), [D_]), ENT], { entrada: [3, 2] });
  M(5, 'd', 'Três casas, dois passos', '5x1', [0, 0], [set('casas', 3), rep(V('casas'), [R_, ENT])], { bug: { n: 0, v: 2 }, alvo: 'as três casas' });
  M(5, 'e', 'O que este código faz?', '5x1', [0, 0], [set('passos', 3), rep(V('passos'), [R_]), ENT, esc(V('passos'))], { casas: true,
    opcoes: ['Guarda 3 em passos, anda 3 vezes, entrega e escreve 3.', 'Anda até passos chegar a 0.', 'Escreve a palavra passos na tela.'] });
  M(5, 'r', 'Pedido completo', '5x3', [0, 0], [ler('n'), set('nome', 'Bia'), rep(V('n'), [R_]), ENT, set('n', 1), rep(V('n'), [D_]), ENT, esc(V('nome'))], { entrada: [3], desafio: true });

  // ===== Marco 6: operadores, contador e acumulador =====
  const soma = (v, e) => set(v, mais(V(v), e));
  M(6, 'r', 'Conta de somar', '5x1', [0, 0], [set('passos', mais(2, 1)), rep(V('passos'), [R_]), ENT], { guia: 'Primeiro o computador faz a conta 2 + 1. Depois guarda o resultado em passos.' });
  M(6, 'r', 'O caderno de entregas', '4x1', [0, 0], [set('entregas', 0), rep(3, [R_, ENT, soma('entregas', 1)]), esc(V('entregas'))], { guia: 'entregas é um contador: começa em 0 e soma 1 a cada entrega.' });
  M(6, 'r', 'Vezes dois', '6x1', [0, 0], [set('q', B('*', 2, 2)), rep(V('q'), [R_]), ENT]);
  M(6, 'p', 'Conta em cadeia', '3x1', [0, 0], [set('x', 2), set('x', B('*', V('x'), 3)), set('x', menos1('x'))], { soVar: true, predictVar: 'x' });
  M(6, 'r', 'Somando as placas', ['.213', '....', '....'], [0, 0], [set('total', 0), rep(3, [R_, soma('total', PL)]), esc(V('total')), D_, ENT]);
  M(6, 'd', 'Conta errada', '6x1', [0, 0], [set('passos', menos(5, 2)), rep(V('passos'), [R_]), ENT], { bug: { n: 1, v: 1 }, alvo: 'a casa' });
  M(6, 'r', 'O resto da divisão', '3x4', [0, 0], [set('n', 8), set('r', B('%', V('n'), 3)), rep(V('r'), [D_]), ENT]);
  M(6, 'p', 'De dois em dois', '3x1', [0, 0], [set('c', 0), rep(4, [soma('c', 2)])], { soVar: true, predictVar: 'c' });
  M(6, 'r', 'Dividir por igual', '5x1', [0, 0], [set('cada', B('/', 6, 2)), rep(V('cada'), [R_]), ENT]);
  M(6, 'd', 'Dobrando os passos', '6x1', [0, 0], [set('passos', 1), rep(2, [set('passos', B('*', V('passos'), 2))]), rep(V('passos'), [R_]), ENT], { bug: { n: 1, v: 1 }, alvo: 'a casa' });
  M(6, 'e', 'O que este código faz?', ['.213.'], [0, 0], [set('total', 0), rep(3, [R_, soma('total', PL)])],
    { opcoes: ['Soma as placas das 3 calçadas por onde passa.', 'Conta quantas calçadas existem na rua.', 'Guarda só a última placa.'] });
  M(6, 'r', 'Soma e entrega', ['.12.', '....', '....', '....'], [0, 0], [set('total', 0), rep(2, [R_, soma('total', PL)]), rep(V('total'), [D_]), ENT, esc(V('total'))], { desafio: true });

  // ===== Marco 7: condições com variáveis =====
  M(7, 'r', 'Tem pão?', '3x1', [0, 0], [set('pães', 2), se(gt(V('pães'), 0), [R_, ENT])], { guia: 'A pergunta agora compara valores: pães é maior que 0?' });
  M(7, 'r', 'Enquanto houver pão', '5x1', [0, 0], [set('pães', 3), enq(gt(V('pães'), 0), [R_, ENT, set('pães', menos1('pães'))])], { guia: 'A cada volta, confira o valor de pães antes de responder à pergunta.' });
  M(7, 'r', 'Placa alta, placa baixa', ['.....', '..1..', '.3.4.', '.....'], [0, 2], [rep(3, [R_, se(gt(PL, 2), [U_], [D_])]), ENT]);
  M(7, 'p', 'Igual ou diferente', '3x1', [0, 0], [set('x', 3), set('y', 0), se(B('=', V('x'), 3), [set('y', 1)], [set('y', 2)]), se(B('≠', V('x'), 3), [soma('y', 5)])], { soVar: true, predictVar: 'y' });
  M(7, 'r', 'Os dois ao mesmo tempo', '3x3', [0, 1], [set('pães', 2), set('aberta', true), R_, se(B('e', gt(V('pães'), 0), V('aberta')), [U_], [D_]), ENT]);
  M(7, 'd', 'O limite da placa', ['.....', '..2..', '.5.6.', '.....', '.....'], [0, 2], [rep(3, [R_, se(gt(PL, 3), [U_], [D_])]), ENT], { bug: { n: 1, v: 5 }, alvo: 'a casa' });
  M(7, 'r', 'Um ou outro', '4x3', [0, 1], [set('chuva', false), set('noite', true), R_, se(B('ou', V('chuva'), V('noite')), [D_], [U_]), R_, ENT]);
  M(7, 'p', 'O contrário', '3x1', [0, 0], [set('aberta', false), set('n', 0), se(NAO(V('aberta')), [set('n', 4)], [set('n', 9)]), se(B('e', NAO(V('aberta')), lt(V('n'), 3)), [soma('n', 1)])], { soVar: true, predictVar: 'n' });
  M(7, 'r', 'Contando até quatro', '5x1', [0, 0], [set('i', 0), enq(lt(V('i'), 4), [R_, soma('i', 1)]), ENT]);
  M(7, 'd', 'Parou cedo demais', '6x1', [0, 0], [set('i', 0), enq(lt(V('i'), 5), [R_, soma('i', 1)]), ENT], { bug: { n: 1, v: 3 }, alvo: 'a casa' });
  M(7, 'e', 'O que este código faz?', '5x1', [0, 0], [set('pães', 2), enq(gt(V('pães'), 0), [R_, ENT, set('pães', menos1('pães'))])], { casas: true,
    opcoes: ['Entrega um pão por casa até os pães acabarem.', 'Entrega para sempre, sem parar.', 'Entrega só se tiver mais de 2 pães.'] });
  M(7, 'r', 'Portaria completa', ['.2.1.', '.....', '.....'], [0, 0], [set('pães', 2), rep(4, [R_, se(B('e', gt(PL, 0), gt(V('pães'), 0)), [D_, ENT, U_, set('pães', menos1('pães'))])])], { desafio: true });

  // ===== Marco 8: laços aninhados =====
  M(8, 'r', 'Laço dentro de laço', '5x3', [0, 0], [rep(2, [rep(2, [R_]), D_]), ENT], { guia: 'O laço de dentro roda inteiro a cada volta do laço de fora. Olhe os dois contadores.' });
  M(8, 'r', 'Os dois contadores', '7x1', [0, 0], [rep(2, [rep(3, [R_], 'j'), ENT], 'i')], { guia: 'i conta as voltas de fora e j conta as de dentro. Veja j recomeçar do 1.' });
  M(8, 'r', 'Quarteirão por quarteirão', '4x3', [0, 0], [rep(2, [rep(3, [R_]), ENT, rep(3, [L_]), D_])]);
  M(8, 'p', 'Quantos passos?', '3x1', [0, 0], [set('p', 0), rep(3, [rep(2, [soma('p', 1)])])], { soVar: true, predictVar: 'p' });
  M(8, 'r', 'A varredura', '3x3', [0, 0], [rep(2, [rep(2, [R_, ENT]), D_, rep(2, [L_])])]);
  M(8, 'd', 'Faltou uma rua', '7x4', [0, 0], [rep(3, [rep(2, [R_]), D_]), ENT], { bug: { n: 0, v: 2 }, alvo: 'a casa' });
  M(8, 'r', 'Escada dupla', '5x5', [0, 0], [rep(2, [rep(2, [R_]), rep(2, [D_])]), ENT]);
  M(8, 'p', 'Volta e sobe', '5x3', [0, 2], [rep(2, [rep(2, [R_]), U_])]);
  M(8, 'r', 'Laço com decisão', ['..o....', '.....o.', '.......'], [0, 0], [rep(2, [rep(3, [se(O, [D_]), R_])]), ENT]);
  M(8, 'd', 'O laço de dentro', '7x3', [0, 0], [rep(2, [rep(3, [R_]), D_]), ENT], { bug: { n: 1, v: 2 }, alvo: 'a casa' });
  M(8, 'e', 'O que este código faz?', '4x4', [0, 0], [rep(3, [rep(3, [R_]), D_])],
    { opcoes: ['Três vezes: anda 3 para a direita e desce 1.', 'Anda 3 para a direita e depois desce 3.', 'Anda 9 para a direita sem descer.'] });
  M(8, 'r', 'A quadra inteira', '3x2', [0, 0], [set('n', 0), rep(2, [rep(3, [R_, ENT, soma('n', 1)]), D_]), esc(V('n'))], { desafio: true });

  // ===== Marco 9: funções =====
  M(9, 'r', 'Uma receita com nome', '3x1', [0, 0], [def('avançar', [], [R_, R_]), call('avançar'), ENT], { guia: 'avançar() é uma chamada. O computador vai até a função, executa o bloco e volta.' });
  M(9, 'r', 'Usar duas vezes', '5x1', [0, 0], [def('avançar', [], [R_, R_]), call('avançar'), ENT, call('avançar'), ENT], { guia: 'A função foi escrita uma vez e é usada duas. Isso é reúso.' });
  M(9, 'r', 'A escada', '4x4', [0, 0], [def('degrau', [], [R_, D_]), rep(3, [call('degrau')]), ENT]);
  M(9, 'p', 'Chamada por chamada', '5x3', [0, 0], [def('canto', [], [R_, R_, D_]), call('canto'), call('canto')]);
  M(9, 'r', 'Entrega e volta', '4x3', [0, 0], [def('visitar', [], [D_, ENT, U_]), R_, call('visitar'), R_, R_, call('visitar')]);
  M(9, 'd', 'Receita incompleta', '7x3', [0, 0], [def('avançar', [], [rep(3, [R_])]), call('avançar'), D_, call('avançar'), ENT], { bug: { n: 0, v: 2 }, alvo: 'a casa' });
  M(9, 'r', 'Duas receitas', '5x3', [0, 0], [def('lado', [], [R_, R_]), def('desce', [], [D_, D_]), call('lado'), call('desce'), ENT, call('lado'), ENT]);
  M(9, 'p', 'Função que chama função', '5x3', [0, 0], [def('passo', [], [R_]), def('salto', [], [call('passo'), call('passo'), D_]), call('salto'), call('salto')]);
  M(9, 'r', 'Decompor a rota', '7x3', [0, 0], [def('quadra', [], [rep(2, [R_]), ENT]), call('quadra'), D_, call('quadra'), D_, call('quadra')]);
  M(9, 'd', 'Chamou de menos', '4x4', [0, 0], [def('degrau', [], [R_, D_]), rep(3, [call('degrau')]), ENT], { bug: { n: 0, v: 1 }, alvo: 'a casa' });
  M(9, 'e', 'O que este código faz?', '4x3', [0, 0], [def('visitar', [], [D_, ENT, U_]), rep(3, [R_, call('visitar')])], { casas: true,
    opcoes: ['Em 3 casas seguidas: anda, desce, entrega e volta.', 'Define a função visitar, mas nunca usa.', 'Entrega 3 vezes na mesma casa.'] });
  M(9, 'r', 'Oficina completa', '4x3', [0, 0], [def('rua', [], [rep(3, [R_]), ENT]), def('voltar', [], [rep(3, [L_]), D_]), rep(2, [call('rua'), call('voltar')])], { desafio: true });

  // ===== Marco 10: parâmetros e retorno =====
  const andarN = def('andar', ['n'], [rep(V('n'), [R_])]);
  const dobro = def('dobro', ['n'], [ret(B('*', V('n'), 2))]);
  M(10, 'r', 'A receita ajustável', '5x1', [0, 0], [andarN, call('andar', [3]), ENT], { guia: 'O valor 3 da chamada vai para o parâmetro n. Veja n no quadro de variáveis.' });
  M(10, 'r', 'Mesma função, outro valor', '6x1', [0, 0], [andarN, call('andar', [2]), ENT, call('andar', [3]), ENT], { guia: 'A mesma função resolve dois casos, porque recebe valores diferentes.' });
  M(10, 'r', 'Dois parâmetros', '5x3', [0, 0], [def('ir', ['x', 'y'], [rep(V('x'), [R_]), rep(V('y'), [D_])]), call('ir', [3, 2]), ENT]);
  M(10, 'p', 'Qual valor chega?', '6x1', [0, 0], [andarN, set('k', 2), call('andar', [V('k')]), call('andar', [mais1('k')])]);
  M(10, 'r', 'A função responde', '6x1', [0, 0], [dobro, set('p', FC('dobro', [2])), rep(V('p'), [R_]), ENT]);
  M(10, 'd', 'Valor errado', '6x3', [0, 0], [andarN, call('andar', [4]), D_, ENT], { bug: { n: 0, v: 2 }, alvo: 'a casa' });
  M(10, 'r', 'Escada de qualquer tamanho', '5x5', [0, 0], [def('escada', ['n'], [rep(V('n'), [R_, D_])]), call('escada', [2]), ENT, call('escada', [1]), ENT]);
  M(10, 'p', 'O retorno', '3x1', [0, 0], [def('soma', ['a', 'b'], [ret(mais(V('a'), V('b')))]), set('r', FC('soma', [2, 3])), set('r', FC('soma', [V('r'), 1]))], { soVar: true, predictVar: 'r' });
  M(10, 'r', 'Calcular e andar', '5x1', [0, 0], [def('falta', ['pães', 'casas'], [ret(menos(V('casas'), V('pães')))]), set('f', FC('falta', [1, 4])), rep(V('f'), [R_]), ENT]);
  M(10, 'd', 'Dobro de quanto?', '6x1', [0, 0], [dobro, rep(FC('dobro', [2]), [R_]), ENT], { bug: { n: 1, v: 1 }, alvo: 'a casa' });
  M(10, 'e', 'O que este código faz?', '5x3', [0, 0], [def('ir', ['x', 'y'], [rep(V('x'), [R_]), rep(V('y'), [D_])]), call('ir', [2, 1]), ENT, call('ir', [1, 1]), ENT], { casas: true,
    opcoes: ['A mesma função leva a duas casas, porque recebe valores diferentes.', 'A função só funciona na primeira chamada.', 'x e y valem sempre 2 e 1.'] });
  M(10, 'r', 'Central completa', '8x3', [0, 0], [def('entregar_em', ['n'], [rep(V('n'), [R_]), ENT]), dobro, call('entregar_em', [1]), call('entregar_em', [FC('dobro', [1])]), D_, call('entregar_em', [FC('dobro', [2])])], { desafio: true });

  // ===== Marco 11: listas e registros =====
  M(11, 'r', 'A lista de passos', '3x3', [0, 0], [set('rota', LS(['→', '→', '↓'])), cada('passo', V('rota'), [mvx(V('passo'))]), ENT], { guia: 'A lista rota guarda três setas. A cada volta, passo recebe o próximo item da lista.' });
  M(11, 'r', 'A posição zero', '4x1', [0, 0], [set('passos', LS([2, 1, 3])), rep(IX(V('passos'), 0), [R_]), ENT], { guia: 'passos[0] é o item da posição 0, o primeiro da lista. Aqui ele vale 2.' });
  M(11, 'r', 'Cada número, uma caminhada', '4x1', [0, 0], [set('lista', LS([2, 1])), cada('n', V('lista'), [rep(V('n'), [R_]), ENT])]);
  M(11, 'p', 'Quem está na posição 1?', '3x1', [0, 0], [set('l', LS([4, 7, 2])), set('x', IX(V('l'), 1))], { soVar: true, predictVar: 'x' });
  M(11, 'r', 'O tamanho da lista', '4x1', [0, 0], [set('casas', LS(['Ana', 'Bia', 'Caio'])), rep(TAM(V('casas')), [R_, ENT])]);
  M(11, 'd', 'Posição trocada', '6x1', [0, 0], [set('passos', LS([1, 4, 2])), rep(IX(V('passos'), 1), [R_]), ENT], { bug: { n: 3, v: 2 }, alvo: 'a casa' });
  M(11, 'r', 'A ficha da casa', '4x3', [0, 0], [set('casa', REC({ nome: 'Ana', rua: 2, andar: 1 })), rep(FLD(V('casa'), 'rua'), [R_]), rep(FLD(V('casa'), 'andar'), [D_]), ENT]);
  M(11, 'p', 'Mudando um item', '3x1', [0, 0], [set('l', LS([1, 2, 3])), setx(IX(V('l'), 0), 5), set('x', mais(IX(V('l'), 0), IX(V('l'), 2)))], { soVar: true, predictVar: 'x' });
  M(11, 'r', 'Rota guardada', '3x3', [0, 0], [set('rota', LS(['→', '↓', '→', '↓'])), cada('p', V('rota'), [mvx(V('p'))]), ENT, esc(TAM(V('rota')))]);
  M(11, 'd', 'Lista curta demais', '5x1', [0, 0], [set('lista', LS([2, 2])), cada('n', V('lista'), [rep(V('n'), [R_]), ENT])], { bug: { n: 1, v: 1 }, alvo: 'as duas casas' });
  M(11, 'e', 'O que este código faz?', '5x1', [0, 0], [set('lista', LS([1, 2, 1])), cada('n', V('lista'), [rep(V('n'), [R_]), ENT])], { casas: true,
    opcoes: ['Para cada número da lista, anda esse tanto e entrega.', 'Anda 3 vezes, porque a lista tem 3 itens.', 'Usa só o primeiro número da lista.'] });
  M(11, 'r', 'Armazém completo', '3x4', [0, 0], [set('rota', LS(['→', '→'])), set('andares', LS([1, 2])), cada('p', V('rota'), [mvx(V('p'))]), cada('a', V('andares'), [rep(V('a'), [D_]), ENT])], { desafio: true });

  // ===== Marco 12: algoritmos sobre listas =====
  const acharMaior = l => [set('l', LS(l)), set('maior', 0), cada('n', V('l'), [se(gt(V('n'), V('maior')), [set('maior', V('n'))])])];
  const somarLista = l => [set('l', LS(l)), set('soma', 0), cada('n', V('l'), [soma('soma', V('n'))])];
  M(12, 'r', 'Somar a lista', '5x1', [0, 0], [...somarLista([1, 2, 1]), rep(V('soma'), [R_]), ENT], { guia: 'soma é um acumulador: a cada item da lista, ela cresce. Veja no quadro de variáveis.' });
  M(12, 'r', 'O maior', '5x1', [0, 0], [...acharMaior([2, 4, 3]), rep(V('maior'), [R_]), ENT], { guia: 'maior guarda o maior número visto até agora. Ele só muda quando aparece um número ainda maior.' });
  M(12, 'r', 'Contar os grandes', '3x4', [0, 0], [set('l', LS([5, 1, 6, 2])), set('c', 0), cada('n', V('l'), [se(gt(V('n'), 3), [soma('c', 1)])]), rep(V('c'), [D_]), ENT]);
  M(12, 'p', 'O menor', '3x1', [0, 0], [set('l', LS([4, 2, 6])), set('menor', 9), cada('n', V('l'), [se(lt(V('n'), V('menor')), [set('menor', V('n'))])])], { soVar: true, predictVar: 'menor' });
  M(12, 'r', 'Busca na rua', ['.3.7.', '.....', '.....'], [0, 0], [enq(B('≠', PL, 7), [R_]), D_, ENT]);
  M(12, 'd', 'Somou de menos', '6x1', [0, 0], [...somarLista([1, 2, 2]), rep(V('soma'), [R_]), ENT], { bug: { n: 2, v: 1 }, alvo: 'a casa' });
  M(12, 'r', 'Em que posição?', '4x1', [0, 0], [set('l', LS([3, 8, 5])), set('i', 0), enq(B('≠', IX(V('l'), V('i')), 5), [soma('i', 1)]), rep(V('i'), [R_]), ENT]);
  M(12, 'p', 'Trocar para ordenar', '3x1', [0, 0], [set('l', LS([3, 1])), se(gt(IX(V('l'), 0), IX(V('l'), 1)), [set('t', IX(V('l'), 0)), setx(IX(V('l'), 0), IX(V('l'), 1)), setx(IX(V('l'), 1), V('t'))]), set('x', IX(V('l'), 0))], { soVar: true, predictVar: 'x' });
  M(12, 'r', 'Contar e entregar', '3x1', [0, 0], [set('l', LS([1, 3, 1])), set('c', 0), cada('n', V('l'), [se(B('=', V('n'), 1), [R_, ENT, soma('c', 1)])]), esc(V('c'))]);
  M(12, 'd', 'O maior não era esse', '7x1', [0, 0], [...acharMaior([2, 5, 3]), rep(V('maior'), [R_]), ENT], { bug: { n: 1, v: 4 }, alvo: 'a casa' });
  M(12, 'e', 'O que este código faz?', '3x1', [0, 0], acharMaior([2, 6, 4]),
    { opcoes: ['Guarda em maior o maior número da lista.', 'Soma todos os números da lista.', 'Guarda em maior o último número da lista.'] });
  M(12, 'r', 'Ordenar para entregar', '5x1', [0, 0], [set('l', LS([3, 1, 2])), rep(2, [se(gt(IX(V('l'), menos1('i')), IX(V('l'), V('i'))), [set('t', IX(V('l'), menos1('i'))), setx(IX(V('l'), menos1('i')), IX(V('l'), V('i'))), setx(IX(V('l'), V('i')), V('t'))])], 'i'), rep(IX(V('l'), 2), [R_]), ENT], { desafio: true });

  // ===== Marco 13 (bônus): recursão =====
  const recAndar = def('andar', ['n'], [se(gt(V('n'), 0), [R_, call('andar', [menos1('n')])])]);
  const recVai = def('vai', ['n'], [se(gt(V('n'), 0), [R_, call('vai', [menos1('n')]), L_])]);
  M(13, 'r', 'Chamar a si mesma', '5x1', [0, 0], [recAndar, call('andar', [3]), ENT], { guia: 'andar chama andar com um número menor. Quando n chega a 0, as chamadas param: é o caso base.' });
  M(13, 'r', 'O caso base', '3x4', [0, 0], [def('descer', ['n'], [se(gt(V('n'), 0), [D_, call('descer', [menos1('n')])])]), call('descer', [2]), ENT], { guia: 'Acompanhe o valor de n a cada chamada: 2, 1, 0. No 0 a função não chama mais.' });
  M(13, 'r', 'Ida e volta', '4x3', [0, 0], [recVai, call('vai', [2]), D_, ENT]);
  M(13, 'p', 'Quantos passos?', '6x3', [0, 0], [recAndar, call('andar', [4]), D_]);
  M(13, 'r', 'Entrega na ida', '4x1', [0, 0], [def('rua', ['n'], [se(gt(V('n'), 0), [R_, ENT, call('rua', [menos1('n')])])]), call('rua', [3])]);
  M(13, 'd', 'Parou antes', '6x1', [0, 0], [recAndar, call('andar', [4]), ENT], { bug: { n: 2, v: 2 }, alvo: 'a casa' });
  M(13, 'r', 'Entrega na volta', '3x1', [0, 0], [def('vai', ['n'], [se(gt(V('n'), 0), [R_, call('vai', [menos1('n')]), L_, ENT])]), call('vai', [2])]);
  M(13, 'p', 'Soma recursiva', '3x1', [0, 0], [def('soma', ['n'], [se(B('=', V('n'), 0), [ret(0)]), ret(mais(V('n'), FC('soma', [menos1('n')])))]), set('r', FC('soma', [3]))], { soVar: true, predictVar: 'r' });
  M(13, 'r', 'Escada recursiva', '4x4', [0, 0], [def('escada', ['n'], [se(gt(V('n'), 0), [R_, D_, call('escada', [menos1('n')])])]), call('escada', [3]), ENT]);
  M(13, 'd', 'Sem fim', '5x1', [0, 0], [recAndar, call('andar', [3]), ENT], { bug: { n: 1, v: 0 }, alvo: 'a casa' });
  M(13, 'e', 'O que este código faz?', '4x1', [0, 0], [recVai, call('vai', [3])],
    { opcoes: ['Anda 3 para a direita e depois volta 3 para a esquerda.', 'Anda 3 para a direita e fica lá.', 'Nunca para de andar.'] });
  M(13, 'r', 'Zigue-zague recursivo', '4x4', [0, 0], [def('zig', ['n'], [se(gt(V('n'), 0), [R_, D_, ENT, call('zig', [menos1('n')])])]), call('zig', [3])], { desafio: true });

  // ===== Marco 14 (bônus): grafos =====
  const ateParede = d => enq(LIVRE(d), [{ k: 'move', d }]);
  M(14, 'r', 'Esquinas e ruas', ['..#', '#..', '##.'], [0, 0], [R_, D_, R_, D_, ENT], { guia: 'Cada esquina é um vértice e cada rua é uma aresta. Os blocos escuros são paredes: ali não há rua.' });
  M(14, 'r', 'Tem rua para lá?', ['...#', '....', '....'], [0, 0], [ateParede('R'), D_, ENT], { guia: 'livre(→) pergunta se existe uma aresta para a direita. Ande enquanto existir.' });
  M(14, 'r', 'A rota é uma lista', ['..#.', '#.#.', '#...'], [0, 0], [set('rota', LS(['→', '↓', '↓', '→'])), cada('p', V('rota'), [mvx(V('p'))]), ENT]);
  M(14, 'p', 'Quantas arestas no caminho?', ['...#', '##..', '####'], [0, 0], [set('rota', LS(['→', '→', '↓', '→'])), set('arestas', TAM(V('rota')))], { soVar: true, predictVar: 'arestas' });
  M(14, 'r', 'Seguir a parede', ['.###', '.###', '...#', '####'], [0, 0], [ateParede('D'), ateParede('R'), ENT]);
  M(14, 'd', 'Um passo a menos', ['...#', '##.#', '##.#'], [0, 0], [rep(2, [R_]), rep(2, [D_]), ENT], { bug: { n: 0, v: 1 }, alvo: 'a casa' });
  M(14, 'r', 'Contornar o quarteirão', ['.#..#', '.#..#', '....#'], [0, 0], [rep(2, [D_]), ateParede('R'), U_, ENT]);
  M(14, 'p', 'Até onde dá para ir?', ['...#', '##.#', '##.#', '####'], [0, 0], [ateParede('R'), ateParede('D')]);
  M(14, 'r', 'O caminho mais curto', ['.#.', '...', '.#.'], [0, 0], [set('curto', LS(['↓', '→', '→'])), cada('p', V('curto'), [mvx(V('p'))]), ENT, esc(TAM(V('curto')))]);
  M(14, 'd', 'Rota comprida demais', ['...##', '##.##', '#####'], [0, 0], [rep(2, [R_]), D_, ENT], { bug: { n: 0, v: 3 }, alvo: 'a casa' });
  M(14, 'e', 'O que este código faz?', ['...#', '....', '....'], [0, 0], [ateParede('R'), D_, ENT], { casas: true,
    opcoes: ['Anda para a direita até encontrar uma parede, desce e entrega.', 'Anda sempre 3 vezes para a direita.', 'Atravessa a parede e entrega.'] });
  M(14, 'r', 'Pontes completas', ['...#', '##.#', '#..#', '####'], [0, 0], [ateParede('R'), ateParede('D'), ateParede('L'), ENT], { desafio: true });

  // ===== Marco 15 (bônus): criptografia =====
  const RUA = ['0123456789', '..........', '..........'];
  const cifra = (m, ch) => B('%', mais(m, ch), 10);
  M(15, 'r', 'Deslocar', RUA, [2, 0], [set('chave', 3), rep(V('chave'), [R_]), D_, ENT], { guia: 'A mensagem é o número 2. Cifrar é andar chave casas para a direita. O número onde você para é o código.' });
  M(15, 'r', 'A rua dá a volta', RUA, [8, 0], [set('chave', 3), rep(V('chave'), [R_]), D_, ENT], { guia: 'Passou do 9? Volta ao 0. É isso que o resto da divisão por 10 faz.' });
  M(15, 'r', 'A fórmula', RUA, [0, 0], [set('m', 4), set('chave', 3), set('c', cifra(V('m'), V('chave'))), rep(V('c'), [R_]), D_, ENT]);
  M(15, 'p', 'Cifrar um número', RUA, [0, 0], [set('m', 8), set('chave', 5), set('c', cifra(V('m'), V('chave')))], { soVar: true, predictVar: 'c' });
  M(15, 'r', 'Decifrar é voltar', RUA, [5, 0], [set('chave', 3), rep(V('chave'), [L_]), D_, ENT]);
  M(15, 'd', 'Chave errada', RUA, [2, 0], [set('chave', 4), rep(V('chave'), [R_]), D_, ENT], { bug: { n: 0, v: 1 }, alvo: 'a casa' });
  M(15, 'r', 'Cifrar uma lista', RUA, [0, 0], [set('msg', LS([1, 2])), set('chave', 2), cada('m', V('msg'), [rep(mais(V('m'), V('chave')), [R_]), D_, ENT, U_])]);
  M(15, 'p', 'Decifrar um número', RUA, [0, 0], [set('c', 2), set('chave', 5), set('m', B('%', mais(menos(V('c'), V('chave')), 10), 10))], { soVar: true, predictVar: 'm' });
  M(15, 'r', 'Ida e volta da cifra', RUA, [3, 0], [set('chave', 4), rep(V('chave'), [R_]), D_, ENT, U_, rep(V('chave'), [L_]), D_, ENT]);
  M(15, 'd', 'Qual era a chave?', RUA, [7, 0], [set('chave', 6), rep(V('chave'), [R_]), D_, ENT], { bug: { n: 0, v: 2 }, alvo: 'a casa' });
  M(15, 'e', 'O que este código faz?', RUA, [0, 0], [set('m', 7), set('chave', 5), set('c', cifra(V('m'), V('chave')))],
    { opcoes: ['Soma a chave ao número e, se passar de 9, dá a volta.', 'Multiplica o número pela chave.', 'Apaga a mensagem.'] });
  M(15, 'r', 'Cofre completo', RUA, [0, 0], [def('cifrar', ['m', 'chave'], [ret(cifra(V('m'), V('chave')))]), set('c', FC('cifrar', [7, 5])), rep(V('c'), [R_]), D_, ENT], { desafio: true });

  // ===== Marco 16 (bônus): árvore de decisão =====
  const dir2 = [D_, R_], esq2 = [D_, L_];
  M(16, 'r', 'Uma pergunta', '5x3', [2, 0], [set('peso', 7), se(gt(V('peso'), 5), dir2, esq2), ENT], { guia: 'A árvore faz uma pergunta sobre o exemplo: o peso é maior que 5? A resposta decide o ramo.' });
  M(16, 'r', 'Duas perguntas', '5x3', [2, 0], [set('peso', 3), set('frágil', true), se(gt(V('peso'), 5), dir2, [...esq2, D_, se(V('frágil'), [L_], [R_])]), ENT], { guia: 'Depois da primeira pergunta vem outra. Cada casa no fim é uma folha: a classe do exemplo.' });
  M(16, 'r', 'Outro exemplo, outro caminho', '5x3', [2, 0], [set('peso', 3), set('frágil', false), se(gt(V('peso'), 5), dir2, [...esq2, D_, se(V('frágil'), [L_], [R_])]), ENT]);
  M(16, 'p', 'Classifique', '5x3', [2, 0], [set('peso', 8), set('urgente', false), se(gt(V('peso'), 5), [...dir2, D_, se(V('urgente'), [R_], [L_])], esq2)]);
  M(16, 'r', 'Vários exemplos', '3x1', [1, 0], [rep(3, [ler('peso'), se(gt(V('peso'), 4), [R_, ENT, L_], [L_, ENT, R_])])], { entrada: [6, 2, 5] });
  M(16, 'd', 'Treinar o limite', '3x1', [1, 0], [rep(3, [ler('peso'), se(gt(V('peso'), 4), [R_, ENT, L_], [L_, ENT, R_])])], { entrada: [7, 6, 2], bug: { n: 1, v: 8 }, alvo: 'as duas casas: o limite precisa separar os exemplos' });
  M(16, 'r', 'Árvore com três folhas', '5x3', [2, 0], [ler('idade'), se(lt(V('idade'), 3), esq2, [se(lt(V('idade'), 10), [D_], dir2)]), ENT], { entrada: [7] });
  M(16, 'p', 'Um exemplo novo', '5x3', [2, 0], [ler('idade'), se(lt(V('idade'), 3), esq2, [se(lt(V('idade'), 10), [D_], dir2)])], { entrada: [12] });
  M(16, 'r', 'A ordem das perguntas', '5x3', [2, 0], [set('urgente', true), set('peso', 2), se(V('urgente'), [...dir2, D_, se(gt(V('peso'), 5), [R_], [L_])], esq2), ENT]);
  M(16, 'd', 'Separar três grupos', '3x3', [1, 0], [rep(3, [ler('peso'), se(gt(V('peso'), 6), [R_, ENT, L_], [se(gt(V('peso'), 3), [D_, ENT, U_], [L_, ENT, R_])])])], { entrada: [8, 5, 2], bug: { n: 2, v: 5 }, alvo: 'as três casas: cada exemplo é de um grupo' });
  M(16, 'e', 'O que este código faz?', '5x3', [2, 0], [set('peso', 7), se(gt(V('peso'), 5), dir2, esq2), ENT], { casas: true,
    opcoes: ['Decide o ramo pelo peso: mais de 5 vai para a direita, senão para a esquerda.', 'Vai sempre para a direita.', 'Sorteia um dos lados.'] });
  M(16, 'r', 'Classificar com função', '4x1', [0, 0], [def('classe', ['peso'], [se(gt(V('peso'), 5), [ret(2)]), ret(1)]), ler('p'), rep(FC('classe', [V('p')]), [R_]), ENT], { entrada: [8], desafio: true });

  // ---------- acabamento: casas automáticas e erro plantado ----------
  // As casas são colocadas onde o código correto entrega. Assim o mapa nunca contradiz o código.
  // Os construtores reaproveitam objetos (R_, funções prontas); cada missão ganha a sua cópia.
  MISSIONS.forEach(m => {
    m.code = clone(m.code);
    const certo = clone(m.code);
    if (m.modo === 'rastrear' || m.modo === 'depurar' || m.casas) {
      layout(certo);
      const t = simulate(m, certo, { anyDeliver: true });
      const linhas = m.map.map(r => [...r]);
      t.delivered.forEach(k => {
        const [cx, cy] = k.split(',').map(Number);
        if (linhas[cy][cx] !== '.' && linhas[cy][cx] !== 'H') throw new Error('Missão ' + m.id + ': entrega em calçada ocupada (' + k + ')');
        linhas[cy][cx] = 'H';
      });
      m.map = linhas.map(r => r.join(''));
    }
    if (m.bug) {
      m.certo = clone(m.code);
      const c = coletar(m.code);
      if (m.bug.n !== undefined) c.nums[m.bug.n].v = m.bug.v; else c.moves[m.bug.m].d = m.bug.d;
    }
    delete m.bug; delete m.casas;
  });

  const dados = { MARCOS, MISSIONS };
  if (typeof module !== 'undefined') module.exports = dados; else raiz.RoadBitDados = dados;
})(typeof window !== 'undefined' ? window : globalThis);
