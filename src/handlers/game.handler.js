import { getGameAssets } from '../init/assets.js';
import { clearItems, getItem } from '../models/item.model.js';
import { clearStage, getStage, setStage } from '../models/stage.model.js';

export const gameStart = (uuid, payload) => {
  const { stages } = getGameAssets();

  clearStage(uuid);
  clearItems(uuid);
  setStage(uuid, stages.data[0].id, payload.timestamp);
  console.log('Stage:', getStage(uuid));

  return { status: 'success' };
};

export const gameEnd = (uuid, payload) => {
  // 클라이언트는 게임 종료 시 타임 스탬프와 총 점수를 표시
  const { timestamp: gameEndTime, score } = payload;
  const userStages = getStage(uuid);
  const userItems = getItem(uuid);

  if (!userStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  const { stages, items } = getGameAssets();

  // 각 스테이지의 지속 시간을 계산하여 총 점수 계산
  let totalScore = 0;
  userStages.forEach((stage, index) => {
    let stageEndTime;
    if (index === userStages.length - 1) {
      stageEndTime = gameEndTime;
    } else {
      stageEndTime = userStages[index + 1].timestamp;
    }

    const stagesInfoIndex = stages.data.findIndex((element) => element.id === userStages[index].id);
    const scorePerSecond = stages.data[stagesInfoIndex].scorePerSecond;

    const stageDuration = (stageEndTime - stage.timestamp) / 1000;
    totalScore += stageDuration * scorePerSecond; // 초당 1점
  });

  userItems.forEach((item, index) => {
    const itemsInfoIndex = items.data.findIndex((element) => element.id === userItems[index].id);
    const score = items.data[itemsInfoIndex].score;

    totalScore += score;
  });

  console.log(totalScore);

  // 점수와 타임 스탬프 검증
  // 오차범위 5
  if (Math.abs(score - totalScore) > 5) {
    return { status: 'fail', message: 'Score verification failed' };
  }

  return { status: 'success', message: 'Game ended', score };
};
