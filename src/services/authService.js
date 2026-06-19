const KEY = "ledgerline_auth";

export const authService = {
  login(user) {
    const token = `mock-token-${user.id}-${Date.now()}`;
    localStorage.setItem(KEY, JSON.stringify({ token, userId: user.id }));
    return token;
  },

  session() {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  },

  logout() {
    localStorage.removeItem(KEY);
  },
};