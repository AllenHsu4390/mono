function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const saveCdnData = async (imageData: string) => {
  // save somewhere

  return {
    url: `https://source.unsplash.com/collection/${getRandomInt(10000)}`,
  };
};
