[index.html](https://github.com/user-attachments/files/32194800/index.html)
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quer sair comigo?</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Dancing+Script:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="petals-bg" id="petalsBg" aria-hidden="true"></div>

  <main class="desk">

    <section class="letter" id="letter">

      <div class="seal" aria-hidden="true">
        <svg viewBox="0 0 100 100" class="seal-heart">
          <path d="M50 78 C 20 58, 8 38, 22 24 C 33 13, 47 18, 50 32 C 53 18, 67 13, 78 24 C 92 38, 80 58, 50 78 Z"/>
        </svg>
      </div>

      <p class="letter-eyebrow">Para você,</p>

      <h1 class="letter-title">Quer sair comigo?</h1>

      <p class="letter-body" id="subtitle">prometo que vai ser legal.</p>

      <div class="signoff">
        <span>com carinho,</span>
        <span class="signature">alguém que gosta de você</span>
      </div>

      <div class="buttons" id="buttonsArea">
        <button id="yesBtn">Sim!</button>
      </div>

      <div id="result" role="status" aria-live="polite"></div>

    </section>

    <button id="noBtn" type="button">Não</button>

  </main>

  <script src="script.js"></script>
</body>
</html>
