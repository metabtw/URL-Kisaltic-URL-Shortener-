function shortenUrl() {
    let longUrl = document.getElementById("longUrl").value;

    fetch("/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: longUrl })
    })
    .then(response => response.json())
    .then(data => {
        let result = document.getElementById("result");
        result.innerHTML = `Kısa URL: <a href="/${data.short_url}" target="_blank">${window.location.origin}/${data.short_url}</a>`;
    })
    .catch(error => console.error("Hata:", error));
}
