const items = {};

export const createItems = (uuid) => {
  items[uuid] = [];
};

export const getItem = (uuid) => {
  return items[uuid];
};

export const setItem = (uuid, id) => {
  return items[uuid].push({ id });
};

export const clearItems = (uuid) => {
  return (items[uuid] = []);
};
