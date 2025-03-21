import React from "react";

const Card = (props) => {
  // console.log('props', props.id);
  let path;
  if (props.data.poster_path) {
    path = `https://image.tmdb.org/t/p/original${props.data.poster_path}`;
  } else if (props.data.backdrop_path) {
    path = `https://image.tmdb.org/t/p/original${props.data.backdrop_path}`;
  } else {
    path = "../../dummy_movie.jpg";
  }

  const handleLike = () => {
    
    // let watchlist_data = JSON.parse(localStorage.getItem("watchlist")) || [];
    // console.log('before liking',[...watchlist_data, props.data]);
    // localStorage.setItem('watchlist', JSON.stringify([...watchlist_data, props.data]))
    // console.log('after liking',watchlist_data);

    props.SavedToWatchList(props.data);
  };

  const handleDisLike = () => {
    console.log("disliked");
    // let index = props.saved_to_watchList_arr.indexOf(props.data.id)
    let watchlist_data = JSON.parse(localStorage.getItem("watchlist"));

    let filtered_data = watchlist_data.filter(
      (x, i) => x.id != props.data.id
    );
    props.RemoveFromWatchList(filtered_data);
  };

  const checkIsSaved = () => {
    // console.log('ass on',props.saved_to_watchList_arr.includes(props.data.id))
    let watchlist_data = JSON.parse(localStorage.getItem("watchlist")) || [];

    let filtered_data = watchlist_data.filter(
      (item) => item.id == props.data.id
    );
    return filtered_data.length > 0;
  };

 

  return (
    <div
      className="w-[210px] h-[50vh] bg-cover bg-center m-[10px] rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between"
      style={{
        backgroundImage: `url(${path})`,
      }}
      
    >
      <div className="text-[white] w-full  text-center text-x p-2 bg-gray-400/70 rounded-lg">
        <h1>{props.data.title}</h1>
      </div>
      <div className="text-[red]  text-[25px]  flex justify-end p-[10px]  hover:scale-y-150 hover:scale-x-150 duration-300 hover:cursor-pointer">
        {checkIsSaved() == true ? (
          <i
            class="fa-solid fa-trash"
            style={{ color: "orange" }}
            onClick={handleDisLike}
          ></i>
        ) : (
          <i class="fa-solid fa-heart" onClick={handleLike}></i>
        )}
      </div>
    </div>
  );
};

export default Card;
