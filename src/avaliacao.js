// ===== RoadBit: questões do pré e pós-teste e das fichas de saída =====
// Cada questão guarda o programa como árvore do motor do jogo. O gerador (src/avaliacao-build.js)
// executa cada programa para conferir o gabarito: nas questões de rastrear e prever, a resposta certa
// precisa ser a saída real; nas de depurar, só a alternativa certa pode consertar o programa.
// Formas A e B são isomórficas: mesma estrutura, mesmo conceito e mesmo tipo de erro, com outros valores.
// Tipos: rastrear (dizer a saída), prever (valor final de uma variável), explicar (escolher a frase),
// depurar (escolher a mudança que conserta). Duas questões por marco principal, 24 por forma.

(function (raiz) {
  const E = typeof module !== 'undefined' ? require('./engine.js') : raiz.RoadBitMotor;
  const { T, V, B, LS, IX, REC, FLD, FC, rep, cada, se, enq, set, setx, esc, ler, def, call, ret, BO } = E;
  const mais = (n, v) => set(n, B('+', V(n), v));

  const MARCO = {
    1: ['Sequência', 'EF06CO02'], 2: ['Repetição', 'EF06CO02'], 3: ['Seleção: se e senão', 'EF06CO02'],
    4: ['Repetição com condição: enquanto', 'EF06CO02'], 5: ['Variáveis, tipos, entrada e saída', 'EF06CO01, EF06CO05'],
    6: ['Operadores, contador e acumulador', 'EF06CO03'], 7: ['Condições com variáveis', 'EF06CO02'],
    8: ['Laços aninhados', 'EF06CO02'], 9: ['Funções: decomposição e reúso', 'EF06CO04, EF07CO05'],
    10: ['Parâmetros e retorno', 'EF06CO06'], 11: ['Listas e registros', 'EF07CO01, EF08CO02'],
    12: ['Algoritmos sobre listas', 'EF08CO03']
  };
  const DEP = 'EF07CO02';

  // Enunciados padrão por tipo
  const PERG = {
    rastrear: 'O que aparece na saída, na ordem?',
    prever: v => 'Qual é o valor de ' + v + ' quando o programa termina?',
    explicar: 'Qual frase explica melhor o que o programa faz?',
    depurar: 'Qual mudança conserta o programa?'
  };

  // ---------- Forma A ----------
  const A = [
    { marco: 1, tipo: 'rastrear', code: [esc(T('pão')), esc(T('leite')), esc(T('pão')), esc(T('café'))],
      opcoes: ['pão, leite, pão, café', 'pão, leite, café', 'café, pão, leite, pão', 'pão, pão, leite, café'], certa: 0,
      nota: 'B: junta as repetições; C: lê de baixo para cima; D: agrupa iguais.' },
    { marco: 1, tipo: 'depurar', contexto: 'O programa deveria escrever, na ordem: acordar, escovar, sair.',
      code: [esc(T('escovar')), esc(T('acordar')), esc(T('sair'))], alvo: ['acordar', 'escovar', 'sair'],
      opcoes: [
        { t: 'Trocar a ordem das linhas 1 e 2.', code: [esc(T('acordar')), esc(T('escovar')), esc(T('sair'))] },
        { t: 'Trocar a ordem das linhas 2 e 3.', code: [esc(T('escovar')), esc(T('sair')), esc(T('acordar'))] },
        { t: 'Apagar a linha 1.', code: [esc(T('acordar')), esc(T('sair'))] },
        { t: 'Trocar a ordem das linhas 1 e 3.', code: [esc(T('sair')), esc(T('acordar')), esc(T('escovar'))] }], certa: 0 },
    { marco: 2, tipo: 'rastrear', code: [rep(3, [esc(T('olé'))]), esc(T('fim'))],
      opcoes: ['olé, olé, olé, fim', 'olé, fim, olé, fim, olé, fim', 'olé, olé, olé', 'olé, fim'], certa: 0,
      nota: 'B: repete também a linha que está fora do bloco.' },
    { marco: 2, tipo: 'explicar', code: [rep(4, [esc(T('*')), esc(T('-'))])],
      opcoes: ['Escreve o par "* -" quatro vezes seguidas.', 'Escreve quatro "*" e depois quatro "-".',
        'Escreve "*" e "-" uma vez só.', 'Escreve "*" quatro vezes e "-" uma vez.'], certa: 0,
      confere: ['*', '-', '*', '-', '*', '-', '*', '-'], nota: 'B: não percebe que o bloco inteiro se repete.' },
    { marco: 3, tipo: 'rastrear', code: [set('cor', T('verde')), se(B('=', V('cor'), T('laranja')), [esc(T('subir'))], [esc(T('seguir'))]), esc(T('entregar'))],
      opcoes: ['seguir, entregar', 'subir, entregar', 'subir, seguir, entregar', 'seguir'], certa: 0,
      nota: 'C: executa os dois blocos; D: esquece a linha depois do se.' },
    { marco: 3, tipo: 'depurar', contexto: 'O programa deveria escrever "casaco" quando a temperatura for menor que 15.',
      code: [set('temp', 10), se(B('>', V('temp'), 15), [esc(T('casaco'))], [esc(T('camiseta'))])], alvo: ['casaco'],
      opcoes: [
        { t: 'Trocar > por < na linha 2.', linha: [2, '<'], code: [set('temp', 10), se(B('<', V('temp'), 15), [esc(T('casaco'))], [esc(T('camiseta'))])] },
        { t: 'Trocar 10 por 15 na linha 1.', code: [set('temp', 15), se(B('>', V('temp'), 15), [esc(T('casaco'))], [esc(T('camiseta'))])] },
        { t: 'Trocar "casaco" por "camiseta" na linha 3.', code: [set('temp', 10), se(B('>', V('temp'), 15), [esc(T('camiseta'))], [esc(T('camiseta'))])] },
        { t: 'Apagar o senão e a linha 5.', code: [set('temp', 10), se(B('>', V('temp'), 15), [esc(T('casaco'))])] }], certa: 0,
      linhasOriginais: { 2: '>', 3: 'casaco', 5: 'camiseta' } },
    { marco: 4, tipo: 'prever', variavel: 'n', code: [set('n', 1), enq(B('<', V('n'), 20), [set('n', B('*', V('n'), 2))])],
      opcoes: ['32', '16', '20', '64'], certa: 0, nota: 'B: para antes de passar do limite; C: confunde o limite com o valor final.' },
    { marco: 4, tipo: 'explicar', code: [set('pacotes', 5), enq(B('>', V('pacotes'), 0), [esc(T('entrega')), set('pacotes', B('-', V('pacotes'), 1))])],
      opcoes: ['Escreve "entrega" 5 vezes e para quando acabam os pacotes.', 'Escreve "entrega" para sempre, sem parar.',
        'Escreve "entrega" uma vez só, porque 5 é maior que 0.', 'Escreve "entrega" 4 vezes.'], certa: 0,
      confere: ['entrega', 'entrega', 'entrega', 'entrega', 'entrega'], nota: 'C: trata o enquanto como se; D: erra a última volta.' },
    { marco: 5, tipo: 'rastrear', code: [set('a', 3), set('b', V('a')), set('a', 8), esc(V('b'))],
      opcoes: ['3', '8', 'a', '11'], certa: 0, nota: 'B: acha que b fica ligado a a, como uma fórmula.' },
    { marco: 5, tipo: 'rastrear', contexto: 'O programa recebe, na ordem, as entradas 4 e 6.', entrada: [4, 6],
      code: [ler('x'), ler('y'), esc(V('y')), esc(V('x'))],
      opcoes: ['6, 4', '4, 6', 'y, x', '10'], certa: 0, nota: 'B: escreve na ordem de leitura; C: escreve os nomes, não os valores.' },
    { marco: 6, tipo: 'prever', variavel: 'total', code: [set('total', 0), mais('total', 5), mais('total', 3), set('total', B('*', V('total'), 2))],
      opcoes: ['16', '11', '8', '13'], certa: 0, nota: 'B: faz 5 + 3 × 2; C: esquece a última linha.' },
    { marco: 6, tipo: 'explicar', code: [set('soma', 0), rep(3, [ler('n'), mais('soma', V('n'))]), esc(V('soma'))],
      opcoes: ['Lê três números e escreve a soma deles.', 'Lê um número e escreve o triplo dele.',
        'Escreve o último número lido.', 'Lê três números e escreve quantos foram lidos.'], certa: 0,
      nota: 'C: não percebe o acumulador; D: confunde acumulador com contador.' },
    { marco: 7, tipo: 'rastrear', code: [set('idade', 13), set('autorizado', BO(false)),
      se(B('e', B('≥', V('idade'), 12), V('autorizado')), [esc(T('entra'))], [esc(T('espera'))])],
      opcoes: ['espera', 'entra', 'entra, espera', 'Nada aparece.'], certa: 0, nota: 'B: lê o e como ou.' },
    { marco: 7, tipo: 'depurar', contexto: 'O programa deveria escrever "promoção" quando o produto custa menos de 10 OU quando é fim de semana.',
      code: [set('preco', 15), set('fimDeSemana', BO(true)), se(B('e', B('<', V('preco'), 10), V('fimDeSemana')), [esc(T('promoção'))])], alvo: ['promoção'],
      opcoes: [
        { t: 'Trocar e por ou na linha 3.', linha: [3, 'ou'], code: [set('preco', 15), set('fimDeSemana', BO(true)), se(B('ou', B('<', V('preco'), 10), V('fimDeSemana')), [esc(T('promoção'))])] },
        { t: 'Trocar verdadeiro por falso na linha 2.', code: [set('preco', 15), set('fimDeSemana', BO(false)), se(B('e', B('<', V('preco'), 10), V('fimDeSemana')), [esc(T('promoção'))])] },
        { t: 'Trocar 10 por 15 na linha 3.', code: [set('preco', 15), set('fimDeSemana', BO(true)), se(B('e', B('<', V('preco'), 15), V('fimDeSemana')), [esc(T('promoção'))])] },
        { t: 'Trocar 15 por 20 na linha 1.', code: [set('preco', 20), set('fimDeSemana', BO(true)), se(B('e', B('<', V('preco'), 10), V('fimDeSemana')), [esc(T('promoção'))])] }], certa: 0,
      linhasOriginais: { 1: '15', 2: 'verdadeiro', 3: ' e ' } },
    { marco: 8, tipo: 'prever', variavel: 'cont', code: [set('cont', 0), rep(3, [rep(4, [mais('cont', 1)])])],
      opcoes: ['12', '7', '4', '3'], certa: 0, nota: 'B: soma as voltas; C e D: conta só um dos laços.' },
    { marco: 8, tipo: 'explicar', code: [rep(3, [rep(2, [esc(V('i'))], 'j')], 'i')],
      opcoes: ['Escreve cada número de 1 a 3 duas vezes: 1, 1, 2, 2, 3, 3.', 'Escreve 1, 2, 3 duas vezes: 1, 2, 3, 1, 2, 3.',
        'Escreve 1, 2, 1, 2, 1, 2.', 'Escreve 1, 2, 3.'], certa: 0, confere: ['1', '1', '2', '2', '3', '3'],
      nota: 'B: inverte os laços; C: escreve j no lugar de i.' },
    { marco: 9, tipo: 'rastrear', code: [def('saudar', [], [esc(T('olá')), esc(T('tudo bem?'))]), esc(T('início')), call('saudar'), esc(T('fim'))],
      opcoes: ['início, olá, tudo bem?, fim', 'olá, tudo bem?, início, fim', 'início, fim', 'início, olá, tudo bem?, fim, olá, tudo bem?'], certa: 0,
      nota: 'B: executa a função onde ela foi escrita; C: ignora a chamada.' },
    { marco: 9, tipo: 'explicar', code: [def('degrau', [], [esc(T('direita')), esc(T('baixo'))]), rep(3, [call('degrau')])],
      opcoes: ['Usa a função degrau três vezes, e cada uso escreve "direita" e "baixo".', 'Escreve "direita" três vezes e depois "baixo" três vezes.',
        'Escreve "direita" e "baixo" uma vez só, porque a função foi escrita uma vez.', 'Não escreve nada, porque a função só foi escrita.'], certa: 0,
      confere: ['direita', 'baixo', 'direita', 'baixo', 'direita', 'baixo'] },
    { marco: 10, tipo: 'prever', variavel: 'x', code: [def('triplo', ['n'], [ret(B('*', V('n'), 3))]), set('x', B('+', FC('triplo', [2]), FC('triplo', [1])))],
      opcoes: ['9', '6', '7', '3'], certa: 0, nota: 'B: só a primeira chamada; C: soma 6 com o número 1, não com o triplo dele.' },
    { marco: 10, tipo: 'depurar', contexto: 'A função area deveria devolver a área de um retângulo (base vezes altura). area(3, 4) deveria valer 12.',
      code: [def('area', ['b', 'h'], [ret(B('+', V('b'), V('h')))]), esc(FC('area', [3, 4]))], alvo: ['12'],
      opcoes: [
        { t: 'Trocar + por * na linha 2.', linha: [2, '*'], code: [def('area', ['b', 'h'], [ret(B('*', V('b'), V('h')))]), esc(FC('area', [3, 4]))] },
        { t: 'Trocar 3 por 4 na linha 4.', code: [def('area', ['b', 'h'], [ret(B('+', V('b'), V('h')))]), esc(FC('area', [4, 4]))] },
        { t: 'Trocar 4 por 3 na linha 4.', code: [def('area', ['b', 'h'], [ret(B('+', V('b'), V('h')))]), esc(FC('area', [3, 3]))] },
        { t: 'Trocar b + h por h + b na linha 2.', code: [def('area', ['b', 'h'], [ret(B('+', V('h'), V('b')))]), esc(FC('area', [3, 4]))] }], certa: 0,
      linhasOriginais: { 2: '+', 4: 'area' } },
    { marco: 11, tipo: 'rastrear', code: [set('rota', LS([2, 5, 1])), esc(B('+', IX(V('rota'), 0), IX(V('rota'), 2)))],
      opcoes: ['3', '7', '6', '8'], certa: 0, nota: 'B: começa a contar as posições do 1.' },
    { marco: 11, tipo: 'rastrear', code: [set('notas', LS([6, 8, 5])), setx(IX(V('notas'), 2), B('+', IX(V('notas'), 2), 3)), esc(V('notas'))],
      opcoes: ['[6, 8, 8]', '[6, 11, 5]', '[9, 8, 5]', '[6, 8, 5]'], certa: 0, nota: 'B: posições a partir do 1; D: acha que a lista não muda.' },
    { marco: 12, tipo: 'explicar', code: [set('maior', 0), cada('n', LS([4, 9, 2, 7]), [se(B('>', V('n'), V('maior')), [set('maior', V('n'))])]), esc(V('maior'))],
      opcoes: ['Escreve o maior número da lista.', 'Escreve o último número da lista.', 'Escreve a soma dos números da lista.', 'Escreve quantos números são maiores que 0.'], certa: 0,
      confere: ['9'] },
    { marco: 12, tipo: 'depurar', contexto: 'O programa deveria contar quantas notas da lista são 6 ou mais. Ele deveria escrever 3.',
      code: [set('cont', 0), cada('n', LS([7, 4, 6, 9]), [se(B('>', V('n'), 6), [mais('cont', 1)])]), esc(V('cont'))], alvo: ['3'],
      opcoes: [
        { t: 'Trocar > por ≥ na linha 3.', linha: [3, '≥'], code: [set('cont', 0), cada('n', LS([7, 4, 6, 9]), [se(B('≥', V('n'), 6), [mais('cont', 1)])]), esc(V('cont'))] },
        { t: 'Trocar 1 por 2 na linha 4.', code: [set('cont', 0), cada('n', LS([7, 4, 6, 9]), [se(B('>', V('n'), 6), [mais('cont', 2)])]), esc(V('cont'))] },
        { t: 'Trocar 6 por 7 na linha 3.', code: [set('cont', 0), cada('n', LS([7, 4, 6, 9]), [se(B('>', V('n'), 7), [mais('cont', 1)])]), esc(V('cont'))] },
        { t: 'Trocar cont + 1 por cont + n na linha 4.', code: [set('cont', 0), cada('n', LS([7, 4, 6, 9]), [se(B('>', V('n'), 6), [mais('cont', V('n'))])]), esc(V('cont'))] }], certa: 0,
      linhasOriginais: { 3: '>', 4: '1' } }
  ];

  // ---------- Forma B (isomórfica à A) ----------
  const Bf = [
    { marco: 1, tipo: 'rastrear', code: [esc(T('lápis')), esc(T('caderno')), esc(T('lápis')), esc(T('régua'))],
      opcoes: ['lápis, caderno, lápis, régua', 'lápis, caderno, régua', 'régua, lápis, caderno, lápis', 'lápis, lápis, caderno, régua'], certa: 0 },
    { marco: 1, tipo: 'depurar', contexto: 'O programa deveria escrever, na ordem: chegar, sentar, estudar.',
      code: [esc(T('chegar')), esc(T('estudar')), esc(T('sentar'))], alvo: ['chegar', 'sentar', 'estudar'],
      opcoes: [
        { t: 'Trocar a ordem das linhas 2 e 3.', code: [esc(T('chegar')), esc(T('sentar')), esc(T('estudar'))] },
        { t: 'Trocar a ordem das linhas 1 e 2.', code: [esc(T('estudar')), esc(T('chegar')), esc(T('sentar'))] },
        { t: 'Apagar a linha 3.', code: [esc(T('chegar')), esc(T('estudar'))] },
        { t: 'Trocar a ordem das linhas 1 e 3.', code: [esc(T('sentar')), esc(T('estudar')), esc(T('chegar'))] }], certa: 0 },
    { marco: 2, tipo: 'rastrear', code: [rep(2, [esc(T('bum'))]), esc(T('pá'))],
      opcoes: ['bum, bum, pá', 'bum, pá, bum, pá', 'bum, bum', 'bum, pá'], certa: 0 },
    { marco: 2, tipo: 'explicar', code: [rep(3, [esc(T('+')), esc(T('='))])],
      opcoes: ['Escreve o par "+ =" três vezes seguidas.', 'Escreve três "+" e depois três "=".',
        'Escreve "+" e "=" uma vez só.', 'Escreve "+" três vezes e "=" uma vez.'], certa: 0, confere: ['+', '=', '+', '=', '+', '='] },
    { marco: 3, tipo: 'rastrear', code: [set('tempo', T('sol')), se(B('=', V('tempo'), T('chuva')), [esc(T('guarda-chuva'))], [esc(T('boné'))]), esc(T('sair'))],
      opcoes: ['boné, sair', 'guarda-chuva, sair', 'guarda-chuva, boné, sair', 'boné'], certa: 0 },
    { marco: 3, tipo: 'depurar', contexto: 'O programa deveria escrever "lanche" quando a fome for maior que 5.',
      code: [set('fome', 8), se(B('<', V('fome'), 5), [esc(T('lanche'))], [esc(T('esperar'))])], alvo: ['lanche'],
      opcoes: [
        { t: 'Trocar < por > na linha 2.', linha: [2, '>'], code: [set('fome', 8), se(B('>', V('fome'), 5), [esc(T('lanche'))], [esc(T('esperar'))])] },
        { t: 'Trocar 8 por 5 na linha 1.', code: [set('fome', 5), se(B('<', V('fome'), 5), [esc(T('lanche'))], [esc(T('esperar'))])] },
        { t: 'Trocar "lanche" por "esperar" na linha 3.', code: [set('fome', 8), se(B('<', V('fome'), 5), [esc(T('esperar'))], [esc(T('esperar'))])] },
        { t: 'Apagar o senão e a linha 5.', code: [set('fome', 8), se(B('<', V('fome'), 5), [esc(T('lanche'))])] }], certa: 0,
      linhasOriginais: { 2: '<', 3: 'lanche', 5: 'esperar' } },
    { marco: 4, tipo: 'prever', variavel: 'n', code: [set('n', 1), enq(B('<', V('n'), 30), [set('n', B('*', V('n'), 3))])],
      opcoes: ['81', '27', '30', '243'], certa: 0 },
    { marco: 4, tipo: 'explicar', code: [set('biscoitos', 4), enq(B('>', V('biscoitos'), 0), [esc(T('come')), set('biscoitos', B('-', V('biscoitos'), 1))])],
      opcoes: ['Escreve "come" 4 vezes e para quando acabam os biscoitos.', 'Escreve "come" para sempre, sem parar.',
        'Escreve "come" uma vez só, porque 4 é maior que 0.', 'Escreve "come" 3 vezes.'], certa: 0, confere: ['come', 'come', 'come', 'come'] },
    { marco: 5, tipo: 'rastrear', code: [set('x', 5), set('y', V('x')), set('x', 2), esc(V('y'))],
      opcoes: ['5', '2', 'x', '7'], certa: 0 },
    { marco: 5, tipo: 'rastrear', contexto: 'O programa recebe, na ordem, as entradas 7 e 3.', entrada: [7, 3],
      code: [ler('p'), ler('q'), esc(V('q')), esc(V('p'))],
      opcoes: ['3, 7', '7, 3', 'q, p', '10'], certa: 0 },
    { marco: 6, tipo: 'prever', variavel: 'total', code: [set('total', 0), mais('total', 4), mais('total', 2), set('total', B('*', V('total'), 3))],
      opcoes: ['18', '10', '6', '14'], certa: 0 },
    { marco: 6, tipo: 'explicar', code: [set('soma', 0), rep(4, [ler('n'), mais('soma', V('n'))]), esc(V('soma'))],
      opcoes: ['Lê quatro números e escreve a soma deles.', 'Lê um número e escreve o quádruplo dele.',
        'Escreve o último número lido.', 'Lê quatro números e escreve quantos foram lidos.'], certa: 0 },
    { marco: 7, tipo: 'rastrear', code: [set('altura', 140), set('acompanhado', BO(false)),
      se(B('e', B('≥', V('altura'), 120), V('acompanhado')), [esc(T('entra'))], [esc(T('espera'))])],
      opcoes: ['espera', 'entra', 'entra, espera', 'Nada aparece.'], certa: 0 },
    { marco: 7, tipo: 'depurar', contexto: 'O programa deveria escrever "frete grátis" quando a compra passa de 100 OU quando o cliente é sócio.',
      code: [set('compra', 80), set('socio', BO(true)), se(B('e', B('>', V('compra'), 100), V('socio')), [esc(T('frete grátis'))])], alvo: ['frete grátis'],
      opcoes: [
        { t: 'Trocar e por ou na linha 3.', linha: [3, 'ou'], code: [set('compra', 80), set('socio', BO(true)), se(B('ou', B('>', V('compra'), 100), V('socio')), [esc(T('frete grátis'))])] },
        { t: 'Trocar verdadeiro por falso na linha 2.', code: [set('compra', 80), set('socio', BO(false)), se(B('e', B('>', V('compra'), 100), V('socio')), [esc(T('frete grátis'))])] },
        { t: 'Trocar 100 por 80 na linha 3.', code: [set('compra', 80), set('socio', BO(true)), se(B('e', B('>', V('compra'), 80), V('socio')), [esc(T('frete grátis'))])] },
        { t: 'Trocar 80 por 90 na linha 1.', code: [set('compra', 90), set('socio', BO(true)), se(B('e', B('>', V('compra'), 100), V('socio')), [esc(T('frete grátis'))])] }], certa: 0,
      linhasOriginais: { 1: '80', 2: 'verdadeiro', 3: ' e ' } },
    { marco: 8, tipo: 'prever', variavel: 'cont', code: [set('cont', 0), rep(2, [rep(5, [mais('cont', 1)])])],
      opcoes: ['10', '7', '5', '2'], certa: 0 },
    { marco: 8, tipo: 'explicar', code: [rep(2, [rep(3, [esc(V('i'))], 'j')], 'i')],
      opcoes: ['Escreve cada número de 1 a 2 três vezes: 1, 1, 1, 2, 2, 2.', 'Escreve 1, 2 três vezes: 1, 2, 1, 2, 1, 2.',
        'Escreve 1, 2, 3, 1, 2, 3.', 'Escreve 1, 2.'], certa: 0, confere: ['1', '1', '1', '2', '2', '2'] },
    { marco: 9, tipo: 'rastrear', code: [def('avisar', [], [esc(T('atenção')), esc(T('degrau'))]), esc(T('entrada')), call('avisar'), esc(T('saída'))],
      opcoes: ['entrada, atenção, degrau, saída', 'atenção, degrau, entrada, saída', 'entrada, saída', 'entrada, atenção, degrau, saída, atenção, degrau'], certa: 0 },
    { marco: 9, tipo: 'explicar', code: [def('lado', [], [esc(T('frente')), esc(T('girar'))]), rep(4, [call('lado')])],
      opcoes: ['Usa a função lado quatro vezes, e cada uso escreve "frente" e "girar".', 'Escreve "frente" quatro vezes e depois "girar" quatro vezes.',
        'Escreve "frente" e "girar" uma vez só, porque a função foi escrita uma vez.', 'Não escreve nada, porque a função só foi escrita.'], certa: 0,
      confere: ['frente', 'girar', 'frente', 'girar', 'frente', 'girar', 'frente', 'girar'] },
    { marco: 10, tipo: 'prever', variavel: 'x', code: [def('dobro', ['n'], [ret(B('*', V('n'), 2))]), set('x', B('+', FC('dobro', [3]), FC('dobro', [1])))],
      opcoes: ['8', '6', '7', '4'], certa: 0 },
    { marco: 10, tipo: 'depurar', contexto: 'A função total deveria devolver o valor a pagar (preço vezes quantidade). total(5, 3) deveria valer 15.',
      code: [def('total', ['p', 'q'], [ret(B('+', V('p'), V('q')))]), esc(FC('total', [5, 3]))], alvo: ['15'],
      opcoes: [
        { t: 'Trocar + por * na linha 2.', linha: [2, '*'], code: [def('total', ['p', 'q'], [ret(B('*', V('p'), V('q')))]), esc(FC('total', [5, 3]))] },
        { t: 'Trocar 5 por 3 na linha 4.', code: [def('total', ['p', 'q'], [ret(B('+', V('p'), V('q')))]), esc(FC('total', [3, 3]))] },
        { t: 'Trocar 3 por 5 na linha 4.', code: [def('total', ['p', 'q'], [ret(B('+', V('p'), V('q')))]), esc(FC('total', [5, 5]))] },
        { t: 'Trocar p + q por q + p na linha 2.', code: [def('total', ['p', 'q'], [ret(B('+', V('q'), V('p')))]), esc(FC('total', [5, 3]))] }], certa: 0,
      linhasOriginais: { 2: '+', 4: 'total' } },
    { marco: 11, tipo: 'rastrear', code: [set('rota', LS([3, 6, 2])), esc(B('+', IX(V('rota'), 0), IX(V('rota'), 2)))],
      opcoes: ['5', '9', '8', '11'], certa: 0 },
    { marco: 11, tipo: 'rastrear', code: [set('pontos', LS([3, 7, 2])), setx(IX(V('pontos'), 1), B('+', IX(V('pontos'), 1), 4)), esc(V('pontos'))],
      opcoes: ['[3, 11, 2]', '[7, 7, 2]', '[3, 7, 6]', '[3, 7, 2]'], certa: 0 },
    { marco: 12, tipo: 'explicar', code: [set('menor', 100), cada('n', LS([6, 3, 8, 5]), [se(B('<', V('n'), V('menor')), [set('menor', V('n'))])]), esc(V('menor'))],
      opcoes: ['Escreve o menor número da lista.', 'Escreve o primeiro número da lista.', 'Escreve a soma dos números da lista.', 'Escreve quantos números são menores que 100.'], certa: 0,
      confere: ['3'] },
    { marco: 12, tipo: 'depurar', contexto: 'O programa deveria contar quantas idades da lista são 12 ou mais. Ele deveria escrever 3.',
      code: [set('cont', 0), cada('n', LS([15, 12, 9, 13]), [se(B('>', V('n'), 12), [mais('cont', 1)])]), esc(V('cont'))], alvo: ['3'],
      opcoes: [
        { t: 'Trocar > por ≥ na linha 3.', linha: [3, '≥'], code: [set('cont', 0), cada('n', LS([15, 12, 9, 13]), [se(B('≥', V('n'), 12), [mais('cont', 1)])]), esc(V('cont'))] },
        { t: 'Trocar 1 por 2 na linha 4.', code: [set('cont', 0), cada('n', LS([15, 12, 9, 13]), [se(B('>', V('n'), 12), [mais('cont', 2)])]), esc(V('cont'))] },
        { t: 'Trocar 12 por 13 na linha 3.', code: [set('cont', 0), cada('n', LS([15, 12, 9, 13]), [se(B('>', V('n'), 13), [mais('cont', 1)])]), esc(V('cont'))] },
        { t: 'Trocar cont + 1 por cont + n na linha 4.', code: [set('cont', 0), cada('n', LS([15, 12, 9, 13]), [se(B('>', V('n'), 12), [mais('cont', V('n'))])]), esc(V('cont'))] }], certa: 0,
      linhasOriginais: { 3: '>', 4: '1' } }
  ];

  // ---------- Fichas de saída: uma por marco, formativas, de resposta aberta ----------
  // q1: o estudante escreve a saída (conferida pelo motor). q2: pergunta curta com resposta esperada.
  const FICHAS = [
    { marco: 1, code: [esc(T('bom')), esc(T('dia')), esc(T('bom'))],
      q2: 'Se trocarmos a ordem das linhas 1 e 2, o que aparece?', r2: 'dia, bom, bom', r2code: [esc(T('dia')), esc(T('bom')), esc(T('bom'))] },
    { marco: 2, code: [rep(2, [esc(T('A')), esc(T('B'))]), esc(T('C'))],
      q2: 'Quantas vezes a linha 2 é executada?', r2: '2 vezes' },
    { marco: 3, code: [set('nota', 5), se(B('≥', V('nota'), 6), [esc(T('passou'))], [esc(T('recuperação'))])],
      q2: 'Dê um valor para nota que faça aparecer "passou".', r2: 'Qualquer valor igual ou maior que 6.' },
    { marco: 4, code: [set('n', 10), enq(B('>', V('n'), 0), [set('n', B('-', V('n'), 3)), esc(V('n'))])],
      q2: 'Quantas voltas o enquanto dá?', r2: '4 voltas (n vale 10, 7, 4 e 1 quando a condição é testada e dá sim).' },
    { marco: 5, code: [set('a', 2), set('b', 5), set('a', V('b')), set('b', V('a')), esc(V('a')), esc(V('b'))],
      q2: 'Por que os dois valores ficam iguais?', r2: 'Na linha 3, a recebe 5 e o 2 é apagado. Na linha 4, b recebe o valor atual de a, que já é 5.' },
    { marco: 6, code: [set('x', 17), esc(B('%', V('x'), 5)), esc(B('-', V('x'), B('*', 5, 2)))],
      q2: 'O que o operador % faz?', r2: 'Dá o resto da divisão: 17 dividido por 5 dá 3 e sobra 2.' },
    { marco: 7, code: [set('chuva', BO(true)), set('frio', BO(false)), se(B('ou', V('chuva'), V('frio')), [esc(T('casaco'))], [esc(T('camiseta'))])],
      q2: 'O que apareceria se a linha 3 usasse e no lugar de ou?', r2: 'camiseta',
      r2code: [set('chuva', BO(true)), set('frio', BO(false)), se(B('e', V('chuva'), V('frio')), [esc(T('casaco'))], [esc(T('camiseta'))])] },
    { marco: 8, code: [rep(2, [rep(3, [esc(T('*'))]), esc(T('|'))])],
      q2: 'Quantas estrelas (*) aparecem no total?', r2: '6' },
    { marco: 9, code: [def('pular', [], [esc(T('pula'))]), call('pular'), esc(T('anda')), call('pular')],
      q2: 'Quantas vezes a função pular é chamada?', r2: '2 vezes' },
    { marco: 10, code: [def('soma', ['a', 'b'], [ret(B('+', V('a'), V('b')))]), esc(B('*', FC('soma', [2, 3]), 2))],
      q2: 'Que valores os parâmetros a e b recebem?', r2: 'a recebe 2 e b recebe 3.' },
    { marco: 11, code: [set('c', REC({ nome: T('Rui'), idade: 12 })), set('l', LS([10, 20, 30])), esc(FLD(V('c'), 'nome')), esc(IX(V('l'), 2))],
      q2: 'Em que posição da lista l está o número 10?', r2: 'Na posição 0, a primeira.' },
    { marco: 12, code: [set('cont', 0), cada('n', LS([3, 8, 5, 10]), [se(B('=', B('%', V('n'), 2), 0), [mais('cont', 1)])]), esc(V('cont'))],
      q2: 'Em uma frase, o que o programa conta?', r2: 'Quantos números pares há na lista.' }
  ];

  const dados = { MARCO, DEP, PERG, A, B: Bf, FICHAS };
  if (typeof module !== 'undefined') module.exports = dados;
  else raiz.RoadBitAvaliacao = dados;
})(typeof window !== 'undefined' ? window : this);
