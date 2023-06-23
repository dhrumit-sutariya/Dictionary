const Search = document.getElementById("search-btn");
const Result = document.getElementById("result-box");
const Sound = document.getElementById("sound");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

var Word = document.getElementById("search-field");
Word.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        getdata();
    }
});

Search.addEventListener("click", () => {
    getdata();
});

const getdata = async () => {
    var Word = document.getElementById("search-field").value;
    var finalword = Word.toLowerCase();
    await fetch(`${url}${finalword}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            Result.innerHTML =
                `
                <div class="result-box" id="result-box">
                    <div class="word">
                        <h3>${finalword}</h3>
                        <button id="play" onclick="playSound()">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <div class="meaning">
                        <p>${data[0].meanings[0].definitions[0].definition}</p>
                    </div>
                </div>
            `;


            Sound.setAttribute("src", data[0].phonetics[1].audio || data[0].phonetics[0].audio);

        })
        .catch((error) => {
            console.log(error);
            Result.innerHTML = "<H3 class='error'>Word Not Found</H3>";
        });
}

const playSound = () => {
    Sound.play();
}