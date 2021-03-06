import * as crypto from 'crypto';

const secretKey = process.env.AUTH_SECRET;

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

export const decrypt = (token: string, delimiter = '|') => {
  try {
    const [encryptedStr, iv] = token.split(delimiter);

    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv, 'hex')
    );

    return Buffer.concat([
      decipher.update(Buffer.from(encryptedStr, 'hex')),
      decipher.final(),
    ]).toString();
  } catch (e) {
    return '';
  }
};

export const encrypt = (str: string, delimiter = '|') => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);

  return `${encrypted.toString('hex')}${delimiter}${iv.toString('hex')}`;
};
