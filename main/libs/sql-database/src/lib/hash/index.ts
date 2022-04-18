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
  return hasher.decode(id)[0] as number;
};
