import { customAlphabet } from 'nanoid';

// 1st character always alpha for url handles
const prefix = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 1);
const sufix = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7);

export function generateId(length = 8) {
  return prefix(1) + sufix(length - 1);
}
