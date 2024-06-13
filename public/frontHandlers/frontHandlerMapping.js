import {
  plusScoreHandler,
  recordPlayerHandler,
  updateGenerativeItemsHandler,
  updateHighScoreHandler,
  updateStageHandler,
} from './front.handler.js';

const frontHandlerMappings = {
  1: recordPlayerHandler,
  5: updateHighScoreHandler,
  10: updateStageHandler,
  101: updateGenerativeItemsHandler,
  102: plusScoreHandler,
};

export default frontHandlerMappings;
