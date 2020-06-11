
import api from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export function getTags(params) {
  return api('/tag/getTags', params);
}
