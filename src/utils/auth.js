const storageKey = "showtime-international-token"
const dropboxRefreshToken = "showtime-internation-refresh-token"

// Save the token for the user
export const saveToken = (token) => {
    localStorage.setItem(storageKey,token)
}
export const getToken = () => {
    return localStorage.getItem(storageKey) || null;
}
export const removeToken = () => {
    localStorage.removeItem(storageKey)
}
// Save the dropbox token
export const saveRefreshToken = (token) => {
    localStorage.setItem(dropboxRefreshToken,token)
}
export const getRefreshToken = () => {
    return localStorage.getItem(dropboxRefreshToken) || null;
}
export const removeRefreshToken = () => {
    localStorage.removeItem(dropboxRefreshToken)
}