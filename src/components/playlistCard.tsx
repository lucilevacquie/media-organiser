import { Link } from "react-router-dom";

const PlaylistCard = ({ name, id }: { name: string; id: string }) => {
  return (
    <Link
      to={`/playlist/${id}`}
      className="w-full p-4 bg-white text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl"
    >
      <h3 className="text-semibold">{name}</h3>
    </Link>
  );
};

export default PlaylistCard;
