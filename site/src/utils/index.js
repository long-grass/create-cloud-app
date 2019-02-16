export const addFirst = product => {
  let first = product.name[0];
  return first;
};

export const addLast = product => {
  let last = product.name[product.name.length - 1];
  return last;
};

export const getImage = id => {
  const IMG_URL = window.location.host;
  const image = `http://${IMG_URL}/public/product1.jpg`;
  return image;
};
