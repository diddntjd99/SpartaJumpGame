import { getItemController, getScoreVeriable } from '../index.js';

// 서버에서 받아온 현재 스테이지 및 다음 스테이지에 대한 정보를 업데이트하는 핸들러
export const updateStageHandler = (payload) => {
  const score = getScoreVeriable();
  score.setStageInfo(payload.currentStage, payload.nextStage);
};

// 서버에서 받아온 생성 가능한 아이템을 업데이트하는 핸들러
export const updateGenerativeItemsHandler = (payload) => {
  const itemController = getItemController();
  itemController.setItemIds(payload.itemIds);
};

// 서버에서 받아온 획득한 아이템 정보를 업데이트하는 핸들러
export const plusScoreHandler = (payload) => {
  const score = getScoreVeriable();
  score.plusScore(payload.item.score);
};

// 서버에서 받은 최고 점수를 업데이트하는 핸들러
export const updateHighScoreHandler = (payload) => {
  const score = getScoreVeriable();
  score.setHighScore(payload.highScore);
};

// 최고 점수를 기록한 유저만 서버에서 받는 메세지 핸들러
export const recordPlayerHandler = (payload) => {
  console.log(payload.message);
};
