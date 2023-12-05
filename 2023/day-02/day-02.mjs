import { readFile } from '../utils/readTextFile.mjs';

const payload = readFile('./day-02.txt');

// RULES:
// only 12 red cubes, 13 green cubes, and 14 blue cubes

// convert the subset of strings into objects
function convertToObjects(array) {
	return array.map((subset) => {
		const cubeCounts = {};

		subset.split(', ').forEach((item) => {
			const [count, color] = item.split(' ');
			cubeCounts[color] = parseInt(count);
		});

		return cubeCounts;
	});
}

function checkValues(object) {
	let blue = false;
	let red = false;
	let green = false;

	if (!object.hasOwnProperty('blue')) {
		blue = true;
	} else if (object.blue <= 14) {
		blue = true;
	}

	if (!object.hasOwnProperty('red')) {
		red = true;
	} else if (object.red <= 12) {
		red = true;
	}

	if (!object.hasOwnProperty('green')) {
		green = true;
	} else if (object.green <= 13) {
		green = true;
	}
	// console.log(blue, red, green);
	return blue && red && green;
}

// Remove "Game #:" from the beginning of the string
const game = payload.map((item) => item.replace(/^Game \d+: /, ''));
const splitAll = game.map((item) => item.split('; '));
const convertAllToObjects = splitAll.map((item) => convertToObjects(item));

let count = 0;
const resultArray = [];

// this creates an array of arrays of booleans based on the checkValues function
for (let index = 0; index < convertAllToObjects.length; index++) {
	const gameResult = [];
	for (
		let subIndex = 0;
		subIndex < convertAllToObjects[index].length;
		subIndex++
	) {
		const isValid = checkValues(convertAllToObjects[index][subIndex]);
		gameResult.push(isValid);
	}
	resultArray.push(gameResult);
}

let buffer = [];

// this checks if all the values in the array are true
// if they are, it pushes the index + 1 to the buffer array
for (let i = 0; i < resultArray.length; i++) {
	if (resultArray[i].every((value) => value === true)) {
		buffer.push(i + 1);
	}
}
console.log(buffer.reduce((acc, cur) => acc + cur, 0));
