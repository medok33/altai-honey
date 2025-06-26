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
  console.log(`🔍 Сканирую директорию: ${directory}`);
  
  try {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
      const absolutePath = path.join(directory, file);
      
      try {
        const stat = fs.statSync(absolutePath);

        if (stat.isDirectory()) {
          processDirectory(absolutePath);
        } else if (path.extname(file).toLowerCase() === '.html') {
          processHtmlFile(absolutePath);
        }
      } catch (statError) {
        console.error(`❌ Ошибка доступа к элементу: ${absolutePath}`, statError.message);
      }
    });
  } catch (readDirError) {
    console.error(`❌ Ошибка чтения директории: ${directory}`, readDirError.message);
  }
}

function processHtmlFile(filePath) {
  console.log(`📄 Обрабатываю файл: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('Yandex.Metrika counter')) {
      console.log(`⏩ Пропускаю (метрика уже установлена): ${filePath}`);
      return;
    }

    let modified = false;
    
    // Вариант 1: Вставка перед </head>
    if (content.includes('</head>')) {
      content = content.replace('</head>', metricaCode + '\n</head>');
      modified = true;
    } 
    // Вариант 2: Вставка перед </body> если </head> отсутствует
    else if (content.includes('</body>')) {
      content = content.replace('</body>', metricaCode + '\n</body>');
      modified = true;
    }
    // Вариант 3: Добавление в конец файла
    else {
      content += '\n' + metricaCode;
      modified = true;
      console.warn(`⚠️ Вставка в конец файла (отсутствуют теги): ${filePath}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Успешно добавлено: ${filePath}`);
    } else {
      console.error(`❌ Не удалось найти место для вставки: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Критическая ошибка обработки: ${filePath}`, error.message);
  }
}

// Проверка аргументов командной строки
const args = process.argv.slice(2);
let targetDir = args[0] || path.join(__dirname, '..');

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Директория не существует: ${targetDir}`);
  process.exit(1);
}

console.log(`🚀 Запуск скрипта для директории: ${targetDir}`);
processDirectory(targetDir);
console.log('🏁 Обработка завершена');
