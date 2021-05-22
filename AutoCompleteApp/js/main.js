const search = document.getElementById("search");
const outputList = document.getElementById("match-list");

const outHtml = (matches) => {
    if(matches.length > 0){
        const html = matches.map((match) => {
           return `<div class="card card-body mb-1 text-left">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>    
            </div>`
        }).join('');
        // console.log(html)
        outputList.innerHTML = html;
    } else {
        outputList.innerHTML = '';
    }
}

const showStates = async (searchText) => {
  const res = await fetch("./data/states.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText === "") {
    matches = [];
    outputList.innerHTML = '';
  }

  outHtml(matches);
};

search.addEventListener("input", (e) => {
  showStates(e.target.value);
});
