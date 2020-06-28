
import api from '@/utils/request';

// eslint-disable-next-line
export function addFeedback(email, content) {
  return api('/feedback/addFeedback', { email, content });
}
