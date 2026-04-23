export function isAuthenticated() {
  const token = localStorage.getItem('authToken')
  return !!token // true if token exists
}
