import { decrypt, encrypt } from '@main/crypt';

export function auth() {
  return {
    identity: {
      userId: (encryptedKey: string, delimiter?: string) =>
        decrypt(encryptedKey, delimiter),
      encryptedUserId: (userId: string, delimiter?: string) =>
        encrypt(userId, delimiter),
    },
  };
}
