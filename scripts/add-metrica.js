const fs = require('fs');
const path = require('path');

// Код Яндекс.Метрики
const METRICA_CODE = `
<!-- Yandex.Metrika counter -->
<script>
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
  console.log(`Scanning directory: ${directory}`);
  
  try {
    const items = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      
      if (item.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.isFile() && fullPath.endsWith('.html')) {
        processHtmlFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error.message);
  }
}

function processHtmlFile(filePath) {
  try {
    console.log(`Processing file: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Проверяем, не добавлен ли уже код
    if (content.includes('Yandex.Metrika counter')) {
      console.log(`Skipping (already exists): ${filePath}`);
      return;
    }
    
    // Пытаемся вставить перед </head>
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${METRICA_CODE}\n</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added to </head>: ${filePath}`);
      return;
    }
    
    // Пытаемся вставить перед </body>
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${METRICA_CODE}\n</body>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added to </body>: ${filePath}`);
      return;
    }
    
    // Если не нашли подходящее место, добавляем в конец
    content += `\n${METRICA_CODE}`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Appended to end: ${filePath}`);
    
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
}

// Определяем корневую директорию
const rootDir = path.resolve(__dirname, '..');
console.log(`Starting processing in: ${rootDir}`);
processDirectory(rootDir);
console.log('Processing completed!');
