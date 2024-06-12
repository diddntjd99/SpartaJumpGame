import {
  plusScoreHandler,
  updateGenerativeItemsHandler,
  updateHighScore,
  updateStageHandler,
} from './front.handler.js';

const frontHandlerMappings = {
  5: updateHighScore,
  10: updateStageHandler,
  101: updateGenerativeItemsHandler,
  102: plusScoreHandler,
};

export default frontHandlerMappings;
