import Hashids from 'hashids';

const hasher = new Hashids(
  '@}QtVf+8TJ+~Cf',
  10,
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
);

export const encode = (id: number) => {
  return hasher.encode(id);
};

export const decode = (id: string) => {
  const decodedId = hasher.decode(id)[0] as number;

  if (!decodedId) {
    throw new Error('Invalid id. Decode failed');
  }

  return decodedId;
};
