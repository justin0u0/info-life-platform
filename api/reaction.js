
import api from '@/utils/request';

export function addReaction(params) {
  return api('/reaction/addReaction', params);
}

export function countReactions(params) {
  return api('/reaction/countReactions', params);
}

export function removeReaction(params) {
  return api('/reaction/removeReaction', params);
}
