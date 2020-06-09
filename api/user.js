
import api from '@/utils/request';

// eslint-disable-next-line import/prefer-default-export
export function getUser() {
  return api('/user/getUser', {});
}
