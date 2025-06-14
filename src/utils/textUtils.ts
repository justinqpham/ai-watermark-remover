// Map of hidden characters to their visual representations
const hiddenCharacterMap: Record<string, string> = {
  '\t': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Tab">⇥</span>',
  '\r': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Carriage Return">↵</span>',
  '\n': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Line Feed">↵</span>\n',
  '\r\n': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="CRLF">↵</span>\n',
  '\u00A0': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Non-breaking Space">⎵</span>',
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
  '\u200B': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Space">∅</span>',
  '\u200C': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Non-Joiner">∅</span>',
  '\u200D': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Zero Width Joiner">∅</span>',
  '\u2028': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Line Separator">↵</span>',
  '\u2029': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Paragraph Separator">¶</span>',
  '\uFEFF': '<span class="bg-yellow-200 px-1 rounded text-xs font-bold" title="Byte Order Mark">BOM</span>',
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

export const cleanText = (text: string): string => {
  if (!text) return '';
  
  let cleaned = text;
  
  // Remove all the hidden characters we detect
  Object.keys(hiddenCharacterMap).forEach(char => {
    if (char !== '\n' && char !== '\r\n') { // Keep regular line breaks
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      cleaned = cleaned.replace(regex, '');
    }
  });
  
  // Convert CRLF to LF
  cleaned = cleaned.replace(/\r\n/g, '\n');
  
  // Remove carriage returns without line feeds
  cleaned = cleaned.replace(/\r/g, '');
  
  // Replace multiple spaces with single space
  cleaned = cleaned.replace(/ {2,}/g, ' ');
  
  // Replace non-breaking spaces with regular spaces
  cleaned = cleaned.replace(/\u00A0/g, ' ');
  
  return cleaned;
};
