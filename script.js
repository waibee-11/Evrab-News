const API_KEY = "2395ce84bf7d4a31a72ddfe23a70d4b9"; // not a good idea to have it here
const API_KEY_TWO = "81d64a0f0e1d21a46968cbd4604f3e76";
const url = "https://newsapi.org/v2/everything?q=";
const url_two = "https://gnews.io/api/v4/";

window.addEventListener("load", () => fetchNews("International"));

async function fetchNews(query){
    window.scrollTo(0,0);
    const response = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const response_two = await fetch(`${url_two}top-headlines?category=${query}&lang=en&max=9&country=in&apikey=${API_KEY_TWO}`);
    const data = await response_two.json();
    console.log(data);
    bindData(data.articles);
}

async function fetchSearchNews(query){
    window.scrollTo(0,0);
    const response = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    console.log(`${url_two}search?q=${query}&lang=en&max=9&country=in&apikey=${API_KEY_TWO}`);
    const response_two = await fetch(`${url_two}search=${query}&lang=en&max=9&country=in&apikey=${API_KEY_TWO}`);
    const data = await response_two.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name} | ${date}`;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url);
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('input-text');

searchButton.addEventListener('click', () => {
    const search = searchText.value;
    if (!search) return;
    console.log("Searching with query = " + search)
    fetchSearchNews(search);
    curSelectedNav?.classList.remove('active');
})

function reload(){
    window.location.reload();
}

function goUp(){
    window.scrollTo(0,0);
}

const darkModeButton = document.getElementById('dark-mode-button');
const newsItem = document.getElementsByClassName('card-item');

function toggleDarkMode(){
    const body = document.body;
    body.classList.toggle('dark');
}
