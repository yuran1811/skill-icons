import { type RequestHandler } from '@builder.io/qwik-city';

import { ICONS_GAP, ICONS_PER_LINE } from '~/constants';
import { generateSvg, parseShortNames } from '~/utils';

const glob = import.meta.glob('/public/icons/icons.json', {
  import: 'default',
  eager: true,
});

const icons = glob['/public/icons/icons.json'] as Record<string, string>;
const iconNameList = [...new Set(Object.keys(icons).map((i) => i.split('-')[0]))];

const themedIcons = [
  ...Object.keys(icons)
    .filter((i) => i.includes('-light') || i.includes('-dark'))
    .map((i) => i.split('-')[0]),
];

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
      json(400, { msg: '"theme" must be either "light" or "dark"' });
      return;
    }

    const perLine = +(searchParams.get('perline') || ICONS_PER_LINE);
    if (isNaN(perLine) || perLine < 1 || perLine > 50) {
      json(400, { msg: '"perline" must be a number in range [1..50]' });
      return;
    }

    const gap = +(searchParams.get('gap') || ICONS_GAP);
    if (isNaN(gap) || gap < 0 || gap > 100) {
      json(400, { msg: '"gap" must be a number in range [0..100]' });
      return;
    }

    const padding = +(searchParams.get('p') || searchParams.get('padding') || 0);
    if (isNaN(padding) || padding < 0 || padding > 100) {
      json(400, { msg: '"padding" must be a number in range [0..100]' });
      return;
    }

    const paddingX = +(searchParams.get('px') || 0);
    if (isNaN(paddingX) || paddingX < 0 || paddingX > 100) {
      json(400, { msg: '"px" must be a number in range [0..100]' });
      return;
    }

    const paddingY = +(searchParams.get('py') || 0);
    if (isNaN(paddingY) || paddingY < 0 || paddingY > 100) {
      json(400, { msg: '"py" must be a number in range [0..100]' });
      return;
    }

    const iconShortNames = iconParam === 'all' ? iconNameList : iconParam.split(',');
    const iconNames = await parseShortNames({ iconNameList, themedIcons }, iconShortNames, theme || 'dark');
    if (!iconNames) {
      json(400, { msg: "You didn't format the icons param correctly!" });
      return;
    }

    const svg = await generateSvg(icons, iconNames as string[], { perLine, gap, padding, paddingX, paddingY });
    const response = new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
    send(response);
  } catch (error: any) {
    json(500, { err: error.stack });
  }
};
