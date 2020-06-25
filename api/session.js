
import api from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export function login(username, password) {
  return api('/session/login', { username, password });
}
