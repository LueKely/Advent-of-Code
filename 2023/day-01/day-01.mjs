import { readFile } from '../utils/readTextFile.mjs';

const payload = readFile('./day-01.txt');

function getFindNumber(input) {
	const r = /(\d+)/;

	let result = '';

	for (let i = 0; i < input.length; i++) {
		if (r.test(input[i])) {
			result += input[i];
		}
	}

	return Number(`${result[0]}${result[result.length - 1]}`);
}

const convert = payload.map((item) => {
	return getFindNumber(item);
});

console.log(convert);

// add all numbers in array
const sum = convert.reduce((a, b) => a + b, 0);
console.log(sum);
