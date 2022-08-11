import data from "./mockData";
import { DataObject } from "./mockData";
import { Playlist, Category } from "./types";

export function putData(data: DataObject) {
  return localStorage.setItem("data", JSON.stringify(data));
}
export function getData(): DataObject {
  return JSON.parse(localStorage.getItem("data") || "") || data();
}

//Handle categories data
export function putCategories(category: Category) {
  return localStorage.setItem("categories", JSON.stringify(category));
}
export function getCategories() {
  return JSON.parse(localStorage.getItem("categories") || "") || {};
}

//Handle playlists data
export function putPlaylists(playlist: Playlist) {
  return localStorage.setItem("playlists", JSON.stringify(playlist));
}
export function getPlaylists() {
  return JSON.parse(localStorage.getItem("playlists") || "") || {};
}
