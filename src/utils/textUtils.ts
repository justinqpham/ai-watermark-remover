// Map of hidden characters to their visual representations
const hiddenCharacterMap: Record<string, string> = {
  // Control and Legacy Characters
  '\t': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Tab">⇥</span>',
  '\r': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Carriage Return">↵</span>',
  '\r\n': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="CRLF">↵</span>\n',
  '\u000B': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Vertical Tab">⇥</span>',
  '\u000C': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Form Feed">⇞</span>',
  '\u001C': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="File Separator">FS</span>',
  '\u001D': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Group Separator">GS</span>',
  '\u001E': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Record Separator">RS</span>',
  '\u001F': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Unit Separator">US</span>',
  '\u007F': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Delete">DEL</span>',
  
  // Zero-Width and Invisible Characters
  '\u00AD': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Soft Hyphen">∅</span>',
  '\u180E': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Mongolian Vowel Separator">∅</span>',
  '\u200B': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Space">∅</span>',
  '\u200C': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Non-Joiner">∅</span>',
  '\u200D': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Joiner">∅</span>',
  '\u2060': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Non-Breaking Space">∅</span>',
  '\u2063': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Invisible Separator">∅</span>',
  '\u2064': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Invisible Plus">∅</span>',
  '\uFEFF': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Byte Order Mark">BOM</span>',
  
  // Directional Controls (Critical for sophisticated watermarking)
  '\u200E': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Left-to-Right Mark">LTR</span>',
  '\u200F': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Right-to-Left Mark">RTL</span>',
  '\u202A': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Left-to-Right Embedding">LRE</span>',
  '\u202B': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Right-to-Left Embedding">RLE</span>',
  '\u202C': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Pop Directional Formatting">PDF</span>',
  '\u202D': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Left-to-Right Override">LRO</span>',
  '\u202E': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Right-to-Left Override">RLO</span>',
  '\u2068': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="First Strong Isolate">FSI</span>',
  '\u2069': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Pop Directional Isolate">PDI</span>',
  
  // Space Variants and Formatting Spaces
  '\u00A0': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Non-breaking Space">⎵</span>',
  '\u1680': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Ogham Space Mark">⎵</span>',
  '\u2000': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="En Quad">⎵</span>',
  '\u2001': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Em Quad">⎵</span>',
  '\u2002': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="En Space">⎵</span>',
  '\u2003': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Em Space">⎵</span>',
  '\u2004': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Three-Per-Em Space">⎵</span>',
  '\u2005': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Four-Per-Em Space">⎵</span>',
  '\u2006': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Six-Per-Em Space">⎵</span>',
  '\u2007': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Figure Space">⎵</span>',
  '\u2008': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Punctuation Space">⎵</span>',
  '\u2009': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Thin Space">⎵</span>',
  '\u200A': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Hair Space">⎵</span>',
  '\u202F': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Narrow No-Break Space">⎵</span>',
  '\u205F': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Medium Mathematical Space">⎵</span>',
  '\u3000': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Ideographic Space">⎵</span>',
  
  // Line and Paragraph Controls
  '\u2028': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Line Separator">↵</span>',
  '\u2029': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Paragraph Separator">¶</span>',
};

export const detectHiddenCharacters = (text: string): string => {
  if (!text) return '';
  
  let result = text;
  
  // First handle CRLF as a unit
  result = result.replace(/\r\n/g, hiddenCharacterMap['\r\n']);
  
  // Then handle individual characters
  Object.entries(hiddenCharacterMap).forEach(([char, replacement]) => {
    if (char !== '\r\n') { // Skip CRLF as we handled it above
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(regex, replacement);
    }
  });
  
  // Highlight multiple consecutive spaces
  result = result.replace(/ {2,}/g, (match) => {
    return match.replace(/ /g, '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Space">⎵</span>');
  });
  
  return result;
};

export const hasHiddenCharacters = (text: string): boolean => {
  if (!text) return false;
  
  // Check for CRLF
  if (text.includes('\r\n')) return true;
  
  // Check for individual hidden characters
  for (const char of Object.keys(hiddenCharacterMap)) {
    if (char !== '\r\n' && text.includes(char)) {
      return true;
    }
  }
  
  // Check for multiple consecutive spaces
  if (/ {2,}/.test(text)) return true;
  
  return false;
};

export const countHiddenCharacters = (text: string): number => {
  if (!text) return 0;
  
  let count = 0;
  
  // Count CRLF sequences
  const crlfMatches = text.match(/\r\n/g);
  if (crlfMatches) count += crlfMatches.length;
  
  // Count individual hidden characters (excluding CRLF components)
  for (const char of Object.keys(hiddenCharacterMap)) {
    if (char !== '\r\n') {
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = text.match(regex);
      if (matches) count += matches.length;
    }
  }
  
  // Count multiple consecutive space sequences
  const multiSpaceMatches = text.match(/ {2,}/g);
  if (multiSpaceMatches) {
    // Count each extra space in sequences
    multiSpaceMatches.forEach(match => {
      count += match.length - 1; // -1 because one space is normal
    });
  }
  
  return count;
};

// Comprehensive regex pattern for all hidden characters (from industry reference)
// eslint-disable-next-line no-control-regex
const HIDDEN_CHARS_REGEX = /[\u0009\u000B\u000C\u000D\u001C-\u001F\u007F\u00A0\u00AD\u1680\u180E\u2000-\u200F\u2028\u2029\u202A-\u202E\u2060\u2063\u2064\u2066-\u2069\u205F\u3000\uFEFF]/g;

// Character categories for advanced analysis
export const getCharacterCategory = (char: string): string => {
  const code = char.charCodeAt(0);
  
  if ([0x0009, 0x000B, 0x000C, 0x000D, 0x001C, 0x001D, 0x001E, 0x001F, 0x007F].includes(code)) {
    return 'Control Character';
  }
  if ([0x00AD, 0x180E, 0x200B, 0x200C, 0x200D, 0x2060, 0x2063, 0x2064, 0xFEFF].includes(code)) {
    return 'Zero-Width/Invisible';
  }
  if ([0x200E, 0x200F, 0x202A, 0x202B, 0x202C, 0x202D, 0x202E, 0x2068, 0x2069].includes(code)) {
    return 'Directional Control';
  }
  if ([0x00A0, 0x1680, 0x202F, 0x205F, 0x3000].includes(code) || (code >= 0x2000 && code <= 0x200A)) {
    return 'Space Variant';
  }
  if ([0x2028, 0x2029].includes(code)) {
    return 'Line Control';
  }
  
  return 'Unknown Hidden';
};

export const cleanText = (text: string): string => {
  if (!text) return '';
  
  let cleaned = text;
  
  // Remove all hidden characters using comprehensive regex (but preserve regular newlines)
  cleaned = cleaned.replace(HIDDEN_CHARS_REGEX, '');
  
  // Convert CRLF to LF (preserve line breaks but normalize them)
  cleaned = cleaned.replace(/\r\n/g, '\n');
  
  // Remove standalone carriage returns (these are suspicious)
  cleaned = cleaned.replace(/\r/g, '');
  
  // Replace multiple spaces with single space
  cleaned = cleaned.replace(/ {2,}/g, ' ');
  
  // Convert various space variants to regular spaces
  cleaned = cleaned.replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
  
  return cleaned;
};
