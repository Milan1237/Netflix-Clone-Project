import { fetchData } from "./api.js";
import { year } from "./global.js";
import { urlObject } from "./api.js";
import { genre } from "./global.js";

let sidebar = document.getElementById('sidebar');
let humburgerItem = document.getElementById('hamburger');
let mainIcon = document.getElementById('mainLogo');
let searchInput = document.getElementById('searchInput');
let searchContainer = document.getElementById('searchHumburgerMain');
let hamburger = false; // to check wheather humburger is on or not
let searchExpanded = false;
let prevBannerRecommended;
let bannerImg = document.getElementById('backdrop_image');
let bannerRoccomended = document.getElementById('bannerRecommended');

let watchNow = document.getElementById('bannerWatchNowButton');
let upcomingMovies = document.getElementById('upcomingMovies');
let topRated = document.getElementById('topRatedMovies');
let popularMovies = document.getElementById('popularMovies');

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
        document.getElementById('searchToggle').setAttribute('src' , '../images/close.png');
    }
    //shrinking search input box
    else {
        humburgerItem.style.display = 'block';
        mainIcon.style.display = 'block';
        searchInput.style.width = '0';
        searchContainer.style.width = '5rem';
        searchExpanded = false;
        document.getElementById('searchToggle').setAttribute('src' , '../images/search.png');
    }
})

let bannerRecommendedControl = async () => {
    let data = await fetchData(urlObject.movies);
    let array = data.results;
    let i = 0;
    array.forEach(e => {
        let box = document.createElement('div');
        box.className = "relative rounded-[var(--radius-24)] max-w-[150px!important] min-w-[25%]";
        box.innerHTML = `
        <div class = " absolute h-full w-[100%] bg-gradient-to-r rounded-[var(--radius-16)] from-[var(--banner-overlay1)] to-[var(--banner-overlay2)]  ">
        </div>
        <img class="rounded-[var(--radius-16)] bg-[var(--white-alpha-20)]" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="recommended_Movies">
        `
        document.getElementById('bannerWatchNow').classList.remove('hidden');

        bannerRoccomended.append(box);
        if (i == 0) {
            box.firstElementChild.style.display = "none";
            prevBannerRecommended = box;
            bannerImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${e.backdrop_path}`);
            document.getElementById('bannerMovieTitle').innerText = e.original_title;
            document.getElementById('bannerDescription').innerText = e.overview;
            document.getElementById('bannerRating').innerText = (e.vote_average).toFixed(1);
            document.getElementById('bannerRating').innerText = e.vote_average;
            document.getElementById('bannerGenreDetail').innerText = genre(e.genre_ids);
            watchNow.setAttribute('href', './detail.html');
            window.sessionStorage.setItem('movieId', e.id);
        }
        i++;
        box.addEventListener('click', (event) => {
            prevBannerRecommended.firstElementChild.style.display = "block";
            prevBannerRecommended = box;
            box.firstElementChild.style.display = "none";
            bannerImg.setAttribute('src', `https://image.tmdb.org/t/p/w500${e.backdrop_path}`);
            document.getElementById('bannerMovieTitle').innerText = e.original_title;
            document.getElementById('bannerRating').innerText = e.vote_average;
            document.getElementById('bannerYear').innerText = year(e.release_date);
            document.getElementById('bannerGenreDetail').innerText = genre(e.genre_ids);
            document.getElementById('bannerDescription').innerText = e.overview;
            console.log(e.overview);
            watchNow.setAttribute('href', './detail.html');
            window.sessionStorage.setItem('movieId', e.id);
        });
    });

}


let movieCategory = async (url, container) => {
    let data = await fetchData(url);
    let array = data.results;
    let box = document.createElement('div');
    box.className = "flex gap[5%] w-full gap-x-[4%] md:gap-x-3 overflow-x-scroll";
    array.forEach((e)=>{
        let box2 = document.createElement('div');
        box2.className = "min-w-[40%] md:min-w-[200px] md:max-w-[250px] h-fit rounded-[var(--radius-16)] ";
        box2.innerHTML = `
        <a href = "./detail.html" class= "">
        <img  src="https://image.tmdb.org/t/p/w500${e.poster_path}"
        class=" min-w-full   rounded-[var(--radius-16)]"
        alt="SliderImage">
        <p class="line-clamp-1 h-8 text-[var(--on-surface)] text-2xl font-bold my-2">${e.original_title}</p>
        <div class="flex items-center h-fit w-[130px] justify-between">
        <div class="flex">
            <img src="../images/star.png" class="w-6" alt="rating_logo">
            <span id="ratings" class="text-[var(--on-background)] text-xl">${(e.vote_average).toFixed(1)}</span>
        </div>
        <span id="Year"
            class="bg-[var(--white-alpha-20)] py-[2px] px-4 text-[var(--on-background)]">${year(e.release_date)}</span>
        </div>
        </a>
     `
     document.getElementById('genreLanguage').classList.remove('hidden');
        box.appendChild(box2);

        box2.addEventListener('click' , ()=>{
            window.sessionStorage.setItem('movieId',e.id);
            
        })
    })
    container.appendChild(box);
    document.getElementById('mainLodingScreen').classList.add('hidden');
}


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
bannerRecommendedControl();
movieCategory(urlObject.upcoming , upcomingMovies);
movieCategory(urlObject.popular , popularMovies);
movieCategory(urlObject.topRated , topRated);
