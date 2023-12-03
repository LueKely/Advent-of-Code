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
// checks the subset game if it has the correct number of cubes
function checkValues(object) {
	let blue,
		red,
		green = false;

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

	return blue && red && green;
}

// Remove "Game #:" from the beginning of the string
const game = payload.map((item) => item.replace(/^Game \d+: /, ''));
const splitAll = game.map((item) => item.split('; '));
const convertAllToObjects = splitAll.map((item) => convertToObjects(item));

// console.log(checkValues(convertAllToObjects[0][0]));
console.log(convertAllToObjects[89]);
console.log(checkValues(convertAllToObjects[89][0]));

// for (let i = 0; i < convertAllToObjects.length; i++) {
// 	for (let j = 0; j < convertAllToObjects[i].length; j++) {
// 		console.log(checkValues(convertAllToObjects[i][j]));
// 	}
// }

// console.log('PAYLOAD');
// console.log(payload);

// for (let index = 0; index < subsetToObject.length; index++) {
// 	console.log(checkValues(subsetToObject[index]));
// }
