/**
 * ============================================================================
 * TIPOS DE DADOS E VARIÁVEIS NA PROGRAMAÇÃO (PYTHON)
 * Script Vanilla JavaScript (ES6+) - Interatividade, Playground & Lightbox
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SCROLL PROGRESS BAR & NAVBAR SCROLL
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const btnTop = document.getElementById('btn-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active Section Tracking
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking any link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Back to Top button
  if (btnTop) {
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 2. MINI VALIDADOR INTERATIVO DE NOMES DE VARIÁVEIS (PYTHON)
  // --------------------------------------------------------------------------
  const varTesterInput = document.getElementById('var-tester-input');
  const varTesterResult = document.getElementById('var-tester-result');

  const pythonKeywords = new Set([
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
    'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
    'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
    'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
  ]);

  if (varTesterInput && varTesterResult) {
    varTesterInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();

      if (!val) {
        varTesterResult.innerHTML = '<span style="color: var(--text-dim);"><i class="fa-solid fa-keyboard"></i> Digite um identificador acima para validar...</span>';
        varTesterResult.style.background = 'transparent';
        varTesterResult.style.border = 'none';
        return;
      }

      // 1. Checa palavras reservadas
      if (pythonKeywords.has(val)) {
        varTesterResult.innerHTML = `<span style="color: var(--accent-red);"><i class="fa-solid fa-triangle-exclamation"></i> <strong>Inválido:</strong> '<code>${val}</code>' é uma palavra reservada (keyword) do Python!</span>`;
        varTesterResult.style.background = 'rgba(255, 82, 82, 0.12)';
        varTesterResult.style.border = '1px solid rgba(255, 82, 82, 0.4)';
        return;
      }

      // 2. Checa início com dígito
      if (/^[0-9]/.test(val)) {
        varTesterResult.innerHTML = `<span style="color: var(--accent-red);"><i class="fa-solid fa-circle-xmark"></i> <strong>SyntaxError:</strong> Variáveis não podem começar com números ('<code>${val}</code>').</span>`;
        varTesterResult.style.background = 'rgba(255, 82, 82, 0.12)';
        varTesterResult.style.border = '1px solid rgba(255, 82, 82, 0.4)';
        return;
      }

      // 3. Checa espaço
      if (/\s/.test(val)) {
        varTesterResult.innerHTML = `<span style="color: var(--accent-red);"><i class="fa-solid fa-circle-xmark"></i> <strong>SyntaxError:</strong> Nomes de variáveis não podem conter espaços. Use underline (<code>snake_case</code>).</span>`;
        varTesterResult.style.background = 'rgba(255, 82, 82, 0.12)';
        varTesterResult.style.border = '1px solid rgba(255, 82, 82, 0.4)';
        return;
      }

      // 4. Checa hífen
      if (val.includes('-')) {
        varTesterResult.innerHTML = `<span style="color: var(--accent-red);"><i class="fa-solid fa-circle-xmark"></i> <strong>SyntaxError:</strong> O hífen '<code>-</code>' é interpretado como operador de subtração! Use '<code>_</code>'.</span>`;
        varTesterResult.style.background = 'rgba(255, 82, 82, 0.12)';
        varTesterResult.style.border = '1px solid rgba(255, 82, 82, 0.4)';
        return;
      }

      // 5. Validação com regex oficial de identificador Python
      const validIdentifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
      if (validIdentifierRegex.test(val)) {
        let recommendation = 'Válido e segue a convenção snake_case!';
        if (val === val.toUpperCase() && val.length > 1) {
          recommendation = 'Válido! Em maiúsculas, convenciona-se para CONSTANTES no Python.';
        } else if (/[A-Z]/.test(val)) {
          recommendation = "Válido tecnicamente, mas no Python prefere-se 'snake_case' em vez de CamelCase para variáveis!";
        }

        varTesterResult.innerHTML = `<span style="color: var(--accent-green);"><i class="fa-solid fa-circle-check"></i> <strong>Identificador Válido!</strong> <code>${val}</code>. ${recommendation}</span>`;
        varTesterResult.style.background = 'rgba(0, 230, 118, 0.12)';
        varTesterResult.style.border = '1px solid rgba(0, 230, 118, 0.4)';
      } else {
        varTesterResult.innerHTML = `<span style="color: var(--accent-red);"><i class="fa-solid fa-circle-xmark"></i> <strong>Inválido:</strong> Contém caracteres especiais não permitidos (apenas letras, dígitos e _).</span>`;
        varTesterResult.style.background = 'rgba(255, 82, 82, 0.12)';
        varTesterResult.style.border = '1px solid rgba(255, 82, 82, 0.4)';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. ABAS / FILTROS DE TIPOS DE DADOS
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.tab-btn[data-filter]');
  const typeCards = document.querySelectorAll('.type-card[data-category]');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      typeCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. COMPARATIVO DE SINTAXE MULTI-LINGUAGEM
  // --------------------------------------------------------------------------
  const syntaxData = {
    int: {
      python: '# Inteiro em Python (tipagem dinâmica)\nx = 10\nprint(type(x))  # <class \'int\'>',
      javascript: '// Inteiro em JavaScript\nlet x = 10;\nconsole.log(typeof x); // "number"',
      java: '// Inteiro em Java (estaticamente tipado)\nint x = 10;\nSystem.out.println(x);',
      c: '/* Inteiro em C (32 bits com sinal) */\nint x = 10;\nprintf("%d\\n", x);',
      notes: 'No Python 3, inteiros têm precisão arbitrária ilimitada (bignum). Em C e Java, int tem limite de 32 bits (máx 2.147.483.647).'
    },
    float: {
      python: '# Decimal em Python (ponto flutuante)\npreco = 19.90\npi = 3.14159\nprint(type(preco)) # <class \'float\'>',
      javascript: '// Decimal em JS (IEEE 754 de 64 bits)\nlet preco = 19.90;\nlet pi = 3.14159;\nconsole.log(typeof preco);',
      java: '// Decimal em Java (float ou double)\ndouble preco = 19.90;\nfloat taxa = 2.5f;\nSystem.out.println(preco);',
      c: '/* Decimal em C */\nfloat preco = 19.90f;\ndouble pi = 3.1415926535;\nprintf("%.2f\\n", preco);',
      notes: 'Atenção com valores monetários! Ponto flutuante binário causa imprecisão (0.1 + 0.2 != 0.3). Use inteiros ou bibliotecas decimais.'
    },
    bool: {
      python: '# Booleano em Python (True/False maiúsculos)\nestudante = True\nativo = False\nprint(type(estudante)) # <class \'bool\'>',
      javascript: '// Booleano em JavaScript (minúsculos)\nlet estudante = true;\nlet ativo = false;\nconsole.log(typeof estudante);',
      java: '// Booleano em Java (tipo primitivo boolean)\nboolean estudante = true;\nboolean ativo = false;\nSystem.out.println(estudante);',
      c: '/* Booleano em C (requer stdbool.h no C99) */\n#include <stdbool.h>\nbool estudante = true;\nbool ativo = false;',
      notes: 'Em Python, True equivale numericamente a 1 e False a 0 (True + True resulta em 2).'
    },
    string: {
      python: '# String em Python (aspas simples ou duplas)\nmensagem = "Olá, mundo!"\ncidade = \'Palmas\'\nprint(f"{mensagem} de {cidade}")',
      javascript: '// String em JS (aspas simples, duplas ou crases)\nlet mensagem = "Olá, mundo!";\nlet cidade = \'Palmas\';\nconsole.log(`${mensagem} de ${cidade}`);',
      java: '// String em Java (objeto da classe String)\nString mensagem = "Olá, mundo!";\nString cidade = "Palmas";\nSystem.out.println(mensagem);',
      c: '/* String em C (vetor de char com terminador \\0) */\nchar mensagem[] = "Olá, mundo!";\nchar cidade[20] = "Palmas";\nprintf("%s\\n", mensagem);',
      notes: 'Em Python e Java, strings são IMUTÁVEIS na memória. Modificações geram um novo objeto na RAM.'
    },
    list: {
      python: '# Lista dinâmica em Python (vetor)\nnotas = [10, 20, 30]\nnotas.append(40)\nprint(notas[0])  # 10',
      javascript: '// Array dinâmico em JavaScript\nlet notas = [10, 20, 30];\nnotas.push(40);\nconsole.log(notas[0]); // 10',
      java: '// Lista em Java (ArrayList dinâmico)\nList<Integer> notas = new ArrayList<>();\nnotas.add(10);\nnotas.add(20);',
      c: '/* Vetor com tamanho fixo em C */\nint notas[3] = {10, 20, 30};\nprintf("%d\\n", notas[0]);',
      notes: 'Listas em Python podem conter múltiplos tipos misturados [10, "texto", True, 3.14] na mesma estrutura.'
    },
    dict: {
      python: '# Dicionário em Python (chave-valor)\naluno = {"nome": "Maria", "idade": 18}\nprint(aluno["nome"]) # "Maria"',
      javascript: '// Objeto literal em JavaScript (JSON)\nlet aluno = { nome: "Maria", idade: 18 };\nconsole.log(aluno.nome); // "Maria"',
      java: '// Map em Java (HashMap)\nMap<String, Object> aluno = new HashMap<>();\naluno.put("nome", "Maria");\naluno.put("idade", 18);',
      c: '/* Em C utiliza-se struct */\nstruct Aluno {\n    char nome[50];\n    int idade;\n};\nstruct Aluno a1 = {"Maria", 18};',
      notes: 'Dicionários em Python usam tabela hash, oferecendo acesso em tempo médio O(1) para qualquer chave.'
    }
  };

  const typeChips = document.querySelectorAll('.type-chip[data-type]');
  const codePython = document.getElementById('code-python');
  const codeJs = document.getElementById('code-js');
  const codeJava = document.getElementById('code-java');
  const codeC = document.getElementById('code-c');
  const syntaxNotes = document.getElementById('syntax-notes');

  function updateSyntaxDisplay(typeKey) {
    const data = syntaxData[typeKey];
    if (!data) return;

    if (codePython) codePython.textContent = data.python;
    if (codeJs) codeJs.textContent = data.javascript;
    if (codeJava) codeJava.textContent = data.java;
    if (codeC) codeC.textContent = data.c;
    if (syntaxNotes) syntaxNotes.textContent = data.notes;
  }

  typeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      typeChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const typeKey = chip.getAttribute('data-type');
      updateSyntaxDisplay(typeKey);
    });
  });

  // Copiar Código com Feedback Visual
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = targetEl.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('copied');
        }, 2000);
      }).catch((err) => {
        console.error('Falha ao copiar:', err);
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. MINI PLAYGROUND INTERATIVO EM PYTHON
  // --------------------------------------------------------------------------
  const btnRun = document.getElementById('btn-run');
  const btnReset = document.getElementById('btn-reset');
  const btnClearConsole = document.getElementById('btn-clear-console');
  const consoleOutput = document.getElementById('console-output');

  // Inputs interativos do playground
  const inputNome = document.getElementById('pg-nome');
  const inputIdade = document.getElementById('pg-idade');
  const inputAltura = document.getElementById('pg-altura');
  const inputEstudante = document.getElementById('pg-estudante');
  const inputOperacao = document.getElementById('pg-operacao');

  // Bloco de código visual
  const pgCodeDisplay = document.getElementById('pg-code-display');

  function updatePlaygroundCodeDisplay() {
    if (!pgCodeDisplay) return;

    const nome = inputNome ? inputNome.value : 'Pedro';
    const idade = inputIdade ? inputIdade.value : '18';
    const altura = inputAltura ? inputAltura.value : '1.70';
    const estudante = inputEstudante ? inputEstudante.value : 'True';
    const operacao = inputOperacao ? inputOperacao.value : '10 + 5';

    pgCodeDisplay.innerHTML = `
<span class="comment"># 1. Declaração inicial de variáveis (Cadastro):</span>
<span class="var">nome</span> = <span class="str">"${escapeHtml(nome)}"</span>
<span class="var">idade</span> = <span class="num">${escapeHtml(idade)}</span>
<span class="var">altura</span> = <span class="num">${escapeHtml(altura)}</span>
<span class="var">estudante</span> = <span class="bool">${escapeHtml(estudante)}</span>

<span class="comment"># 2. Operação matemática:</span>
<span class="var">soma</span> = <span class="num">${escapeHtml(operacao)}</span>

<span class="comment"># 3. Alteração dinâmica de valor da variável idade:</span>
<span class="var">idade</span> = <span class="num">${parseInt(idade, 10) + 1 || 19}</span>

<span class="comment"># 4. Impressões e inspeção dos tipos (type()):</span>
<span class="kw">print</span>(<span class="str">f"Nome: {nome} | Tipo: {type(nome).__name__}"</span>)
<span class="kw">print</span>(<span class="str">f"Idade atualizada: {idade} | Tipo: {type(idade).__name__}"</span>)
<span class="kw">print</span>(<span class="str">f"Altura: {altura} | Tipo: {type(altura).__name__}"</span>)
<span class="kw">print</span>(<span class="str">f"Estudante: {estudante} | Tipo: {type(estudante).__name__}"</span>)
<span class="kw">print</span>(<span class="str">f"${escapeHtml(operacao)} = {soma}"</span>)
    `.trim();
  }

  function executePlayground() {
    if (!consoleOutput) return;

    const nome = inputNome ? inputNome.value.trim() : 'Pedro';
    const rawIdade = inputIdade ? inputIdade.value.trim() : '18';
    const rawAltura = inputAltura ? inputAltura.value.trim() : '1.70';
    const rawEstudante = inputEstudante ? inputEstudante.value.trim() : 'True';
    const rawOperacao = inputOperacao ? inputOperacao.value.trim() : '10 + 5';

    // Determina tipos dinamicamente
    const idadeNum = parseInt(rawIdade, 10) || 18;
    const idadeNova = idadeNum + 1;
    const alturaNum = parseFloat(rawAltura) || 1.70;
    const estudanteBool = rawEstudante.toLowerCase() === 'true';

    // Avalia operação com segurança simples
    let resultadoSoma = 15;
    try {
      const sanitizedOp = rawOperacao.replace(/[^0-9+\-*/(). ]/g, '');
      // eslint-disable-next-line no-eval
      resultadoSoma = Function(`'use strict'; return (${sanitizedOp})`)();
    } catch {
      resultadoSoma = 15;
    }

    consoleOutput.innerHTML = `
<span class="console-prompt">&gt;&gt;&gt; python main.py</span>
<span style="color: var(--text-dim);">[Iniciando interpretador Python 3.14.7...]</span>

<span style="color: #fff;">Nome: </span><span style="color: var(--accent-cyan); font-weight: bold;">${escapeHtml(nome)}</span> <span style="color: var(--text-dim);">| Tipo: </span><span style="color: var(--accent-gold);">&lt;class 'str'&gt;</span>
<span style="color: #fff;">Idade atualizada: </span><span style="color: var(--accent-cyan); font-weight: bold;">${idadeNova}</span> <span style="color: var(--text-dim);">| Tipo: </span><span style="color: var(--accent-gold);">&lt;class 'int'&gt;</span>
<span style="color: #fff;">Altura: </span><span style="color: var(--accent-cyan); font-weight: bold;">${alturaNum.toFixed(2)}</span> <span style="color: var(--text-dim);">| Tipo: </span><span style="color: var(--accent-gold);">&lt;class 'float'&gt;</span>
<span style="color: #fff;">Estudante: </span><span style="color: var(--accent-cyan); font-weight: bold;">${estudanteBool ? 'True' : 'False'}</span> <span style="color: var(--text-dim);">| Tipo: </span><span style="color: var(--accent-gold);">&lt;class 'bool'&gt;</span>
<span style="color: #fff;">${escapeHtml(rawOperacao)} = </span><span style="color: var(--accent-green); font-weight: bold;">${resultadoSoma}</span> <span style="color: var(--text-dim);">| Tipo: </span><span style="color: var(--accent-gold);">&lt;class 'int'&gt;</span>

<div class="console-success">
  <i class="fa-solid fa-circle-check"></i> Process finished with exit code 0 (Executado com sucesso!)
</div>
    `.trim();

    // Scroll para o fim do terminal
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  // Ouvintes dos inputs do Playground
  [inputNome, inputIdade, inputAltura, inputEstudante, inputOperacao].forEach((inp) => {
    if (inp) {
      inp.addEventListener('input', () => {
        updatePlaygroundCodeDisplay();
      });
    }
  });

  if (btnRun) {
    btnRun.addEventListener('click', () => {
      btnRun.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executando...';
      setTimeout(() => {
        executePlayground();
        btnRun.innerHTML = '<i class="fa-solid fa-play"></i> Executar Código';
      }, 250);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (inputNome) inputNome.value = 'Pedro';
      if (inputIdade) inputIdade.value = '18';
      if (inputAltura) inputAltura.value = '1.70';
      if (inputEstudante) inputEstudante.value = 'True';
      if (inputOperacao) inputOperacao.value = '10 + 5';
      updatePlaygroundCodeDisplay();
      executePlayground();
    });
  }

  if (btnClearConsole && consoleOutput) {
    btnClearConsole.addEventListener('click', () => {
      consoleOutput.innerHTML = '<span class="console-prompt">&gt;&gt;&gt; </span><span style="color: var(--text-dim);">Terminal limpo. Clique em "Executar Código" para rodar o script novamente.</span>';
    });
  }

  // Botões "Testar no Console" dos Cards de Tipos
  const typeTestBtns = document.querySelectorAll('.type-test-btn');
  typeTestBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sample = btn.getAttribute('data-sample');
      const playgroundSection = document.getElementById('playground');

      if (sample && inputNome) {
        if (sample === 'int') {
          inputIdade.value = '42';
          inputOperacao.value = '100 * 2';
        } else if (sample === 'float') {
          inputAltura.value = '1.85';
          inputOperacao.value = '3.14 * 2';
        } else if (sample === 'bool') {
          inputEstudante.value = 'False';
        } else if (sample === 'string') {
          inputNome.value = 'Maria Fernanda';
        }
        updatePlaygroundCodeDisplay();
        executePlayground();
      }

      if (playgroundSection) {
        playgroundSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Inicializa displays
  updatePlaygroundCodeDisplay();
  executePlayground();

  // --------------------------------------------------------------------------
  // 6. MODAL LIGHTBOX AVANÇADO (ZOOM, DOWNLOAD & NAVEGAÇÃO ENTRE IMAGENS)
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxZoomVal = document.getElementById('lightbox-zoom-val');
  const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomReset = document.getElementById('btn-zoom-reset');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  // Catálogo com as 3 imagens do projeto
  const galleryItems = [
    {
      src: 'assets/images/variaveis-python.png',
      title: 'O que são Variáveis em Python? (Analogia da Caixa & Nomenclatura)',
      caption: 'Visualização da analogia da caixa etiquetada na memória, regras de nomenclatura PEP 8 e tipagem dinâmica.'
    },
    {
      src: 'assets/images/mapa-mental.jpg',
      title: 'Mapa Mental: Tipos de Dados na Programação',
      caption: 'Visão holística dos Tipos Primitivos, Tipos Compostos (Estruturados) e Outros Contextos (SQL e Data Science).'
    },
    {
      src: 'assets/images/cheat-sheet.jpg',
      title: 'Guia Rápido (Cheat Sheet) & As 3 Dicas de Ouro',
      caption: 'Resumo de sintaxe multi-linguagem (Python, JS, Java, C), aspas simples vs duplas, overflow e perigos de float.'
    }
  ];

  let currentIndex = 0;
  let currentZoom = 1;

  function setZoom(zoomLevel) {
    currentZoom = Math.min(Math.max(zoomLevel, 0.5), 3.0);
    if (lightboxImg) {
      lightboxImg.style.transform = `scale(${currentZoom})`;
    }
    if (lightboxZoomVal) {
      lightboxZoomVal.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) index = 0;
    currentIndex = index;
    const item = galleryItems[currentIndex];

    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxDownloadBtn) {
      lightboxDownloadBtn.href = item.src;
      lightboxDownloadBtn.setAttribute('download', item.src.split('/').pop());
    }

    setZoom(1);
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Impede rolagem de fundo
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      setZoom(1);
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  // Ouvintes de clique em todas as imagens que abrem o Lightbox
  const zoomTriggers = document.querySelectorAll('[data-lightbox-index]');
  zoomTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(trigger.getAttribute('data-lightbox-index'), 10) || 0;
      openLightbox(idx);
    });
  });

  // Controles do Lightbox
  if (btnCloseLightbox) btnCloseLightbox.addEventListener('click', closeLightbox);
  if (btnNext) btnNext.addEventListener('click', nextImage);
  if (btnPrev) btnPrev.addEventListener('click', prevImage);

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => setZoom(currentZoom + 0.25));
  }
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => setZoom(currentZoom - 0.25));
  }
  if (btnZoomReset) {
    btnZoomReset.addEventListener('click', () => setZoom(1));
  }

  // Fechar ao clicar fora da imagem
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-viewport')) {
        closeLightbox();
      }
    });
  }

  // Zoom com a roda do mouse dentro do viewport do Lightbox
  const lightboxViewport = document.querySelector('.lightbox-viewport');
  if (lightboxViewport) {
    lightboxViewport.addEventListener('wheel', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoom(currentZoom + 0.15);
      } else {
        setZoom(currentZoom - 0.15);
      }
    }, { passive: false });
  }

  // Atalhos de Teclado (ESC, Setas)
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === '+' || e.key === '=') {
      setZoom(currentZoom + 0.25);
    } else if (e.key === '-') {
      setZoom(currentZoom - 0.25);
    } else if (e.key === '0') {
      setZoom(1);
    }
  });

  // Utilitário de escape de HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
