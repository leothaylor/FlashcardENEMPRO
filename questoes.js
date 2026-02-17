<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Flashcard ENEM - Versão Enxuta</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  
  <script src="questoes.js"></script>

  <style>
    :root {
      --bg0: #070b12;
      --bg1: #0a1220;
      --card: #0c172a;
      --border: rgba(255,255,255,.08);
      --border-glow: rgba(96,165,250,.4);
      --txt: #eaf0ff;
      --muted: rgba(234,240,255,.60);
      --accent: #60a5fa;
      --good: #22c55e;
      --bad: #ef4444;
      --hard: #f59e0b;
      --radius: 18px;
      --shadow: 0 18px 80px rgba(0,0,0,.55);
      --glow: 0 0 20px rgba(96,165,250,.15);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    
    body {
      font-family: 'Inter', sans-serif;
      color: var(--txt);
      background: linear-gradient(180deg, var(--bg0), var(--bg1));
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      overflow-x: hidden;
    }

    .app {
      width: min(860px, 100%);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Topo e Seleção */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 16px 20px;
      background: rgba(255,255,255,.03);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      backdrop-filter: blur(10px);
    }
    
    .header h1 {
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    select {
      background: rgba(0,0,0,.3);
      border: 1px solid var(--border);
      color: var(--txt);
      padding: 10px 14px;
      border-radius: 10px;
      font-family: inherit;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      width: 100%;
      max-width: 300px;
    }

    /* Progresso e Status */
    .progress-container {
      background: rgba(255,255,255,.03);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .stats-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      color: var(--muted);
      flex-wrap: wrap;
      gap: 10px;
    }

    .stats-row span b { color: var(--txt); }
    .stats-row .hard-count { color: var(--hard); }
    .stats-row .good-count { color: var(--good); }
    .stats-row .bad-count { color: var(--bad); }

    .progress-bar {
      height: 8px;
      background: rgba(0,0,0,.4);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent);
      width: 0%;
      transition: width 0.3s ease;
    }

    /* Flashcard Central */
    .flashcard {
      background: var(--card);
      border: 1px solid var(--border-glow);
      border-radius: var(--radius);
      box-shadow: var(--shadow), var(--glow);
      min-height: 450px;
      max-height: 75vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .card-header {
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 700;
      color: var(--muted);
      flex-shrink: 0;
    }

    .card-body {
      padding: 24px 20px;
      flex: 1;
      overflow-y: auto;
      font-size: 15px;
      line-height: 1.6;
    }

    .card-body::-webkit-scrollbar { width: 8px; }
    .card-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }

    .question-text {
      white-space: pre-wrap;
      margin-bottom: 20px;
    }

    /* Alternativas */
    .alts {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .alt {
      background: rgba(255,255,255,.02);
      border: 1px solid var(--border);
      padding: 12px 16px;
      border-radius: 12px;
      display: flex;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      align-items: flex-start;
    }

    .alt:hover:not(.locked) {
      background: rgba(255,255,255,.05);
      border-color: rgba(255,255,255,.2);
    }

    .alt .key {
      font-weight: 800;
      color: var(--muted);
      min-width: 24px;
    }

    .alt.selected {
      background: rgba(96,165,250,.15);
      border-color: var(--accent);
    }
    .alt.selected .key { color: var(--accent); }

    .alt.correct {
      background: rgba(34,197,94,.15) !important;
      border-color: var(--good) !important;
    }
    .alt.correct .key { color: var(--good); }

    .alt.wrong {
      background: rgba(239,68,68,.15) !important;
      border-color: var(--bad) !important;
      opacity: 0.7;
    }
    .alt.wrong .key { color: var(--bad); }

    .alt.locked { cursor: default; }

    .feedback-box {
      margin-top: 24px;
      padding: 16px;
      background: rgba(0,0,0,.2);
      border-radius: 12px;
      border-left: 4px solid var(--accent);
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Controles (Layout adaptado para iPhone) */
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 16px 20px;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,.1);
      border-bottom-left-radius: var(--radius);
      border-bottom-right-radius: var(--radius);
      flex-shrink: 0;
    }

    .btn {
      background: rgba(255,255,255,.05);
      border: 1px solid var(--border);
      color: var(--txt);
      padding: 12px 16px;
      border-radius: 12px;
      font-family: inherit;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s ease;
      flex: 1 1 auto; 
      text-align: center;
    }

    .btn-main { flex-basis: 100%; }

    .btn:hover { background: rgba(255,255,255,.1); }
    .btn:active { transform: translateY(2px); }
    
    .btn.primary { background: rgba(96,165,250,.15); border-color: var(--accent); color: var(--accent); }
    .btn.primary:hover { background: rgba(96,165,250,.25); }

    .btn.hard { border-color: rgba(245,158,11,.4); color: #fbbf24; }
    .btn.hard.active { background: rgba(245,158,11,.2); border-color: var(--hard); }

    .utility-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }

    /* Modal de Exportação para o celular (Resolve o bloqueio do WhatsApp) */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(5px);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      overflow-y: auto;
    }
    .modal-overlay.hidden {
      display: none;
    }
    .modal-content {
      background: var(--bg1);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      width: 100%;
      max-width: 600px;
      padding: 20px;
      text-align: center;
    }
    .modal-content img {
      max-width: 100%;
      border-radius: 12px;
      border: 1px solid var(--border-glow);
      margin-bottom: 20px;
    }

  </style>
