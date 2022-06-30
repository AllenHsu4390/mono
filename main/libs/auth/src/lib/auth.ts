import { decrypt, encrypt } from '@main/crypt';

export const auth = {
  encrypt: (id: string) => encrypt(id, '|'),
  decrypt: (encryptedId: string) => decrypt(encryptedId, '|'),
};
