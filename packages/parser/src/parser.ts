import { ParsedNameData } from '@aiostreams/types';
import { PARSE_REGEX } from './regex';

function matchPattern(
  filename: string,
  patterns: Record<string, RegExp>
): string {
  return (
    Object.entries(patterns).find(([_, pattern]) =>
      pattern.test(filename)
    )?.[0] ?? 'Unknown'
  );
}

function matchMultiplePatterns(
  filename: string,
  patterns: Record<string, RegExp>
): string[] {
  return Object.entries(patterns)
    .filter(([_, pattern]) => pattern.test(filename))
    .map(([tag]) => tag);
}

export function parseFilename(filename: string): ParsedNameData {
  const resolution = matchPattern(filename, PARSE_REGEX.resolutions);
  const quality = matchPattern(filename, PARSE_REGEX.qualities);
  const encode = matchPattern(filename, PARSE_REGEX.encodes);
  const visualTags = matchMultiplePatterns(filename, PARSE_REGEX.visualTags);
  const audioTags = matchMultiplePatterns(filename, PARSE_REGEX.audioTags);
  const languages = matchMultiplePatterns(filename, PARSE_REGEX.languages);

  return {
    resolution,
    quality,
    languages,
    encode,
    audioTags,
    visualTags,
  };
}
