import { getItemController, getScoreVeriable } from '../index.js';

export const updateScore = (payload) => {
  const score = getScoreVeriable();
  score.setStageInfo(payload.currentStage, payload.nextStage);
};

export const updateGenerativeItems = (payload) => {
  const itemController = getItemController();
  itemController.setItemIds(payload.itemIds);
};
