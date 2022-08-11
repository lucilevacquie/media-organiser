import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  img: string;
  name: string;
  title: string;
  artist: string;
  genre: string;
  size: number;
  path: string;
  duration: number;
  comment: string;
}

const Card = ({
  id,
  img,
  name,
  title,
  artist,
  genre,
  size,
  path,
  duration,
  comment,
}: CardProps) => {
  return (
    <div className="bg-white rounded-xl flex flex-col justify-between shadow-xl hover:shadow-2xl focus:shadow-2xl">
      <Link to={`/file/${id}`} className="w-full text-left ">
        <div className="p-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {img !== "" && (
            <div>
              <img src={img} alt={name} />
            </div>
          )}
          <div className="flex flex-col space-y-2">
            {name ? (
              <p>
                <span className="underline text-darkBlue font-semibold">
                  Name:
                </span>{" "}
                {name}
              </p>
            ) : (
              <p>
                <span className="underline text-darkBlue font-semibold">
                  Title:
                </span>{" "}
                {title} by <span className="italic">{artist}</span>
              </p>
            )}

            {genre && (
              <p>
                <span className="underline text-darkBlue font-semibold">
                  Genre:
                </span>{" "}
                {genre}
              </p>
            )}
            {duration && (
              <p>
                <span className="underline text-darkBlue font-semibold">
                  Duration:
                </span>{" "}
                {duration}min
              </p>
            )}
            <p>
              <span className="underline text-darkBlue font-semibold">
                Path:
              </span>{" "}
              {path}
            </p>
            <p>
              <span className="underline text-darkBlue font-semibold">
                Size:
              </span>{" "}
              {size}kB
            </p>
            <p>
              <span className="underline text-darkBlue font-semibold">
                Comment:
              </span>{" "}
              {comment}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
