import { updateGenerativeItems, updateScore } from './front.handler.js';

const frontHandlerMappings = {
  10: updateScore,
  101: updateGenerativeItems,
};

export default frontHandlerMappings;
