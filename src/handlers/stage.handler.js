import { getGameAssets } from '../init/assets.js';
import { getStage, setStage } from '../models/stage.model.js';

export const moveStageHandler = (userId, payload) => {
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  // 오름차순 -> 가장 큰 스테이지 ID를 확인, 유저의 현재 스테이지
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];

  // 클라이언트 vs 서버 비교
  if (currentStage.id !== payload.currentStage) {
    return { status: 'fail', message: 'Current Stage mismatch' };
  }

  // 점수 검증
  const serverTime = Date.now();
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000;

  // 1스테이지 -> 2스테이지로 넘어가는 가정
  // 5 => 임의로 정한 오차 범위
  // if (elapsedTime < 10 || elapsedTime > 10.5) {
  //   return { status: 'fail', message: 'Invalid elapsed time' };
  // }

  // targetStage 대한 검증, 게임 asset에 존재 하는지
  const { stages } = getGameAssets();
  const index = stages.data.findIndex((stage) => stage.id === payload.targetStage);
  if (index === -1) {
    return { status: 'fail', message: 'Target stage not found' };
  }
  if (index + 1 >= stages.length) {
    return { status: 'fail', message: 'Final Stage' };
  }

  setStage(userId, payload.targetStage, serverTime);

  return {
    status: 'success',
    message: 'Move Stage',
    handlerId: 10,
    currentStage: stages.data[index],
    nextStage: index + 1 < stages.data.length ? stages.data[index + 1] : -1,
  };
};

// 현재 스테이지에 대한 정보 및 다음 스테이지 정보를 리턴해주는 핸들러
export const getCurrentStageHandler = (userId, payload) => {
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];

  const { stages } = getGameAssets();
  const index = stages.data.findIndex((stage) => stage.id === currentStage.id);
  if (index + 1 >= stages.length) {
    return { status: 'fail', message: 'Final Stage' };
  } else {
    return {
      ststus: 'success',
      message: 'Check Current Stage',
      handlerId: 10,
      currentStage: stages.data[index],
      nextStage: stages.data[index + 1],
    };
  }
};
