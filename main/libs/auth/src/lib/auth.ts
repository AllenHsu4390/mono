const secret = process.env.AUTH_SECRET;

const decrypt = (encryptedKey: string) => {
  // add real encryption
  return encryptedKey.split('|')[0];
};

const encrypt = (userId: string) => {
  // add real encryption
  return `${userId}|${secret}`;
};

interface Identity {
  userId(encryptedKey: string): string;
  encryptedUserId(userId: string): string;
}

interface Auth {
  identity: Identity;
}

console.log(secret);

export function auth(): Auth {
  return {
    identity: {
      userId: (encryptedKey: string) => decrypt(encryptedKey),
      encryptedUserId: (userId: string) => encrypt(userId),
    },
  };
}
