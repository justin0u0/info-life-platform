
import api from '@/utils/request';

export function addAnswer(params) {
  return api('/answer/addAnswer', params);
}

export function getAnswers(params) {
  return api('/answer/getAnswers', params);
}

export function getAnswer(_id) {
  return api('/answer/getAnswer', { _id });
}

export function modifyPost(params) {
  return api('/answer/modifyAnswer', params);
}
