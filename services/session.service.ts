export const sessionService = {
  get session() {
    return getSession();
  },
};

function getSession() {
  return sessionStorage.getItem('session');
}
