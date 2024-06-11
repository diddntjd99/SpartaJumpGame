import { getGameAssets } from '../init/assets.js';

export const createItemInfo = (userId, payload) => {
  const { itemUnlocks } = getGameAssets();
  const items = itemUnlocks.data.find((item) => item.stage_id === payload.currentStageId);
  if (!items) {
    return { status: 'fail', message: 'Stage unlock item not found' };
  }

  return { status: 'success', message: 'Get create item Info', handlerId: 101, items };
};
