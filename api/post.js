
import api from '@/utils/request';

export function getPosts(params) {
  return api('/post/getPosts', params);
}

export function getPost(_id) {
  return api('/post/getPost', { _id });
}
