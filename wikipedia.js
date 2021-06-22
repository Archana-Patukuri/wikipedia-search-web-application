let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //creating result item-div element 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    //creating title element-a
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    //creating break element 
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //creating url element 
    let resultUrlEl = document.createElement("a");
    resultUrlEl.classList.add("result-url");
    resultUrlEl.textContent = link;
    resultUrlEl.href = link;
    resultUrlEl.target = "_blank";
    resultItemEl.appendChild(resultUrlEl);
    //creating break element 
    let titleBreak1El = document.createElement("br");
    resultItemEl.appendChild(titleBreak1El);
    //creating description element-para
    let resultDescriptionEl = document.createElement("p");
    resultDescriptionEl.classList.add("link-description");
    resultDescriptionEl.textContent = description;
    resultItemEl.appendChild(resultDescriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);