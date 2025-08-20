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

function search() {
    const query = document.getElementById("query").value.trim();
    if (query.startsWith("!yt")) {
        const ytQuery = query.slice(3).trim();
        window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(ytQuery);
    }
    else if (query) {
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
    }
}
