const fs = require('fs');
const path = require('path');

const metricaCode = `
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(102951378, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
  });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/102951378" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
`;

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const absolutePath = path.join(directory, file);
    const stat = fs.statSync(absolutePath);

    if (stat.isDirectory()) {
      processDirectory(absolutePath);
    } else if (path.extname(file) === '.html') {
      processHtmlFile(absolutePath);
    }
  });
}

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверка на уже существующую метрику
  if (content.includes('Yandex.Metrika counter')) {
    console.log(`[Skipped] Метрика уже установлена в: ${filePath}`);
    return;
  }

  // Вставка перед </head>
  if (content.includes('</head>')) {
    content = content.replace(
      '</head>',
      metricaCode + '\n</head>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Success] Метрика добавлена в: ${filePath}`);
  } else {
    console.error(`[Error] Тег </head> не найден в: ${filePath}`);
  }
}

// Запуск из корня проекта
const rootDir = path.join(__dirname, '..');
processDirectory(rootDir);
