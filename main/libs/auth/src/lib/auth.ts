const decrypt = (encryptedKey: string) => {
  return '0';
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
