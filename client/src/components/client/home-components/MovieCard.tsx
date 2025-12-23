interface IMovieCardProps {
  title: string;
  posterUrl: string;
}

const MovieCard = ({ title, posterUrl }: IMovieCardProps) => {
  return (
    <>
      <div className="w-full h-60">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-top object-cover block"
        />
      </div>
      <p className="text-wrap px-2 py-1 bg-stone-900 text-white text-sm">
        {title}
      </p>
    </>
  );
};

export default MovieCard;
