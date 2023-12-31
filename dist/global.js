let categories = {
    '28': 'Action',
    '12': 'Adventure',
    '16': 'Animation',
    '35': 'Comedy',
    '80': 'Crime',
    '99': 'Documentary',
    '18': 'Drama',
    '10751': 'Family',
    '14': 'Fantasy',
    '36': 'History',
    '27': 'Horror',
    '10402': 'Music',
    '9648': 'Mystery',
    '10749': 'Romance',
    '878': 'Science Fiction',
    '10770': 'TV Movie',
    '53': 'Thriller',
    '10752': 'War',
    '37': 'Western'
}

export let genre = (id)=>{
    let string = ``;
    for(let i=0 ; i < id.length ; i++){
        string += categories[id[i]]+' ';
    };
    
    return string;
}
export let year = (date) => {
    return date.slice(0, 4);
}
export let typeGenre = (id)=>{
    return categories[[id]];
}