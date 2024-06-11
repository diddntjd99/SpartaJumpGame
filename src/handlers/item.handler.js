import { getGameAssets } from '../init/assets.js';
import { getItem, setItem } from '../models/item.model.js';

// 스테이지 별 생성 가능한 아이템 핸들러
export const generativeItemsHandler = (userId, payload) => {
  const { itemUnlocks } = getGameAssets();
  const itemIds = itemUnlocks.data.find((item) => item.stage_id === payload.currentStageId);
  if (!itemIds) {
    return { status: 'fail', message: 'Stage unlock item not found' };
  }

  return {
    status: 'success',
    message: 'Get create item Info',
    handlerId: 101,
    itemIds: itemIds.item_id,
  };
};

// 아이템 획득 핸들러
export const acquiredItemHandler = (userId, payload) => {
  let userGetItem = getItem(userId);
  if (!userGetItem === undefined) {
    return { status: 'fail', message: 'No Items found for user' };
  }
  const { items, itemUnlocks } = getGameAssets();

  if (!itemUnlocks.data.some((unlock) => unlock.stage_id === payload.currentStage)) {
    return { status: 'fail', message: 'Item current Stage mismatch' };
  }

  const item = items.data.find((item) => item.id === payload.itemId);
  if (!item) {
    return { status: 'fail', message: 'Item not found' };
  }

  setItem(userId, item.id);

  return {
    status: 'success',
    message: 'Acquired item',
    handlerId: 102,
    item,
  };
};
