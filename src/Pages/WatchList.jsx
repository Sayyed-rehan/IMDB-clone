import React, { useEffect, useState } from "react";
import genreids from "../Uitility";

const WatchList = () => {
  const [watchList, setwatchList] = useState([]);
  const [input, setinput] = useState("");
  const [all_Genres, setall_Genres] = useState(['All Genres'])

  const [selected_genre, setselected_genre] = useState('All Genres')

  //sort in ascending order
  const handleLow = () => {
    console.log("low");

    watchList.sort((ob1, ob2) => {
      return ob1.vote_average - ob2.vote_average;
    });

    setwatchList([...watchList]);
  };

  //sort in descending order
  const handleHigh = () => {
    console.log("high");

    watchList.sort((ob1, ob2) => {
      return ob2.vote_average - ob1.vote_average;
    });
    console.log("from high", watchList);
    setwatchList([...watchList]);
  };

  const handleNormal = () => {
    let watchlist_data = JSON.parse(localStorage.getItem("watchlist")) || [];

    setwatchList([...watchlist_data]);
  };

  const handleChange = (e) => {
    setinput(e.target.value);
    
  };

  const handleGenre = (e)=>{
  
    setselected_genre(e.target.innerText)
  }

  // console.log(selected_genre);

  const handleDelete = (data)=>{
    // console.log(data.id);
   let temp =  watchList.filter(obj => obj.id != data.id)
  //  console.log(temp);
   localStorage.setItem('watchlist', JSON.stringify(temp))
   setwatchList(temp)
  }

  // initialise state with current localstorage
  useEffect(() => {
    let watchlist_data = JSON.parse(localStorage.getItem("watchlist")) || [];
    // console.log(watchlist_data);
    setwatchList([...watchlist_data]);
  }, []);


  useEffect(()=>{
    let temp = watchList
    .map((item)=>{
      return genreids[item.genre_ids[0]]
    })
    .filter((item)=>item != undefined)

    temp = new Set(temp)
   

    setall_Genres([all_Genres[0],  ...temp])
    
  },[watchList])



  return (
    <div>
    <div className="flex justify-center flex-wrap p-[10px] gap-[10px] text-[white]">
    {
      all_Genres.map((item, index)=> 
        <div onClick={handleGenre}  key={item}
          className={selected_genre == item 
            ? "w-max flex  bg-blue-400 pl-[20px] pr-[20px] pt-[8px] pb-[8px] text-[large] font-bold rounded-[5px] cursor-pointer"
            :  "w-max flex  bg-gray-400/50 pl-[20px] pr-[20px] pt-[8px] pb-[8px] text-[large] font-bold rounded-[5px] cursor-pointer"
            }>
          {item}
        </div>)
    }
    </div>

    <div className="flex justify-center">
      <input type="text" placeholder="Search Movie title here..." value={input} onChange={handleChange}  
      className="h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border border-slate-600 rounded-[5px]"/>
    </div>
    
      <div className="rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 overflow-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900 text-left">Name</th>
              <th className="ml-[20px]">
                <div className="flex items-center gap-[10px] ">
                  <i
                    class="fa-solid fa-arrow-up hover:scale-150 duration-300"
                    onClick={handleHigh}
                    style={{ "font-size": "large", cursor: "pointer" }}
                  ></i>
                  <div
                    className="cursor-pointer hover:scale-150  duration-300"
                    onClick={handleNormal}
                  >  
                    Ratings
                  </div>
                  <i
                    class="fa-solid fa-arrow-down hover:scale-150 duration-300"
                    onClick={handleLow}
                    style={{ "font-size": "large", cursor: "pointer" }}
                  ></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {watchList.length > 0 ? (
              watchList
                .filter((obj)=>{ return ( selected_genre == 'All Genres' ?  watchList :  genreids[obj.genre_ids[0]] == selected_genre )})
                .filter((obj) =>obj.title.toLowerCase().includes(input.toLowerCase()))
                .map((item) => {
                  return (
                    <tr className="hover:bg-gray-100 text-left " key={item.id}>
                      <td className="flex items-center gap-[50px] px-6 py-4 font-normal text-gray-900">
                        <img
                          className="h-[9rem] w-[15rem] object-fit"
                          src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                          alt={item.title}
                        />
                        <div className="font-medium text-gray-700 text-sm">
                          {item.title} 
                        </div>
                      </td>

                      <td className="pl-6 py-4">{item.vote_average}</td>
                      <td className=" py-6  text-left">{item.popularity}</td>
                      <td className="pl-2 py-4">
                        {genreids[item.genre_ids[0]] || "NA"}
                      </td>
                      <td className="pl-7 py-4 text-red-600 text-[large] cursor-[pointer] hover:scale-150 duration-300" >
                      <i class="fa-solid fa-trash" onClick={()=>handleDelete(item)}></i>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>

              <td className="font-medium text-gray-700 text-xl">
                No Data Available
              </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
