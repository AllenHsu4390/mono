const decrypt = (encryptedKey: string) => {
  // add real encryption
  return encryptedKey;
};

interface Identity {
  userId(encryptedKey: string): string;
}

interface Auth {
  identity: Identity;
}

export function auth(): Auth {
  return {
    identity: {
      userId: (encryptedKey: string) => decrypt(encryptedKey),
    },
  };
}
