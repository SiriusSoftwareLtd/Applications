import { createHash } from 'crypto';
export function hash(str: string): string {
  // sha3 because it's secure and fast (this should be consistent let me check)
  return createHash('sha3-256').update(str).digest('hex');
}
