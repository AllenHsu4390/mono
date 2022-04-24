const decrypt = (encryptedKey: string) => {
  // add real encryption
  return encryptedKey;
};

const encrypt = (userId: string) => {
  // add real encryption
  return userId;
};

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
