
import api from '@/utils/request';

export function getUser() {
  return api('/user/getUser', {});
}

export function addUser(params) {
  return api('/user/addUser', params);
}

export function modifyUser(params) {
  return api('/user/modifyUser', params);
}
