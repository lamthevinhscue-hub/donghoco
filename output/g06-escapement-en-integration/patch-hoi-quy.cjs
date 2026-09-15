const fs = require('fs');
let s = fs.readFileSync('output/g06-escapement-en-integration/pw-g06c2-hoi-quy.js', 'utf8');
s = s.replace('&& s.coSlider && s.legendLaSpan && playChay', '&& s.coSlider && s.legendCoSpan && playChay');
s = s.replace(", slider=${s.coSlider}, stepAria", ', legendSpan=${s.legendText}, slider=${s.coSlider}, stepAria');
fs.writeFileSync('output/g06-escapement-en-integration/pw-g06c2-hoi-quy.js', s);
console.log('dùng legendCoSpan:', s.includes('s.legendCoSpan && playChay'), '| ghi legendText:', s.includes('legendSpan=${s.legendText}'));
