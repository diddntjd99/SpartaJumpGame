import { gameEnd, gameStart } from './game.handler.js';
import { acquiredItemHandler, generativeItemsHandler } from './item.handler.js';
import { getCurrentStageHandler, moveStageHandler } from './stage.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  10: getCurrentStageHandler,
  11: moveStageHandler,
  101: generativeItemsHandler,
  102: acquiredItemHandler,
};

export default handlerMappings;
