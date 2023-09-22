import {fetchData} from "./api.js"
import {urlObject} from "./api.js"
import {year} from "./global.js"

let genre = (genre)=>{
    let string = ``;
    for(let i=0 ; i < genre.length ; i++){
        string += genre[i].name+ ' ';
    };
    
    return string;
}

let cast = (casts)=>{
    let string = '';
    for(let i = 0 ; i < casts.length ; i++){
        string += casts[i].name;
        if(i!= casts.length-1) string+= ',';
        string += ' ';
    }
    return string ;
}


let directing = (crew)=>{
    let string = '';
    let result = crew.filter((e)=>{
        if(e.department == 'Directing'){
            string+= e.name + ',' + " ";
        }
    })
    string = string.slice(0 , string.length-2);
    return string;
}


let mainImage = document.getElementById('mainImage');
let mainTitle = document.getElementById('mainTitle');
let ratings = document.getElementById('ratings');
let certification = document.getElementById('certification');
let runtime = document.getElementById('runtime');
let yearDetail = document.getElementById('Year');
let movieId = window.sessionStorage.getItem('movieId');
let category = document.getElementById('category');
let overview = document.getElementById('overview');
let casts = document.getElementById('casts');
let director = document.getElementById('director');
let videoCard = document.getElementById('videoCardBox');
let moviesYouMayLike = document.getElementById('moviesYouMayLike');
let movieDetailsControl =async ()=>{
    let data = await fetchData(urlObject.movieDetail(movieId));
    document.getElementById('backgroundImage').setAttribute('src' , `https://image.tmdb.org/t/p/w500${data.backdrop_path}`)
    mainImage.setAttribute('src' , `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    mainTitle.innerText = `${data.original_title}`;
    ratings.innerText = `${(data.vote_average).toFixed(1)}`;
    runtime.innerText = `${data.runtime}m`;
    yearDetail.innerText = `${year(data.release_date)}`;
    certification.innerText = `${data.release_dates.results[0].release_dates[0].certification}`;
    category.innerText = `${genre(data.genres)}`;
    overview.innerText = `${data.overview}`;
    casts.innerText = `${cast(data.credits.cast)}`;
    director.innerText = `${directing(data.credits.crew)}`

    //appending trailer and clips into the page
    let unfilteredVideoArray = data.videos.results;
    let filteredVideoArray = unfilteredVideoArray.filter((e)=>{
        if(e.site == 'YouTube') return e ;
    })
    for(let i = 0 ; i < 6 && i<filteredVideoArray.length ; i++){
        let box = document.createElement('div');
        box.className = "relative min-w-full max-w-[300px]  md:min-w-[40%] bg-[var(--white-alpha-20)] aspect-video flex justify-center rounded-[var(--radius-16)] items-center";
        box.setAttribute('style' , 'position:relative');
        box.innerHTML = `
        <img src="../images/video-bg-icon.png" alt="">
        <iframe style="position: absolute; top: 0px;" class = "rounded-[var(--radius-16)]" loading="lazy" width="100%" height="100%" src="https://www.youtube.com/embed/${filteredVideoArray[i].key}" title="YouTube video" frameborder="0" allow="accelerometer;  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `
        videoCard.appendChild(box);
    }
   
    //appending movies you may like into the page
    let recommendedMoviesArray = data.recommendations.results;

    recommendedMoviesArray.forEach(e => {
        let movie = document.createElement('a');
        movie.setAttribute('href' , './detail.html');
        movie.className = "min-w-[40%] md:min-w-[170px] md:max-w-[170px] max-w-[200px] h-fit rounded-[var(--radius-16)]";
        movie.innerHTML = `
                        <img style="border-radius:16px;" src="https://image.tmdb.org/t/p/w500${e.poster_path}"
                            class=" min-w-full h-auto rounded-[var(--radius-16)]rounded-[var(--radius-16)]"
                            alt="SliderImage">
                        <p class="line-clamp-1 h-8 text-[var(--on-surface)] text-2xl font-bold my-2">${e.original_title}</p>
                        <div class="flex items-center h-fit w-[130px] justify-between">
                            <div class="flex">
                                <img src="../images/star.png" class="w-6" alt="rating_logo">
                                <span id="ratings" class="text-[var(--on-background)] text-xl">${(e.vote_average).toFixed(1)}</span>
                            </div>
                            <span id="Year" class="bg-[var(--white-alpha-20)] py-[2px] px-4 text-[var(--on-background)]">${year(e.release_date)}</span>
                        </div>
        `
        moviesYouMayLike.appendChild(movie);
        movie.addEventListener('click' , ()=>{
            window.sessionStorage.setItem('movieId' , e.id);
        })
       
    });
    document.getElementById('mainLodingScreen').classList.add('hidden');
}



movieDetailsControl();


//create search bar manupulation to each screen
//make it responsive

let sidebar = document.getElementById('sidebar');
let humburgerItem = document.getElementById('hamburger');
let mainIcon = document.getElementById('mainLogo');
let searchInput = document.getElementById('searchInput');
let searchContainer = document.getElementById('searchHumburgerMain');
let hamburger = false; // to check wheather humburger is on or not
let searchExpanded = false;


document.getElementById('hamburger').addEventListener('click', () => {
    if (!hamburger) {
        sidebar.style.width = '70%';
        hamburger = true;
    }
    else {
        sidebar.style.width = '0%';
        hamburger = false;
    }
})

document.getElementById('searchBar').addEventListener('click', () => {
    //expanding search input box
    if (!searchExpanded) {
        humburgerItem.style.display = 'none';
        mainIcon.style.display = 'none';
        searchInput.style.width = '85%';
        searchContainer.style.width = '100%';
        searchExpanded = true;
    }
    //shrinking search input box
    else {
        humburgerItem.style.display = 'block';
        mainIcon.style.display = 'block';
        searchInput.style.width = '0';
        searchContainer.style.width = '5rem';
        searchExpanded = false;
    }
})

let genres = document.getElementById('genre');
let sidebarControl = async () => {
    let data = await fetchData(urlObject.categories);
    console.log(data);
    data.genres.forEach(e => {
        let a = document.createElement('a');
        a.className = 'text-[var(--text-color)]  font-semibold my-4 block hover:text-[var(--on-surface)]';
        a.setAttribute('href', `./movies.html`);
        a.innerText = `${e.name}`;
        genres.appendChild(a);
        a.addEventListener('click', () => {
            window.sessionStorage.setItem('categoryId', e.id);
        })
    });
}

sidebarControl();