
import api from '@/utils/request';

export function addComment(params) {
  return api('/comment/addComment', params);
}

export function getComments(params) {
  return api('/comment/getComments', params);
}

export function getComment(_id) {
  return api('/comment/getComment', { _id });
}

export function modifyComment(params) {
  return api('/comment/modifyComment', params);
}
