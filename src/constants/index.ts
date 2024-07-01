const glob = import.meta.glob('/public/icons/icons.json', {
  import: 'default',
  eager: true,
});

export const icons = glob['/public/icons/icons.json'] as Record<string, string>;
export const iconNameList = [...new Set(Object.keys(icons).map((i) => i.split('-')[0]))];

export const themedIcons = [
  ...Object.keys(icons)
    .filter((i) => i.includes('-light') || i.includes('-dark'))
    .map((i) => i.split('-')[0]),
];

export const ICONS_PER_LINE = 15;
export const ONE_ICON = 48;
export const SCALE = ONE_ICON / (300 - 44);

export const shortNames: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'golang',
  cf: 'cloudflare',
  wasm: 'webassembly',
  postgres: 'postgresql',
  k8s: 'kubernetes',
  next: 'nextjs',
  mongo: 'mongodb',
  md: 'markdown',
  ps: 'photoshop',
  ai: 'illustrator',
  pr: 'premiere',
  ae: 'aftereffects',
  scss: 'sass',
  sc: 'scala',
  net: 'dotnet',
  gatsbyjs: 'gatsby',
  gql: 'graphql',
  vlang: 'v',
  amazonwebservices: 'aws',
  bots: 'discordbots',
  express: 'expressjs',
  googlecloud: 'gcp',
  mui: 'materialui',
  windi: 'windicss',
  unreal: 'unrealengine',
  nest: 'nestjs',
  ktorio: 'ktor',
  pwsh: 'powershell',
  au: 'audition',
  rollup: 'rollupjs',
  rxjs: 'reactivex',
  rxjava: 'reactivex',
  ghactions: 'githubactions',
  sklearn: 'scikitlearn',
};
