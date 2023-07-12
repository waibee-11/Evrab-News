const API_KEY = "20f648ee778a4d2b9a2ae248ef2ce012";
const url = "https://newsapi.org/v2/everything?q=";
const today = new Date();
const date_today = today.getDate();
const month_today = today.getMonth();
const year_today = today.getFullYear();


window.addEventListener("load", () => fetchNews("International"));

async function fetchNews(query){
    window.scrollTo(0,0);
    const response = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
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
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsImg.src = article.urlToImage;
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
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
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
