'use strict';
import { randomIntegerFromInterval } from './func-random-integer.js';

const colors = ['#FFFFFF', '#2196F3', '#4CAF50', '#FF9800', '#009688', '#795548'];

const refs = {
	start: document.querySelector('button[data-action="start"]'),
	stop: document.querySelector('button[data-action="stop"]'),
};

const rainbow = {
	start() {
		this.timerId = setInterval(() => {
			const idxOfRandomColor = randomIntegerFromInterval(0, colors.length - 1);
			document.body.style.backgroundColor = colors[idxOfRandomColor];
		}, 1000);
	},

	stop() {
		clearInterval(this.timerId);
	},
};

//Вариант №1:
// Через слушатели на каждой кнопке
refs.start.addEventListener('click', e => {
	toggleDisableBtn(e, refs.stop);
	rainbow.start.bind(rainbow)();
});

refs.stop.addEventListener('click', e => {
	toggleDisableBtn(e, refs.start);
	rainbow.stop.bind(rainbow)();
});
// Переключение деактивированной кнопки при нажатии на e.currentTarget
function toggleDisableBtn(e, toggle) {
	if (!e.currentTarget.disabled) {
		e.currentTarget.disabled = 'true';
		toggle.removeAttribute('disabled');
	}
}

// Вариант №2: 
// Если в refs добавит ссылку на js-rainbow-wrapper, то будет работать через всплытие событий. 
// refs.rainbowPanel.addEventListener('click', e => {
// 	switch (e.target.dataset.action) {
// 		case 'start':
// 			checkDisableBtn(e, refs.stop);
// 			rainbow.start.bind(rainbow)();
// 			break;
// 		case 'stop':
// 			checkDisableBtn(e, refs.start);
// 			rainbow.stop.bind(rainbow)();
// 			break;
// 		default:
// 			return;
// 	}
// });

// function toggleDisableBtn(e, toggle) {
// 	if (!e.target.disabled) {
// 		e.target.disabled = 'true';
// 		toggle.removeAttribute('disabled');
// 	}
// }
