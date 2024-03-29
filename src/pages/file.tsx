import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useThemeContext } from "../providers/ThemeContext";

//ASSETS
import Background from "../img/background-img.jpeg";

//COMPONENTS
import Modal from "../components/modal";
import { Category } from "../types";
import { AudioItem, DocItem, ImageItem, VideoItem } from "../mockData";

const File = () => {
  const { id } = useParams();

  //From provider
  const { dataList, editComment, editImage, categories, editCategory } =
    useThemeContext();

  //File's attributes
  const item = dataList[id as string];

  //States
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  //Store image URL
  const imageRef = useRef<Blob | null>(null);

  const onEditComment = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    editComment(id as string, fd.get("comment")?.toString() || "");
    setShowEditCommentModal(false);
  };

  const onDeleteComment = () => {
    editComment(id as string, "");
    setShowDeleteModal(false);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      imageRef.current = event.target.files[0];
    }
  };

  const onEditImage = (remove = false) => {
    if (!remove && !imageRef.current) {
      return;
    }
    editImage(
      id as string,
      remove ? "" : URL.createObjectURL(imageRef.current as Blob)
    );
    imageRef.current = null;
    setShowImageModal(false);
  };

  const handleCategoryCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryID: string
  ) => {
    const newItems = categories[categoryID].items;
    if (event.target.checked) {
      newItems.push(id);
    } else {
      newItems.splice(newItems.indexOf(id), 1);
    }
    console.log(newItems);
    editCategory(categoryID, newItems, undefined);
  };

  return (
    <>
      {showEditCommentModal && (
        <Modal>
          <div className="flex justify-between">
            <h3 className="font-bold">Update media file comment</h3>
            <button onClick={() => setShowEditCommentModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form
            onSubmit={onEditComment}
            className="mt-4 flex flex-col space-y-2"
          >
            <label>New comment</label>
            <input
              type="text"
              name="comment"
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
            <h3 className="font-bold">Delete comment</h3>
            <button onClick={() => setShowDeleteModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <button
            onClick={onDeleteComment}
            className="mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold"
          >
            Yes, I want to delete the comment
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="w-full py-2 px-4 text-center text-gray-500"
          >
            No, I want to keep it
          </button>
        </Modal>
      )}
      {showImageModal && (
        <Modal>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Add a file image</h3>
            <button onClick={() => setShowImageModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <input
            type="file"
            name="myImage"
            onChange={(event) => handleImage(event)}
          />
          <button
            onClick={() => onEditImage()}
            className="mt-4 button md:w-1/3 "
          >
            Save
          </button>
        </Modal>
      )}
      <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <Link to={"/"}>
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            {(item as ImageItem | DocItem).name ? (
              <h2 className="text-2xl font-bold">
                {(item as ImageItem | DocItem).name as string}
              </h2>
            ) : (
              <h2 className="text-2xl">
                <span className="font-bold">
                  {(item as VideoItem | AudioItem).title}
                </span>{" "}
                by{" "}
                <span className="italic">
                  {(item as VideoItem | AudioItem).artist}
                </span>
              </h2>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex space-x-2 items-center button"
            >
              <i className="fa-solid fa-arrow-down-arrow-up"></i>
              <span className="hidden md:block">Categories</span>
            </button>
            {showDropdown && (
              <div className="absolute w-full p-2 bg-white text-left text-sm flex flex-col space-y-2 rounded-lg shadow-xl">
                {Object.values<Category>(categories).map((category) => (
                  <div key={category.id} className="flex justify-between">
                    <span>{category.name}</span>
                    <input
                      defaultChecked={category.items.includes(id as string)}
                      onChange={(event) =>
                        handleCategoryCheckbox(event, category.id)
                      }
                      type="checkbox"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <div className="p-4 bg-white rounded-xl">
              <h3 className="mb-4 font-bold">Media file's details</h3>
              <div className="flex flex-col space-y-4">
                {(item as AudioItem).genre && (
                  <p>
                    <span className="underline text-darkBlue font-semibold">
                      Genre:
                    </span>{" "}
                    {(item as AudioItem).genre}
                  </p>
                )}
                <p>
                  <span className="underline text-darkBlue font-semibold">
                    Type:
                  </span>{" "}
                  {item.fileType}
                </p>
                <p>
                  <span className="underline text-darkBlue font-semibold">
                    Path:
                  </span>{" "}
                  {item.path}
                </p>
                <p>
                  <span className="underline text-darkBlue font-semibold">
                    Comment:
                  </span>{" "}
                  {item.comment}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowEditCommentModal(true)}
                className="mt-4 flex space-x-2 items-center button"
              >
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Update comment</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="mt-4 flex space-x-2 items-center button"
              >
                <i className="fa-solid fa-trash"></i>
                <span>Delete comment</span>
              </button>
            </div>
          </div>

          {item.img ? (
            <div>
              <div>
                <img src={item.img} alt={(item as ImageItem | DocItem).name} />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowImageModal(true)}
                  className="mt-4 flex space-x-2 items-center button"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Update image</span>
                </button>
                <button
                  onClick={() => onEditImage(true)}
                  className="mt-4 flex space-x-2 items-center button"
                >
                  <i className="fa-solid fa-trash"></i>
                  <span>Remove image</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              className="w-full h-40 bg-center rounded-xl flex justify-center items-center md:h-full"
              style={{ backgroundImage: `url(${Background})` }}
            >
              <button
                onClick={() => setShowImageModal(true)}
                className="py-2 px-4 text-center bg-white rounded-xl text-pink font-semibold"
              >
                + Add image
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default File;
