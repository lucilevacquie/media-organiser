import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useThemeContext } from "../providers/ThemeContext";

//COMPONENTS
import FileCardSelect from "../components/fileCardSelect";
import FileCard from "../components/fileCard";
import Modal from "../components/modal";
import { AudioItem, DocItem, ImageItem, VideoItem } from "../mockData";

//FILE TYPE
const fileTypes = ["wav", "mp3", "flac", "alac", "dsd"];

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //From provider
  const { playlists, dataList, editPlaylist, deletePlaylist } =
    useThemeContext();

  //Playlist's atrributes
  const { name, items } = playlists[id as string];

  //States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

  const getAudioFiles = () => {
    const audioFiles = Object.values(dataList).filter((file) =>
      fileTypes.includes(file.fileType)
    );
    return audioFiles.filter((file) => !items.includes(file.id));
  };

  const onEditPlaylistName = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    editPlaylist(id as string, undefined, fd.get("name")?.toString() || "");
    setShowEditModal(false);
  };

  const onDeletePlaylist = () => {
    deletePlaylist(id as string);
    setShowDeleteModal(false);
    navigate("/");
  };

  const onEditPlaylistItems = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editPlaylist(id as string, [...items, ...selectedItems], undefined);
    setSelectedItems([]);
    navigate(`/playlist/${id}`);
  };

  const onSelectItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked && !selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
    } else if (event.target.checked) {
      const items = selectedItems;
      items.splice(items.indexOf(id), 1);
      setSelectedItems([...items]);
    }
  };

  const removeItem = (event: React.ChangeEvent, fileID: string) => {
    event.stopPropagation();
    const items = playlists[id as string].items;
    items.splice(items.indexOf(fileID), 1);
    editPlaylist(id as string, items, undefined);
  };

  const sortByAlphabeticalOrder = (order = "asc") => {
    const sortedItems = items.sort((a: number, b: number) => {
      const itemA = dataList[a];
      const itemB = dataList[b];

      if (
        (itemA as AudioItem | VideoItem).title >
        (itemB as AudioItem | VideoItem).title
      )
        return order === "asc" ? 1 : -1;
      if (
        (itemA as AudioItem | VideoItem).title <
        (itemB as AudioItem | VideoItem).title
      )
        return order === "asc" ? -1 : 1;
      return 0;
    });
    editPlaylist(id as string, sortedItems, undefined);
    setShowDropdown(false);
  };

  return (
    <>
      {showEditModal && (
        <Modal>
          <div className="flex justify-between">
            <h3 className="font-bold">Edit playlist</h3>
            <button onClick={() => setShowEditModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form
            onSubmit={onEditPlaylistName}
            className="mt-4 flex flex-col space-y-2"
          >
            <label>Playlist name</label>
            <input
              type="text"
              name="name"
              className="py-2 px-4 border rounded-lg"
            />
            <button type="submit" className="mt-4 w-full button">
              Update
            </button>
          </form>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal>
          <div className="flex justify-between">
            <h3 className="font-bold">Delete playlist</h3>
            <button onClick={() => setShowDeleteModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <button
            onClick={() => onDeletePlaylist()}
            className="mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold"
          >
            Yes, I want to delete the playlist
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="w-full py-2 px-4 text-center text-gray-500"
          >
            No, I want to keep it
          </button>
        </Modal>
      )}
      <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <Link to={"/"}>
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex space-x-2 items-center button"
              >
                <i className="fa-solid fa-arrow-down-arrow-up"></i>
                <span className="hidden md:block">Sort playlist</span>
              </button>
              {showDropdown && (
                <div className="absolute p-2 bg-white text-left text-xs flex flex-col rounded-lg shadow-xl">
                  <button
                    onClick={() => sortByAlphabeticalOrder("asc")}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    By ascending alphabetical order
                  </button>
                  <button
                    onClick={() => sortByAlphabeticalOrder("des")}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    By descending alphabetical order
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="flex space-x-2 items-center button"
            >
              <i className="fa-solid fa-pen-to-square"></i>
              <span className="hidden md:block">Edit playlist</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex space-x-2 items-center button"
            >
              <i className="fa-solid fa-trash"></i>
              <span className="hidden md:block">Delete playlist</span>
            </button>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="mt-8">
            <form onSubmit={onEditPlaylistItems}>
              <div className="flex justify-between items-center">
                <h3>
                  {name} is empty. Select the file you want to add to {name}.
                </h3>
                <button type="submit" className="mt-4 button md:w-1/3 ">
                  Add to {name}
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {Object.values(getAudioFiles()).map((file) => (
                  <FileCardSelect
                    onSelectItem={onSelectItem}
                    key={file.id}
                    id={file.id}
                    img={file.img}
                    title={(file as AudioItem | VideoItem).title}
                    artist={(file as AudioItem | VideoItem).artist}
                    genre={(file as AudioItem).genre}
                    name={(file as ImageItem | DocItem).name}
                    size={file.size}
                    path={file.path}
                    duration={(file as AudioItem | VideoItem).duration}
                    comment={file.comment}
                    type={file.fileType}
                  />
                ))}
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-8 ">
            <div className="grid md:grid-cols-2 gap-4">
              {items.map((item: number) => {
                const fileItem = dataList[item];
                return (
                  <FileCard
                    removeItem={removeItem}
                    key={fileItem.id}
                    id={fileItem.id}
                    img={fileItem.img}
                    title={(fileItem as AudioItem | VideoItem).title}
                    artist={(fileItem as AudioItem | VideoItem).artist}
                    genre={(fileItem as AudioItem).genre}
                    name={(fileItem as ImageItem | DocItem).name}
                    size={fileItem.size}
                    path={fileItem.path}
                    duration={(fileItem as AudioItem | VideoItem).duration}
                    comment={fileItem.comment}
                    type={fileItem.fileType}
                  />
                );
              })}
            </div>
            {/* Add more files */}
            <form onSubmit={onEditPlaylistItems} className="mt-12">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Add more file to {name}</h3>
                <button type="submit" className="button md:w-1/3">
                  Add to {name}
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {getAudioFiles().map((file) => (
                  <FileCardSelect
                    onSelectItem={onSelectItem}
                    key={file.id}
                    id={file.id}
                    img={file.img}
                    title={(file as AudioItem | VideoItem).title}
                    artist={(file as AudioItem | VideoItem).artist}
                    genre={(file as AudioItem).genre}
                    name={(file as ImageItem | DocItem).name}
                    size={file.size}
                    path={file.path}
                    duration={(file as AudioItem | VideoItem).duration}
                    comment={file.comment}
                    type={file.fileType}
                  />
                ))}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Playlist;
