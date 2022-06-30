function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const getCdnData = (cdnToken: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `https://source.unsplash.com/collection/${getRandomInt(10000)}`;
  }

  // lookup cdn token
  return '';
};
