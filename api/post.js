
import api from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export function getPosts(params) {
  return api('/post/getPosts', params);
}
