/**
 * Generates a cryptographically secure UUID
 * @returns A unique UUID string
 */
export function generateId(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Fallback for Node.js or older browsers
  if (typeof require !== 'undefined') {
    const { randomUUID } = require('crypto');
    return randomUUID();
  }
  // Fallback for browsers without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generates a unique message ID with timestamp prefix for sorting
 * @returns A unique message ID string
 */
export function generateMessageId(): string {
  return `${Date.now()}-${generateId()}`;
}

/**
 * Validates if a string is a valid UUID
 * @param id - The string to validate
 * @returns True if valid UUID, false otherwise
 */
export function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}
