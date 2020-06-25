
import api from '@/utils/request';

export function getUser() {
  return api('/user/getUser', {});
}

export function addUser(params) {
  return api('/user/addUser', params);
}
