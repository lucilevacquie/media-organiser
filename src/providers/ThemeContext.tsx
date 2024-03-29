import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Category,
  CategoryItems,
  PlaylistItems,
  ThemeContextProps,
} from "../types";

//COMPONENTS
import Navigation from "../components/navigation";
import Footer from "../components/footer";

//DATA
import {
  getCategories,
  putCategories,
  getPlaylists,
  putPlaylists,
  getData,
  putData,
} from "../localStorage";

interface Audio {
  id: string;
  name: string;
  icon: string;
  colour: string;
  fileType: Array<string>;
}
interface Video {
  id: string;
  name: string;
  icon: string;
  colour: string;
  fileType: Array<string>;
}
interface Image {
  id: string;
  name: string;
  icon: string;
  colour: string;
  fileType: Array<string>;
}
interface Doc {
  id: string;
  name: string;
  icon: string;
  colour: string;
  fileType: Array<string>;
}

export interface EasyAccessData {
  [key: string]: Audio | Image | Doc | Video;
}

export const easyAccessData: EasyAccessData = {
  audio: {
    id: "audio",
    name: "Audio",
    icon: "boombox",
    colour: "orange",
    fileType: ["wav", "mp3", "flac", "aac", "wma"],
  },
  images: {
    id: "images",
    name: "Images",
    icon: "camera-retro",
    colour: "pink",
    fileType: ["jpg", "png", "bmp"],
  },
  videos: {
    id: "videos",
    name: "Videos",
    icon: "camcorder",
    colour: "lightBlue",
    fileType: ["mov", "mp4", "avi", "wmv", "flv"],
  },
  documents: {
    id: "documents",
    name: "Documents",
    icon: "books",
    colour: "darkBlue",
    fileType: ["pdf", "doc", "html", "txt"],
  },
};

//Set context provider
const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  //Store and load the data from localStorage
  const [categories, setCategories] = useState(getCategories());
  useEffect(() => {
    putCategories(categories);
  }, [categories]);

  const [playlists, setPlaylists] = useState(getPlaylists());
  useEffect(() => {
    putPlaylists(playlists);
  }, [playlists]);

  const [dataList, setDataList] = useState(getData());
  useEffect(() => {
    putData(dataList);
  }, [dataList]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  //Create a new category
  const createCategory = (newName: string) => {
    const newCategory = {
      id: uuidv4(),
      name: newName,
      items: [],
    };
    setCategories((curr: Category) => ({
      ...curr,
      [newCategory.id]: { ...newCategory },
    }));
  };
  //Create a new playlist
  const createPlaylist = (newName: string) => {
    const newPlaylist = {
      id: uuidv4(),
      name: newName,
      items: [],
    };

    setPlaylists({
      ...playlists,
      [newPlaylist.id]: newPlaylist,
    });
  };

  //Edit a category's name and update its items
  const editCategory = (
    id: string,
    items?: CategoryItems,
    newName?: string
  ) => {
    const existingCategory = categories[id];
    existingCategory.name = newName || existingCategory.name;
    existingCategory.items = items || existingCategory.items;
    setCategories({
      ...categories,
      [existingCategory.id]: existingCategory,
    });
  };
  //Edit a playlist's name and update its items
  const editPlaylist = (
    id: string,
    items?: PlaylistItems,
    newName?: string
  ) => {
    const existingPlaylist = playlists[id];
    existingPlaylist.name = newName || existingPlaylist.name;
    existingPlaylist.items = items || existingPlaylist.items;
    setPlaylists({
      ...playlists,
      [existingPlaylist.id]: existingPlaylist,
    });
  };
  //Delete a category
  const deleteCategory = (categoryId: string) => {
    const existingCategories = categories;
    delete existingCategories[categoryId];
    setCategories({ ...existingCategories });
  };
  //Delete a playlist
  const deletePlaylist = (playlistId: string) => {
    const existingPlaylists = playlists;
    delete existingPlaylists[playlistId];
    setPlaylists({ ...existingPlaylists });
  };
  //Edit comment from media files
  const editComment = (id: string, newComment: string) => {
    const existingMediaFile = dataList[id];
    existingMediaFile.comment = newComment;
    setDataList({
      ...dataList,
      [existingMediaFile.id]: existingMediaFile,
    });
  };
  //Handle media file's image
  const editImage = (id: string, newImage: string) => {
    console.log(newImage);
    const existingMediaFile = dataList[id];
    existingMediaFile.img = newImage;
    setDataList({
      ...dataList,
      [existingMediaFile.id]: existingMediaFile,
    });
  };

  //Available to the provider children
  const values = {
    editImage,
    editComment,
    dataList,
    categories,
    playlists,
    isSearchOpen,
    setIsSearchOpen,
    createCategory,
    editCategory,
    deleteCategory,
    createPlaylist,
    editPlaylist,
    deletePlaylist,
  };

  return (
    <ThemeContext.Provider value={values}>
      <div className="bg-gray-200 py-1">
        <div className="relative min-h-screen mx-1">
          <Navigation
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
          {children}
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
