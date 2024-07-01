import { server$, type RequestHandler } from '@builder.io/qwik-city';

import { ICONS_PER_LINE, SCALE, iconNameList, icons, shortNames, themedIcons } from '~/constants';

export const parseShortNames = server$((names: string[], theme = 'dark') =>
  names.map((name) => {
    if (iconNameList.includes(name)) return name + (themedIcons.includes(name) ? `-${theme}` : '');
    if (name in shortNames) return shortNames[name] + (themedIcons.includes(shortNames[name]) ? `-${theme}` : '');
  })
);

export const generateSvg = server$((iconNames: string[], perLine: number) => {
  const iconSvgList = iconNames.map((i) => icons[i]);

  const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
      .map(
        (i, index) =>
          `
        <g transform="translate(${(index % perLine) * 300}, ${Math.floor(index / perLine) * 300})">
          ${i}
        </g>`
      )
      .join(' ')}
  </svg>`;
});

export const onGet: RequestHandler = async ({ request, json, send }) => {
  try {
    const { searchParams } = new URL(request.url);

    const iconParam = searchParams.get('i') || searchParams.get('icons');
    if (!iconParam) {
      json(400, { msg: "You didn't specify any icons!" });
      return;
    }

    const theme = searchParams.get('t') || searchParams.get('theme');
    if (theme && theme !== 'dark' && theme !== 'light') {
      json(400, { msg: 'Theme must be either "light" or "dark"' });
      return;
    }

    const perLine = +(searchParams.get('perline') || ICONS_PER_LINE);
    if (isNaN(perLine) || perLine < 1 || perLine > 50) {
      json(400, { msg: 'Icons per line must be a number between 1 and 50' });
      return;
    }

    const iconShortNames = iconParam === 'all' ? iconNameList : iconParam.split(',');
    const iconNames = await parseShortNames(iconShortNames, theme || 'dark');
    if (!iconNames) {
      json(400, { msg: "You didn't format the icons param correctly!" });
      return;
    }

    const svg = await generateSvg(iconNames as string[], perLine);
    const response = new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
    send(response);
  } catch (error: any) {
    json(500, { err: error.stack });
  }
};
