
import api from '@/utils/request';

export function addQuestion(params) {
  return api('/question/addQuestion', params);
}

export function getQuestions(params) {
  return api('/question/getQuestions', params);
}

export function getQuestionsByCurrentUser(params) {
  return api('/question/getQuestionsByCurrentUser', params);
}

export function getQuestion(_id) {
  return api('/question/getQuestion', { _id });
}

export function modifyQuestion(params) {
  return api('/question/modifyQuestion', params);
}

export function increaseViewCount(_id) {
  return api('question/increaseViewCount', { _id });
}
