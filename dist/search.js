import { fetchData, urlObject } from "./api.js";
import { year } from "./global.js"



let timerId;
let container = document.getElementById('searchMovieContainer');
let searchLoading = document.getElementById('searchLoading');
let searchScreen = document.getElementById('searchModule');
let movieName = document.getElementById('movieName');
let searchValue = document.getElementById('searchValue');

document.getElementById('searchToggle').addEventListener('click' , ()=>{
    searchScreen.classList.add('hidden');
})
searchValue.addEventListener('input', (e) => {
    if (e.target.value == '') {
        searchScreen.classList.add('hidden');
        searchLoading.classList.remove('loading');
        clearTimeout(timerId);
    }
    else {
        searchLoading.classList.add('loading');
        
        movieName.innerText = e.target.value;
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(async () => {
            let data = await fetchData(urlObject.search(e.target.value));
            searchScreen.classList.remove('hidden');
            searchLoading.classList.remove('loading');
            let movieArray = data.results;
            container.innerHTML = '';
            movieArray.forEach(element => {
                let box = document.createElement('a');
                box.setAttribute('href', './detail.html');
                box.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" class=" min-w-[20%] h-auto rounded-[var(--radius-16)]"
            alt="SliderImage">
            <p class="line-clamp-1 h-8 text-[var(--on-surface)] text-2xl font-bold my-2">${element.original_title}</p>
            <div class="flex items-center h-fit w-[130px] justify-between">
            <div class="flex">
                <img src="../images/star.png" class="w-6" alt="rating_logo">
                <span id="ratings" class="text-[var(--on-background)] text-xl">${(element.vote_average).toFixed(1)}</span>
            </div>
            <span id="Year"
                class="bg-[var(--white-alpha-20)] py-[2px] px-4 text-[var(--on-background)]">${year(element.release_date)}</span>
            </div>
            `
                container.appendChild(box);
                box.addEventListener('click' , ()=>{
                    window.sessionStorage.setItem('movieId' , element.id);
                })
            });



        }, 1000);
    }
})
