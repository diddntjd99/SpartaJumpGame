import { gameEnd, gameStart, getHighScoreHandler, setHighScoreHandler } from './game.handler.js';
import { acquiredItemHandler, generativeItemsHandler } from './item.handler.js';
import { getCurrentStageHandler, moveStageHandler } from './stage.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  4: getHighScoreHandler,
  5: setHighScoreHandler,
  10: getCurrentStageHandler,
  11: moveStageHandler,
  101: generativeItemsHandler,
  102: acquiredItemHandler,
};

export default handlerMappings;
