import frontHandlerMappings from './frontHandlerMapping.js';

export const handleResponse = (data) => {
  const handler = frontHandlerMappings[data.handlerId];
  if (!handler) {
    return;
  }
  // 적절한 핸들러 호출
  handler(data);
};
