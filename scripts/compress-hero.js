const sharp = require('sharp');
const fs = require('fs');

async function compressHero() {
  const input = './img/hero-bg.jpg';
  const output = './img/hero-bg-optimized.jpg';
  
  // Verifica se o arquivo original existe
  if (!fs.existsSync(input)) {
    console.log('❌ hero-bg.jpg não encontrado');
    return;
  }
  
  // Comprime mantendo 1920px width, qualidade 80
  await sharp(input)
    .resize(1920, null, { 
      withoutEnlargement: true,
      fit: 'inside' 
    })
    .jpeg({ 
      quality: 80,
      progressive: true,
      mozjpeg: true 
    })
    .toFile(output);
  
  const originalSize = fs.statSync(input).size;
  const optimizedSize = fs.statSync(output).size;
  const savings = ((1 - optimizedSize/originalSize) * 100).toFixed(1);
  
  console.log(`✅ Hero comprimido:`);
  console.log(`   Original: ${(originalSize/1024/1024).toFixed(2)}MB`);
  console.log(`   Otimizado: ${(optimizedSize/1024/1024).toFixed(2)}MB`);
  console.log(`   Economia: ${savings}%`);
  console.log(`\n📝 Próximo passo: Renomeie manualmente no explorador de arquivos:
   hero-bg.jpg → hero-bg-original.jpg (backup)
   hero-bg-optimized.jpg → hero-bg.jpg
`);
}

compressHero().catch(console.error);
