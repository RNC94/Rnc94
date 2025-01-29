import { version, description } from '../package.json';
import { Settings } from '@aiostreams/utils';

const manifest = (configured: boolean) => {
  return {
    name: Settings.ADDON_NAME,
    id: Settings.ADDON_ID,
    version: version,
    description: description,
    catalogs: [],
    resources: ['stream'],
    background:
      'https://raw.githubusercontent.com/Viren070/AIOStreams/refs/heads/main/packages/frontend/public/assets/background.png',
    logo: 'https://raw.githubusercontent.com/Viren070/AIOStreams/refs/heads/main/packages/frontend/public/assets/logo.png',
    types: ['movie', 'series'],
    behaviorHints: {
      configurable: true,
      configurationRequired: configured ? false : true,
    },
  };
};

export default manifest;
