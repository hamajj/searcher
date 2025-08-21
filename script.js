const API_KEY =  "AIzaSyB7h72g3TIHNJMmWKNB0L7MHIEcYGmo35c"
const CX =  "2148b5c8ebacc4ec9"

const params = new URLSearchParams(window.location.search);
const q = params.get("q");
if (q) {
    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(q);
}
document.getElementById("searchBtn").addEventListener("click", search);
document.getElementById("query").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

/*function search() {
    const query = document.getElementById("query").value.trim();
    if (query.startsWith("!yt")) {
        const ytQuery = query.slice(3).trim();
        window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(ytQuery);
    }
    else if (query) {
        //window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
         
    }
}*/

function search() {
    const query = document.getElementById("query").value.trim();
    if (!query) return;

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            if (data.items) {
                data.items.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("result");
                    div.innerHTML = `
                        <a href="${item.link}" target="_blank">${item.title}</a>
                        <p>${item.snippet}</p>
                    `;
                    resultsDiv.appendChild(div);
                });
            } else {
                resultsDiv.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(err => console.error(err));
}