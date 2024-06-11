import { gameEnd, gameStart } from './game.handler.js';
import { getCurrentStageInfo, moveStageHandler } from './stage.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  10: getCurrentStageInfo,
  11: moveStageHandler,
};

export default handlerMappings;
