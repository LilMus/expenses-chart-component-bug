const days = [];
const amount = [];
const chartSpendingsValue = document.getElementsByClassName(
	"chart-spendings-value"
);
const tableau = [5, 32, 89];

fetch("../data.json")
	.then((res) => res.json())
	.then((datas) => {
		setData(datas);
	})
	.catch((error) => {
		console.error(error);
	});

function setData(datas) {
	for (data of datas) {
		days.push(data.day);
		amount.push(data.amount);
	}
}

function setAmount() {
	for (let i = 0; i < 7; i++) {
		console.log(days[i]);
		// chartSpendingsValue[i].innerText
	}
}

setAmount();
