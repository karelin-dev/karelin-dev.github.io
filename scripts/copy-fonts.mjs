// Копирует шрифты (латиница и кириллица) из пакетов @fontsource-variable в docs/fonts
import { copyFileSync, mkdirSync } from 'node:fs';

const fonts = {
  manrope: ['manrope-latin-wght-normal.woff2', 'manrope-cyrillic-wght-normal.woff2'],
  'jetbrains-mono': ['jetbrains-mono-latin-wght-normal.woff2', 'jetbrains-mono-cyrillic-wght-normal.woff2'],
};

mkdirSync('docs/fonts', { recursive: true });

for (const [pkg, files] of Object.entries(fonts)) {
  for (const file of files) {
    copyFileSync(`node_modules/@fontsource-variable/${pkg}/files/${file}`, `docs/fonts/${file}`);
  }
}

console.log('Шрифты скопированы в docs/fonts');