</head>
<body>

  <div class="app">
    
    <div class="header">
      <h1>🧠 Flashcard ENEM</h1>
      <select id="deckSelector"></select>
    </div>

    <div class="progress-container">
      <div class="stats-row">
        <span>Progresso: <b id="uiProgress">0 / 0</b></span>
        <span>Revisados: <b id="uiReviewed">0</b></span>
        <span class="good-count">Acertos: <b id="uiHits">0</b></span>
        <span class="bad-count">Erros: <b id="uiMisses">0</b></span>
        <span class="hard-count">🔥 Difíceis: <b id="uiHardCount">0</b></span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" id="uiProgressBar"></div>
      </div>
    </div>

    <div class="flashcard">
      <div class="card-header">
        <span id="uiCardId">ID: —</span>
        <span id="uiCardSide">Frente (Pergunta)</span>
      </div>
      
      <div class="card-body" id="uiCardContent">
        Carregando... Verifique se o arquivo questoes.js está na mesma pasta.
      </div>

      <div class="controls">
        <button class="btn" id="btnPrev">⬅️ Anterior</button>
        <button class="btn hard" id="btnHard">🔥 Difícil</button>
        <button class="btn" id="btnNext">Próximo ➡️</button>
        <button class="btn primary btn-main" id="btnFlip">R — Mostrar Resposta</button>
      </div>
    </div>

    <div class="utility-bar">
      <button class="btn" id="btnShuffle">🔀 Embaralhar</button>
      <button class="btn" id="btnReviewHards">🔥 Revisar Apenas Difíceis</button>
      <button class="btn" id="btnRestart">🔄 Reiniciar Sessão</button>
      <button class="btn" id="btnExport">⬇️ Exportar Estudo Geral</button>
    </div>

  </div>

  <div id="exportModal" class="modal-overlay hidden">
    <div class="modal-content">
      <h3 style="margin-bottom: 10px; color: var(--accent);">Relatório Gerado com Sucesso!</h3>
      <p style="font-size: 14px; color: var(--muted); margin-bottom: 20px;">
        Pressione e segure a imagem abaixo para <b>Salvar</b> ou <b>Compartilhar</b>.
      </p>
      <img id="exportedImage" src="" alt="Relatório de Estudo" />
      <button id="btnCloseModal" class="btn primary btn-main">Voltar aos Estudos</button>
    </div>
  </div>

  <script>
    /* =========================================================
       1. ESTADO GLOBAL DA SESSÃO
       ========================================================= */
    let currentDeckName = "";
    let deckCards = [];
    let currentIndex = 0;
    
    let isFlipped = false;
    let selectedAnswer = null; 
    
    let reviewedCards = new Set();
    let hardCards = new Set();
    let scoredCards = new Set(); 
    let sessionHits = 0;
    let sessionMisses = 0;

    /* =========================================================
       2. ELEMENTOS DA UI
       ========================================================= */
    const els = {
      deckSelector: document.getElementById('deckSelector'),
      uiProgress: document.getElementById('uiProgress'),
      uiReviewed: document.getElementById('uiReviewed'),
      uiHits: document.getElementById('uiHits'),
      uiMisses: document.getElementById('uiMisses'),
      uiHardCount: document.getElementById('uiHardCount'),
      uiProgressBar: document.getElementById('uiProgressBar'),
      
      uiCardId: document.getElementById('uiCardId'),
      uiCardSide: document.getElementById('uiCardSide'),
      uiCardContent: document.getElementById('uiCardContent'),
      
      btnPrev: document.getElementById('btnPrev'),
      btnFlip: document.getElementById('btnFlip'),
      btnHard: document.getElementById('btnHard'),
      btnNext: document.getElementById('btnNext'),
      btnShuffle: document.getElementById('btnShuffle'),
      btnReviewHards: document.getElementById('btnReviewHards'),
      btnRestart: document.getElementById('btnRestart'),
      btnExport: document.getElementById('btnExport'),

      exportModal: document.getElementById('exportModal'),
      exportedImage: document.getElementById('exportedImage'),
      btnCloseModal: document.getElementById('btnCloseModal')
    };

    /* =========================================================
       3. LÓGICA DE NAVEGAÇÃO E RENDERIZAÇÃO
       ========================================================= */
    function init() {
      if (typeof DATABASE === 'undefined') {
        els.uiCardContent.innerHTML = "<b style='color:var(--bad)'>ERRO:</b> O arquivo <code>questoes.js</code> não foi encontrado.";
        return;
      }

      els.deckSelector.innerHTML = "";
      Object.keys(DATABASE).forEach(deck => {
        const opt = document.createElement('option');
        opt.value = deck;
        opt.textContent = deck;
        els.deckSelector.appendChild(opt);
      });

      loadDeck(els.deckSelector.value);

      els.deckSelector.addEventListener('change', (e) => loadDeck(e.target.value));
      els.btnFlip.addEventListener('click', toggleFlip);
      els.btnPrev.addEventListener('click', () => navigate(-1));
      els.btnNext.addEventListener('click', () => navigate(1));
      els.btnHard.addEventListener('click', toggleHard);
      els.btnShuffle.addEventListener('click', shuffleDeck);
      els.btnRestart.addEventListener('click', resetSessionCompleta);
      els.btnReviewHards.addEventListener('click', startHardReview);
      els.btnExport.addEventListener('click', exportResultPNG);
      els.btnCloseModal.addEventListener('click', () => els.exportModal.classList.add('hidden'));

      document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'r') { e.preventDefault(); toggleFlip(); }
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'ArrowLeft') navigate(-1);
      });
    }

    function loadDeck(deckName, customCardsArray = null) {
      currentDeckName = deckName;
      deckCards = customCardsArray ? [...customCardsArray] : [...DATABASE[deckName]];
      
      currentIndex = 0;
      resetCardState();
      renderCard();
    }

    function resetSessionCompleta() {
      if(!confirm("Tem certeza que deseja zerar os acertos, erros e cards revisados desta sessão?")) return;
      
      reviewedCards.clear();
      hardCards.clear();
      scoredCards.clear();
      sessionHits = 0;
      sessionMisses = 0;
      
      let baseDeck = currentDeckName.replace(' (Revisão)', '');
      els.deckSelector.value = baseDeck;
      loadDeck(baseDeck);
    }

    function resetCardState() {
      isFlipped = false;
      selectedAnswer = null;
    }

    window.selectAlt = function(letter) {
      if (isFlipped) return; 
      selectedAnswer = letter;
      renderCard();
    };

    function renderCard() {
      if (deckCards.length === 0) {
        els.uiCardContent.innerHTML = "Nenhum card disponível neste deck/seleção.";
        els.uiCardId.textContent = "—";
        updateProgress();
        return;
      }

      const card = deckCards[currentIndex];
      
      els.uiCardId.textContent = `Card: ${card.id}`;
      els.btnHard.classList.toggle('active', hardCards.has(card.id));

      els.uiCardSide.textContent = isFlipped ? "Verso (Resposta)" : "Frente (Pergunta)";
      els.btnFlip.textContent = isFlipped ? "R — Ocultar Resposta" : "R — Mostrar Resposta";

      let html = `<div class="question-text">${card.text}</div>`;
      
      if (card.alts && card.alts.length > 0) {
        html += `<div class="alts">`;
        const keys = ["A","B","C","D","E"];
        
        card.alts.forEach((alt, i) => {
          const key = keys[i];
          let classes = "alt";
          let clickAttr = `onclick="selectAlt('${key}')"`;

          if (!isFlipped) {
            if (selectedAnswer === key) classes += " selected";
          } else {
            classes += " locked";
            clickAttr = ""; 
            
            if (key === card.answer) {
              classes += " correct";
            } else if (selectedAnswer === key) {
              classes += " wrong";
            }
          }

          html += `<div class="${classes}" ${clickAttr}><span class="key">${key})</span><span>${alt}</span></div>`;
        });
        html += `</div>`;
      }

      if (isFlipped) {
        html += `
          <div class="feedback-box">
            <div style="font-weight: 800; color: var(--accent); margin-bottom: 8px;">Gabarito Correto: ${card.answer}</div>
            ${card.comment ? `<div style="font-size: 14px; color: var(--txt);">${card.comment}</div>` : ''}
          </div>
        `;
      }

      els.uiCardContent.innerHTML = html;
      updateProgress();
    }

    function toggleFlip() {
      if (deckCards.length === 0) return;
      const card = deckCards[currentIndex];

      if (!isFlipped && selectedAnswer && !scoredCards.has(card.id)) {
        if (selectedAnswer === card.answer) sessionHits++;
        else sessionMisses++;
        
        scoredCards.add(card.id);
        reviewedCards.add(card.id); 
      } else if (!isFlipped && !selectedAnswer) {
        reviewedCards.add(card.id);
      }

      isFlipped = !isFlipped;
      renderCard();
    }

    function navigate(delta) {
      if (deckCards.length === 0) return;
      currentIndex += delta;
      
      if (currentIndex >= deckCards.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = deckCards.length - 1;
      
      resetCardState();
      renderCard();
    }

    function toggleHard() {
      if (deckCards.length === 0) return;
      const cardId = deckCards[currentIndex].id;
      
      if (hardCards.has(cardId)) hardCards.delete(cardId);
      else hardCards.add(cardId);
      
      renderCard();
    }

    function updateProgress() {
      const total = deckCards.length;
      const current = total > 0 ? currentIndex + 1 : 0;
      const pct = total > 0 ? (current / total) * 100 : 0;

      els.uiProgress.textContent = `${current} / ${total}`;
      els.uiReviewed.textContent = reviewedCards.size;
      els.uiHits.textContent = sessionHits;
      els.uiMisses.textContent = sessionMisses;
      els.uiHardCount.textContent = hardCards.size;
      els.uiProgressBar.style.width = `${pct}%`;
    }

    function shuffleDeck() {
      if (deckCards.length === 0) return;
      for (let i = deckCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deckCards[i], deckCards[j]] = [deckCards[j], deckCards[i]];
      }
      currentIndex = 0;
      resetCardState();
      renderCard();
    }

    function startHardReview() {
      if (hardCards.size === 0) {
        alert("Nenhum card marcado como difícil nesta sessão.");
        return;
      }
      
      let baseDeck = currentDeckName.replace(' (Revisão)', '');
      const hardsArray = DATABASE[baseDeck].filter(c => hardCards.has(c.id));
      
      if(hardsArray.length > 0){
        loadDeck(baseDeck + " (Revisão)", hardsArray);
      } else {
        alert("As questões difíceis pertencem a outra matéria. Volte à matéria correta para revisá-las.");
      }
    }

    /* =========================================================
       4. EXPORTAÇÃO ESTRUTURADA E SEGURA PARA CELULAR
       ========================================================= */
    async function exportResultPNG() {
      if (reviewedCards.size === 0) {
        alert("Você precisa estudar pelo menos 1 card para exportar.");
        return;
      }
      
      const now = new Date();
      const dateStr = now.toLocaleDateString() + " às " + now.toLocaleTimeString();
      const totalAns = sessionHits + sessionMisses;
      const accuracy = totalAns > 0 ? Math.round((sessionHits / totalAns) * 100) : 0;

      // Cria a caixa de renderização fora da tela
      const box = document.createElement('div');
      box.style.position = 'absolute';
      box.style.left = '-9999px';
      box.style.top = '0';
      box.style.background = '#070b12'; 
      box.style.color = '#eaf0ff';
      box.style.padding = '40px';
      box.style.fontFamily = 'Inter, sans-serif';
      box.style.width = '800px';

      let htmlContent = `
        <div style="border-bottom: 2px solid rgba(96,165,250,0.3); padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="margin: 0 0 10px 0; color: #60a5fa; font-size: 28px;">🧠 Relatório de Estudo</h2>
          <p style="margin: 0; opacity: 0.7; font-size: 16px;">${dateStr}</p>
        </div>
        
        <div style="display: flex; gap: 20px; margin-bottom: 40px;">
            <div style="flex: 1; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); padding: 20px; border-radius: 12px; text-align: center;">
                <div style="font-size: 14px; color: #22c55e; font-weight: 700; text-transform: uppercase;">Acertos</div>
                <div style="font-size: 36px; font-weight: 800; color: #fff;">${sessionHits}</div>
            </div>
            <div style="flex: 1; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); padding: 20px; border-radius: 12px; text-align: center;">
                <div style="font-size: 14px; color: #ef4444; font-weight: 700; text-transform: uppercase;">Erros</div>
                <div style="font-size: 36px; font-weight: 800; color: #fff;">${sessionMisses}</div>
            </div>
            <div style="flex: 1; background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.3); padding: 20px; border-radius: 12px; text-align: center;">
                <div style="font-size: 14px; color: #60a5fa; font-weight: 700; text-transform: uppercase;">Precisão</div>
                <div style="font-size: 36px; font-weight: 800; color: #fff;">${accuracy}%</div>
            </div>
        </div>

        <h3 style="font-size: 22px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Questões Revisadas (${reviewedCards.size})</h3>
        <div style="display: flex; flex-direction: column; gap: 30px;">
      `;

      let cardsToExport = [];
      reviewedCards.forEach(cardId => {
        for(let deck in DATABASE) {
            let foundCard = DATABASE[deck].find(c => c.id === cardId);
            if(foundCard) {
                cardsToExport.push({ deckName: deck, data: foundCard });
                break; 
            }
        }
      });

      cardsToExport.forEach(item => {
        let isHard = hardCards.has(item.data.id);
        let idx = ['A','B','C','D','E'].indexOf(item.data.answer);
        let answerText = (idx !== -1 && item.data.alts) ? item.data.alts[idx] : 'Resposta indisponível';

        htmlContent += `
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); padding: 24px; border-radius: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; font-weight: bold; color: rgba(255,255,255,0.5);">
              <span>ID: ${item.data.id} | Matéria: ${item.deckName}</span>
              ${isHard ? '<span style="color: #f59e0b;">🔥 Marcada como Difícil</span>' : ''}
            </div>
            
            <div style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; white-space: pre-wrap;">${item.data.text}</div>
            
            <div style="background: rgba(34,197,94,0.1); border-left: 4px solid #22c55e; padding: 16px; border-radius: 8px;">
              <div style="font-weight: bold; color: #22c55e; margin-bottom: 8px;">Gabarito: ${item.data.answer}</div>
              <div style="font-size: 15px;">${answerText}</div>
              ${item.data.comment ? `<div style="margin-top: 12px; font-size: 14px; opacity: 0.8;"><strong>Comentário:</strong> ${item.data.comment}</div>` : ''}
            </div>
          </div>
        `;
      });

      htmlContent += `</div>`;
      box.innerHTML = htmlContent;

      document.body.appendChild(box);

      try {
        els.btnExport.textContent = "Gerando Imagem...";
        
        // Timeout garante que o navegador renderizou o box invisível antes de capturar
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const canvas = await html2canvas(box, { backgroundColor: '#070b12', scale: 1.2 });
        const dataUrl = canvas.toDataURL("image/png");
        
        // Exibe a imagem na Modal ao invés de forçar download que é bloqueado
        els.exportedImage.src = dataUrl;
        els.exportModal.classList.remove('hidden');

      } catch (err) {
        console.error("Erro ao gerar imagem:", err);
        alert("Ocorreu um erro ao exportar. Tente estudar menos questões por vez.");
      } finally {
        document.body.removeChild(box);
        els.btnExport.textContent = "⬇️ Exportar Estudo Geral";
      }
    }

    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
