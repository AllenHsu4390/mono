import { decrypt, encrypt } from '@main/crypt';

interface Identity {
  userId(encryptedKey: string): string;
  encryptedUserId(userId: string): string;
}

interface Auth {
  identity: Identity;
}

export function auth(): Auth {
  return {
    identity: {
      userId: (encryptedKey: string) => decrypt(encryptedKey),
      encryptedUserId: (userId: string) => encrypt(userId),
    },
  };
}
