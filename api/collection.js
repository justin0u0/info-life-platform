
import api from '@/utils/request';

export function addCollection(postId) {
  return api('/collection/addCollection', { post_id: postId });
}

export function countCollections(postId) {
  return api('/collection/countCollections', { post_id: postId });
}

export function removeCollection(postId) {
  return api('/collection/removeCollection', { post_id: postId });
}
