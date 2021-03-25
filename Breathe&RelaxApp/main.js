const container = document.querySelector(".container");
const text = document.querySelector("#text");

const totalTime = 7500;
const breatheInTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breatheAnimation = () => {
	text.innerText = "Breathe In!";
	container.className = "container grow";

	setTimeout(() => {
		text.innerText = "Hold!";

		setTimeout(() => {
			text.innerText = "Breathe Out!";
			container.className = "container shrink";
		}, holdTime);
	}, breatheInTime);
};

breatheAnimation();

setInterval(breatheAnimation, totalTime);
