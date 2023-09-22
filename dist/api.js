export const urlObject = {
  'movies': 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&region=IN',
  'categories': 'https://api.themoviedb.org/3/genre/movie/list?language=en',
  'upcoming': 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&region=IN',
  'popular': 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN',
  'topRated': 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=IN',
  genre(id,page){
    return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US$region=IN&page=${page}&sort_by=popularity.desc&with_genres=${id}`;
  },
  movieDetail(id){
    return `https://api.themoviedb.org/3/movie/${id}?api_key=80a22e54640832eea3f6ea612dd0acd2&append_to_response=videos,images,credits,release_dates,recommendations`
  },
  clips(id){
    return `https://www.youtube.com/watch?v=${id}`;
  },
  videoObject(id){
    return `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
  },
  credit(id){
    return `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
  },
  search(name){
    return `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
  }
  

};
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGEyMmU1NDY0MDgzMmVlYTNmNmVhNjEyZGQwYWNkMiIsInN1YiI6IjY0ZmY1YzZjNmEyMjI3MDBjM2I1NzkyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o98EDcio2g_ezobRiVoq1m9d9LVg-cpaJMfBNaihYaE'
    }
  };

export const fetchData = async (url)=>{
  try {
    let a = await fetch(url,options);
    let data = await a.json(); 
    return data;
  } catch (error) {
    alert('error 404');
  }
    
}
fetchData(urlObject.upcoming);

