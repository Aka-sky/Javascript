const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelect = document.querySelector("#movie");
const count = document.querySelector("p #count");
const total = document.querySelector("p #total");

let ticketCost = parseInt(movieSelect.value);

populateUI();

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketCost;
}

function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

function updateMovieSelect(e) {
	ticketCost = parseInt(e.target.value);

	localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
	localStorage.setItem("selectedMoviePrice", e.target.value);

	updateSelectedCount();
}

movieSelect.addEventListener("change", updateMovieSelect);

container.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")
	) {
		e.target.classList.toggle("selected");
		updateSelectedCount();
	}
});

updateSelectedCount();
