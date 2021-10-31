import react from "react";
import {useState, useEffect} from "react";
import axios from "./axios";
import "./Row.css"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/";


function Row({title, fetchUrl, isLargeRow}){
    const [movies,setMovies]=useState([]);
    const [trailerUrl, setTrailerUrl]=useState("")
    //a snippet of code  runs based on a specific condition
    useEffect(()=> {
        //if [] brackes are empty, the program will run once and will not depend on any variable
        //if we would put [movies] then it would run everytime movies changes
        //so movies would be its dependency
        async function fetchData(){
            const request=await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData();

        //so we are using third party api to fetch data
        //so by using asynch will be using asynchronous fetching
        //will wait till it gets all promises 
        // it will joing "https://api.themoviedb.org/3" with the 
        // urls in request 

    }, [fetchUrl])

    console.table(movies)

    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl("")
        }
        else{
            movieTrailer(movie?.name || "")
            .then((url)=>{
                //https://www.youtube.com/watch?v=XtMThy8QKqU&t
                //XtMThy8QKqU&t => that is the part we need
                const urlParams =new URLSearchParams( new URL(url).search);
               setTrailerUrl(urlParams.get("v"))
 

            })
            .catch((error)=>console.log(error ))
        }
    }

    return(
        <div className="row">
            <h2>{title}</h2>

             <div className="row__posters">
              {movies.map(movie=>( 
                 <img 
                 key={movie.id}
                 onClick={()=>{
                     handleClick(movie)
                 }}
                 src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path 
                }`} 
                 
                 alt={movie.name}
                 className={`row__poster ${isLargeRow && "row__posterLarge" }`}
                 /> 
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} />}
        </div>
    )
}
export default Row