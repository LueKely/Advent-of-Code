import { readFile } from '../utils/readTextFile.mjs';

const payload = readFile('./day-03.txt');
// let's try string manipulation for this part
// such that we can compare strings insted of turning them into arrays

// thoughts process
// so it will itirate by line
// check if line has a symbol * or #,etc as long as it is a symbol
// if it is a symbol, it will check the neighboring lines if it has a number on it's top, bottom and inbetween
// on the check:
// the first check will be in the top of the symbol
//   .0000000.
//   .000%000.
//   .0000000.
// demonstration once the function has found a symbol it wll read all the zeroes and will read

const segment = payload[10];
console.log(segment);

function findSymbol(letter) {
	const regex = /[^a-zA-Z0-9.]/g;
	const matches = regex.test(letter);
	return matches;
}
// start with this ah nigga
function readLine(line) {
	for (let index = 0; index < line.length; index++) {
		console.log(findSymbol(line[index]));
	}
}

// line parser takes a line and returns a string of valid numbers
// that meets the condition of the problem (this part is still in progress)
// use this for the top and bottom array inbetween the symbol
function lineParser(line) {
	const stack = [];
	const regex = /\d+/g;
	let part = '';

	// todo: ADD a check if you are in the first for loop and return if the next number to the
	// array is not a number to proceed to the next itiration
	// todo: if the 2nd to the last number is not a number proceed to the next itiration
	for (let index = 0; index < line.length; index++) {
		const next = line[index + 1];
		const matches = line[index].match(regex);

		if (matches) {
			part += line[index];

			if (index !== line.length - 1) {
				if (!next.match(regex)) {
					stack.push(part);
					part = '';
				}
			}
		}
	}

	return stack;
}

console.log(lineParser(segment));
readLine(segment);
