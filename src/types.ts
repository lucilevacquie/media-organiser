import {
  DataObject,
  AudioItem,
  ImageItem,
  DocItem,
  VideoItem,
} from "./mockData";

export type CategoryItems = Array<AudioItem | ImageItem | DocItem | VideoItem>;
export type PlaylistItems = Array<AudioItem | VideoItem>;

export interface ThemeContextProps {
  editImage: (id: string, newImage: string) => void;
  editComment: (id: string, newImage: string) => void;
  dataList: DataObject;
  categories: any;
  playlists: any;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createCategory: (newName: string) => void;
  editCategory: (id: string, items?: CategoryItems, newName?: string) => void;
  deleteCategory: (categoryId: string) => void;
  createPlaylist: (newName: string) => void;
  editPlaylist: (id: string, items?: PlaylistItems, newName?: string) => void;
  deletePlaylist: (playlistId: string) => void;
}

export interface Category {
  id: string;
  name: string;
  items: Array<string>;
}

export interface Playlist {
  id: string;
  name: string;
  items: PlaylistItems;
}
