
import api from '@/utils/request';

export function addPost(params) {
  return api('/post/addPost', params);
}

export function getPosts(params) {
  return api('/post/getPosts', params);
}

export function getPostsByCurrentUser(params) {
  return api('/post/getPostsByCurrentUser', params);
}

export function getPost(_id) {
  return api('/post/getPost', { _id });
}

export function modifyPost(params) {
  return api('/post/modifyPost', params);
}

export function increaseViewCount(_id) {
  return api('/post/increaseViewCount', { _id });
}
