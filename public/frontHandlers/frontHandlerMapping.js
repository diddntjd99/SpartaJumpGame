import {
  plusScoreHandler,
  updateGenerativeItemsHandler,
  updateStageHandler,
} from './front.handler.js';

const frontHandlerMappings = {
  10: updateStageHandler,
  101: updateGenerativeItemsHandler,
  102: plusScoreHandler,
};

export default frontHandlerMappings;
