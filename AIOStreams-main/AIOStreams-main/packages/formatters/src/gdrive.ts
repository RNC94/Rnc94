import { ParsedStream } from '@aiostreams/types';
import { formatDuration, formatSize, languageToEmoji } from './utils';
import { serviceDetails } from '@aiostreams/utils';

export function gdriveFormat(
  stream: ParsedStream,
  minimalistic: boolean = false
): {
  name: string;
  description: string;
} {
  let name: string = '';

  if (stream.provider) {
    const cacheStatus = stream.provider.cached
      ? '⚡'
      : stream.provider.cached === undefined
        ? '❓'
        : '⏳';
    const serviceShortName =
      serviceDetails.find((service) => service.id === stream.provider!.id)
        ?.shortName || stream.provider.id;
    name += `[${serviceShortName}${cacheStatus}] `;
  }

  if (stream.torrent?.infoHash) {
    name += `[P2P] `;
  }

  name += `${stream.addon.name} ${stream.personal ? '(Your Media) ' : ''}`;
  if (!minimalistic) {
    name += stream.resolution;
  } else {
    name += stream.resolution !== 'Unknown' ? stream.resolution + '' : '';
  }

  let description: string = `${stream.quality !== 'Unknown' ? '🎥 ' + stream.quality + ' ' : ''}${stream.encode !== 'Unknown' ? '🎞️ ' + stream.encode : ''}`;

  if (stream.visualTags.length > 0 || stream.audioTags.length > 0) {
    description += '\n';

    description +=
      stream.visualTags.length > 0
        ? `📺 ${stream.visualTags.join(' | ')}   `
        : '';
    description +=
      stream.audioTags.length > 0 ? `🎧 ${stream.audioTags.join(' | ')}` : '';
  }
  if (
    stream.size ||
    (stream.torrent?.seeders && !minimalistic) ||
    (minimalistic && stream.torrent?.seeders && !stream.provider?.cached) ||
    stream.usenet?.age ||
    stream.duration
  ) {
    description += '\n';

    description += `📦 ${formatSize(stream.size || 0)} `;
    description += stream.duration
      ? `⏱️ ${formatDuration(stream.duration)} `
      : '';
    description +=
      (stream.torrent?.seeders !== undefined && !minimalistic) ||
      (minimalistic && stream.torrent?.seeders && !stream.provider?.cached)
        ? `👥 ${stream.torrent.seeders}`
        : '';

    description += stream.usenet?.age ? `📅 ${stream.usenet.age}` : '';
  }

  if (stream.languages.length !== 0) {
    let languages = stream.languages;
    if (minimalistic) {
      languages = languages.map(
        (language) => languageToEmoji(language) || language
      );
    }
    description += `\n🔊 ${languages.join(' | ')}`;
  }

  if (!minimalistic && stream.filename) {
    description += `\n📄 ${stream.filename ? stream.filename : 'Unknown'}`;
  }
  return { name, description };
}
