
/**
 * Authentication
 * @param {String} redirectUrl redirect url if auth failed
 */
export default function auth(redirectUrl = '/') {
  const state = JSON.parse(window.sessionStorage.getItem('vuex'));
  if (!state.user.isLoggedIn) {
    this.$message({ type: 'error', message: '請先登入' });
    this.$router.push(redirectUrl);
  }
}
