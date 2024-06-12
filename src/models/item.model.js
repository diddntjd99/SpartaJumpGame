const items = {};

export const createItems = (uuid) => {
  items[uuid] = [];
};

export const getItem = (uuid) => {
  return items[uuid];
};

export const setItem = (uuid, id, timestamp) => {
  return items[uuid].push({ id, timestamp });
};

export const clearItems = (uuid) => {
  return (items[uuid] = []);
};
