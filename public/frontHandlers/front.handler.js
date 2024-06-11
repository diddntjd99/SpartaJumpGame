import { getScoreVeriable } from '../index.js';

export const updateScore = (payload) => {
  const score = getScoreVeriable();
  score.setStageInfo(payload.currentStage, payload.nextStage);
};
