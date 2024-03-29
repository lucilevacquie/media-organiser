import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useThemeContext } from "../providers/ThemeContext";

//COMPONENTS
import FileCardSelect from "../components/fileCardSelect";
import FileCard from "../components/fileCard";
import Modal from "../components/modal";
import { AudioItem, VideoItem, ImageItem, DocItem } from "../mockData";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

  //From provider
  const { categories, dataList, editCategory, deleteCategory } =
    useThemeContext();

  //Category's attributes
  const { name, items } = categories[id as string];

  const onEditCategoryName = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    editCategory(id as string, undefined, fd.get("name")?.toString() || "");
    setShowEditModal(false);
  };

  const onDeleteCategory = () => {
    deleteCategory(id as string);
    setShowDeleteModal(false);
    navigate("/");
  };

  const onEditCategoryItems = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editCategory(id as string, [...items, ...selectedItems], undefined);
    setSelectedItems([]);
    navigate(`/category/${id}`);
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

  const displayItems = () => {
    const itemsSelected = Object.values(dataList).filter((item) =>
      items.includes(item.id)
    );
    return itemsSelected;
  };

  const newDataList = () => {
    const nonSelectedItems = Object.values(dataList).filter(
      (item) => !items.includes(item.id)
    );
    return nonSelectedItems;
  };

  const removeItem = (event: React.ChangeEvent, fileID: string) => {
    event.stopPropagation();
    const items = categories[id as string].items;
    items.splice(items.indexOf(fileID), 1);
    editCategory(id as string, items, undefined);
  };

  return (
    <>
      {showEditModal && (
        <Modal>
          <div className="flex justify-between">
            <h3 className="font-bold">Edit category</h3>
            <button onClick={() => setShowEditModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form
            onSubmit={onEditCategoryName}
            className="mt-4 flex flex-col space-y-2"
          >
            <label>Category name</label>
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
            <h3 className="font-bold">Delete category</h3>
            <button onClick={() => setShowDeleteModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <button
            onClick={() => onDeleteCategory()}
            className="mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold"
          >
            Yes, I want to delete the category
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
            <button
              onClick={() => setShowEditModal(true)}
              className="flex space-x-2 items-center button"
            >
              <i className="fa-solid fa-pen-to-square"></i>
              <span className="hidden md:block">Edit category</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex space-x-2 items-center button"
            >
              <i className="fa-solid fa-trash"></i>
              <span className="hidden md:block">Delete category</span>
            </button>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="mt-8">
            <form onSubmit={onEditCategoryItems}>
              <div className="flex justify-between items-center">
                <h3>
                  {name} is empty. Select the file you want to add to {name}.
                </h3>
                <button type="submit" className="button md:w-1/3">
                  Add to {name}
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {Object.values(dataList).map((file) => (
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
                  />
                ))}
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-8">
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {displayItems().map((item) => (
                <FileCard
                  removeItem={removeItem}
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  title={(item as AudioItem | VideoItem).title}
                  artist={(item as AudioItem | VideoItem).artist}
                  genre={(item as AudioItem).genre}
                  name={(item as ImageItem | DocItem).name}
                  size={item.size}
                  path={item.path}
                  duration={(item as AudioItem | VideoItem).duration}
                  comment={item.comment}
                />
              ))}
            </div>
            {/* Add more files */}
            <form onSubmit={onEditCategoryItems} className="mt-12">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Add more file to {name}</h3>
                <button type="submit" className="button md:w-1/3">
                  Add to {name}
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {newDataList().map((file) => (
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

export default Category;
