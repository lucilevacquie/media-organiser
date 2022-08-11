import { useParams, Link } from "react-router-dom";
import { useThemeContext } from "../providers/ThemeContext";

//COMPONENTS
import Card from "../components/card";

//DATA
import { easyAccessData } from "../providers/ThemeContext";
import { DocItem, ImageItem, AudioItem, VideoItem } from "../mockData";

const Type = () => {
  const { id } = useParams();

  //From provider
  const { dataList } = useThemeContext();

  const getFilesByTypes = () => {
    const files = Object.values(dataList).filter((file) =>
      easyAccessData[id as string].fileType.includes(file.fileType)
    );
    return files;
  };

  return (
    <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex space-x-4 items-center">
        <Link to={"/"}>
          <i className="fa-solid fa-chevron-left"></i>
        </Link>
        <h2 className="text-2xl font-bold">
          {easyAccessData[id as string].name}
        </h2>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {getFilesByTypes().map((file) => (
          <Card
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
    </div>
  );
};

export default Type;
