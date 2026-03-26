// Generic hash function using first, second, and last characters for efficiency
export const getHashNumber = (text: string, maxValue: number): number => {
  if (text.length === 0) return 0;
  let hash = 0;

  // Use first character
  hash += text.charCodeAt(0);

  // Use second character if available
  if (text.length > 1) {
    hash = (hash << 5) - hash + text.charCodeAt(1);
  }

  // Use last character
  if (text.length > 2) {
    const lastChar = text.charCodeAt(text.length - 1);
    hash = (hash << 5) - hash + lastChar;
  }

  // Convert to 32-bit integer
  hash = hash & hash;

  return Math.abs(hash) % maxValue;
};
