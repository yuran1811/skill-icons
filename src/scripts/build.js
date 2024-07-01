import fs from 'fs';

const ICONS_PATH = './public/icons';

const iconsDir = fs.readdirSync(ICONS_PATH);
const icons = {};
for (const icon of iconsDir) {
  const name = icon.replace('.svg', '').toLowerCase();
  icons[name] = String(fs.readFileSync(`${ICONS_PATH}/${icon}`));
}

// if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
// fs.writeFileSync('./dist/icons.json', JSON.stringify(icons));
fs.writeFileSync(`${ICONS_PATH}/icons.json`, JSON.stringify(icons));
