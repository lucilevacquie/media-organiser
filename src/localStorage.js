import data from './mockData'

export function putData(data) {
    return localStorage.setItem('data', JSON.stringify(data))
}
export function getData() {
    return JSON.parse(localStorage.getItem('data')) || data();
}

//Handle categories data
export function putCategories(category) {
    return localStorage.setItem('categories', JSON.stringify(category))
}
export function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || {}
}

//Handle playlists data
export function putPlaylists(playlist) {
    return localStorage.setItem('playlists', JSON.stringify(playlist))
}
export function getPlaylists() {
    return JSON.parse(localStorage.getItem('playlists')) || {}
}

