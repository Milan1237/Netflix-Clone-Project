import { fetchData } from "./api.js";
import { urlObject } from "./api.js";
import { typeGenre, year } from "./global.js";

let id = window.sessionStorage.getItem('categoryId');
let heading = document.getElementById('mainText');
let container = document.getElementById('cont');
heading.innerText = `All ${typeGenre(id)} Movies`;
let page = 1 ;

const moviesCategoryControl = async (p)=>{
    let data = await fetchData(urlObject.genre(id,p));
    document.getElementById('mainLodingScreen').classList.add('hidden');
    let array = data.results ;
    array.forEach(e => {
        let box = document.createElement('div');
        box.className = "w-[99%] min-w-[160px] rounded-[var(--radius-16)] max-w-[200px] aspect-[]";
        box.innerHTML = `
        <a href="./detail.html">
        <div class="w-[100%] aspect-[3/4] bg-white rounded-[var(--radius-16)]">
                    <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" class="rounded-[var(--radius-16)]" alt="">
                </div>
                <p class="line-clamp-1 h-8 text-[var(--on-surface)] text-xl font-bold my-2">${e.original_title}
                </p>
                <div class="flex items-center h-fit w-[130px] justify-between">
                    <div class="flex items-center">
                        <img src="../images/star.png" class="w-6" alt="rating_logo">
                        <span id="ratings" class="text-[var(--on-surface-variant)] text-lg">${e.vote_average}</span>
                    </div>
                    <span id="Year"
                        class="bg-[var(--white-alpha-20)] py-[2px] px-4 text-[var(--on-background)]">${year(e.release_date)}</span>
                </div>
                </a>
        `
        box.addEventListener('click' , ()=>{
            window.sessionStorage.setItem('movieId' , e.id);
        })
        container.appendChild(box);
        document.getElementById('loader').classList.remove('loading');
    });
    
}

document.getElementById('loadMore').addEventListener('click' , ()=>{
    page++;
    document.getElementById('loader').classList.add('loading');
    moviesCategoryControl(page);

})



moviesCategoryControl(page);

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

