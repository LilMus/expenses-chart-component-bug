const days = [];
const amount = [];
const chartSpendingsValue = document.getElementsByClassName(
	"chart-spendings-value"
);
const chartDays = document.getElementsByClassName("chart-days");
const bars = document.querySelectorAll(".chart-spendings div");
let maxSpendingValue = 0;
let maxSpendingDay = "";
let maxSpendingIndex = 0;

async function getData() {
	const res = await fetch("../data.json");
	const data = await res.json();
	setData(data);
}

function setAmount() {
	for (let i = 0; i < amount.length; i++) {
		chartSpendingsValue[i].innerHTML = `$${amount[i]}`;
	}
}

function setDays() {
	for (let i = 0; i < days.length; i++) {
		chartDays[i].innerHTML = days[i];
	}
}

function displayChartSpendingsValue(element) {
	element.style.opacity = 1;
}

function hideChartSpendingsValue(element) {
	element.style.opacity = 0;
}

function addMouseoverEvent() {
	for (let i = 0; i < bars.length; i++) {
		bars[i].addEventListener("mouseover", function () {
			displayChartSpendingsValue(chartSpendingsValue[i]);
			changeHoverColor(bars[i]);
		});
	}
}

function addMouseleaveEvent() {
	for (let i = 0; i < bars.length; i++) {
		bars[i].addEventListener("mouseleave", function () {
			hideChartSpendingsValue(chartSpendingsValue[i]);
			resetHoverColor(bars[i]);
		});
	}
}

function lookForMaxSpending() {
	for (let i = 0; i < amount.length; i++) {
		if (amount[i] > maxSpendingValue) {
			maxSpendingValue = amount[i];
			maxSpendingIndex = i;
		}
	}
}

function colorMaxSpendingBar() {
	bars[maxSpendingIndex].style.backgroundColor = "hsl(186, 34%, 60%)";
}

function changeHoverColor(element) {
	element.style.opacity = 0.7;
}

function resetHoverColor(element) {
	element.style.opacity = 1;
}

function setBarsHeight() {
	let ratio = 1;
	let i = 0;
	for (value of amount) {
		ratio = value / maxSpendingValue;
		barHeight = ratio * 180;
		console.log(barHeight);
		bars[i].style.height = `${barHeight}px`;
		i++;
	}
}

function setData(datas) {
	for (let data of datas) {
		days.push(data.day);
		amount.push(data.amount);
	}
	setAmount();
	setDays();
	lookForMaxSpending();
	colorMaxSpendingBar();
	setBarsHeight();
}

getData();
addMouseoverEvent();
