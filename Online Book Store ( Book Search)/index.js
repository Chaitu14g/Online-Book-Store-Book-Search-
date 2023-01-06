let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let headingEL = document.createElement("h1");
let spinners = document.getElementById("spinners");
let searchHeading=document.getElementById("searchHeading")
let k=[]
let oldValue=""

headingEL.classList.add("heading_1", "w-100", "text-center");
searchHeading.appendChild(headingEL);

function create_and_append_book(title, imageLink, author) {
    let container_book = document.createElement("div");
    container_book.classList.add("p-1", "d-flex", "flex-column", "col-12", "col-md-5");
    let book_image = document.createElement("img");
    book_image.src = imageLink;
    book_image.classList.add("image", "ml-auto", "mr-auto");
    container_book.appendChild(book_image);
    let book_text = document.createElement("p");
    book_text.textContent = author;
    book_text.classList.add("title_heading");
    container_book.appendChild(book_text);
    searchResultsEl.appendChild(container_book);
}

function heading(b) {
    spinners.classList.add("d-none");
    console.log(b.length)
    if (b.length === 0) {
        headingEL.textContent = "No results found";
    } else {
        headingEL.textContent = "Popular Books";
        for (let i of b) {
            let {
                title,
                imageLink,
                author
            } = i;
            create_and_append_book(title, imageLink, author);
        }
    }
};

function searchResultsElFunction(){
    searchInputEl.addEventListener("keyup", function(event) {
        if (event.target.value!==""){
            let newValue=event.target.value;
            spinners.classList.remove("d-none");
            k=[]
            let enteredValue = event.target.value;
            console.log(enteredValue);
            console.log(event.type);
            let url = "https://apis.ccbp.in/book-store?title=" + enteredValue;
            let options = {
                method: "GET"
            };
            fetch(url, options)
                .then(function(response) {
                    return response.text();
                })
                .then(function(response) {
                    let a = JSON.parse(response);
                    let b = a.search_results;
                    k=b
                    heading(k);
                    //console.log(k);
                    //console.log(searchResultsEl)
                }) 
            if (oldValue!==newValue){
                oldValue=newValue;
                searchResultsEl.innerHTML=""
            }
        }
        else{
            searchResultsEl.innerHTML=""
        }
    })
}

searchResultsElFunction();
