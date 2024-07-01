import { component$ } from '@builder.io/qwik';
import { QwikCityProvider } from '@builder.io/qwik-city';

import { RouterHead } from '~/components/router-head/router-head';

export default component$(() => (
  <QwikCityProvider>
    <head>
      <meta charset='utf-8' />
      <link rel='manifest' href='/manifest.json' />
      <RouterHead />
    </head>
  </QwikCityProvider>
));
