import { parse } from 'path';
import { readFile } from '../utils/readTextFile.mjs';

const payload = readFile('./day-03.txt');

function findSymbol(letter) {
	const regex = /[^a-zA-Z0-9.]/g;
	const matches = regex.test(letter);
	return matches;
}
function readLine(line) {
	for (let index = 0; index < line.length; index++) {
		console.log(findSymbol(line[index]));
	}
}
// todo please work on this return only one array nalang thanks lue
function getPostionsHorizontal(symbolPos) {
	return [symbolPos - 3, symbolPos + 4];
}

// create a line cutter that will take an numbers on which part it will slice
function lineCutter(position, line) {
	return line.slice(position[0], position[1]);
}

// rework line parser
function lineParser(line) {
	const stack = [];
	const regex = /[^0-9a-zA-Z.]/g;
	const regexNumber = /^\d+$/;
	const regexMiddleDot = /\d\.\d/;
	let build = '';
	// this if is for the middle arrat
	if (regex.test(line[3])) {
		const left = line.slice(0, 3);
		const right = line.slice(4, 7);
		// left
		if (regexMiddleDot.test(left)) {
			stack.push(left.replace(/\./g, '')[1]);
		} else {
			if (line[2] !== '.') {
				stack.push(left.replace(/\./g, ''));
			}
		}
		// right
		if (regexMiddleDot.test(right)) {
			stack.push(right.replace(/\./g, '')[0]);
		} else {
			if (line[4] !== '.') {
				stack.push(right.replace(/\./g, ''));
			}
		}
	} else {
		// if middle starts with a number
		if (regexNumber.test(line[3])) {
			// if 0011100
			if (regexNumber.test(line[2]) && regexNumber.test(line[4])) {
				build = line[2] + line[3] + line[4];
				stack.push(build);
			}
			// if ?11000
			else if (regexNumber.test(line[2])) {
				//if 0011000
				if (!regexNumber.test(line[1])) {
					build = line[2] + line[3];
					stack.push(build);
				}
				// if 0111000
				else {
					build = line[1] + line[2] + line[3];
					stack.push(build);
				}
			}
			// if 00011?
			else if (regexNumber.test(line[4])) {
				if (regexNumber.test(line[5])) {
					build = line[3] + line[4] + line[5];
					stack.push(build);
				} else {
					build = line[3] + line[4];
					stack.push(build);
				}
			} else {
				stack.push(line[3]);
			}
		} else if (line[3] === '.') {
			let left = line.slice(0, 3);
			let right = line.slice(4, 7);
			// left
			if (regexMiddleDot.test(left)) {
				stack.push(left.replace(/\./g, '')[1]);
			} else {
				if (line[2] !== '.') {
					stack.push(left.replace(/\./g, ''));
				}
			}
			// right
			if (regexMiddleDot.test(right)) {
				stack.push(right.replace(/\./g, '')[0]);
			} else {
				if (line[4] !== '.') {
					stack.push(right.replace(/\./g, ''));
				}
			}
		}
	}

	const final = stack.map((item) => {
		if (item != undefined) {
			return parseInt(item);
		}
	});

	return final;
}

const poop = [];

for (let index = 0; index < payload.length; index++) {
	for (let kindex = 0; kindex < payload[index].length; kindex++) {
		const element = payload[index][kindex];
		if (findSymbol(element)) {
			const normalizedPositions = getPostionsHorizontal(kindex);
			const topResult = lineCutter(normalizedPositions, payload[index - 1]);
			const bottomResult = lineCutter(normalizedPositions, payload[index + 1]);
			const leftAndRightResult = lineCutter(
				normalizedPositions,
				payload[index]
			);

			if (lineParser(topResult).length > 0) {
				lineParser(topResult).map((item) => {
					poop.push(item);
				});
			}
			if (lineParser(leftAndRightResult).length > 0) {
				lineParser(leftAndRightResult).map((item) => {
					poop.push(item);
				});
			}
			if (lineParser(bottomResult).length > 0) {
				lineParser(bottomResult).map((item) => {
					poop.push(item);
				});
			}
		}
	}
}

console.log(poop);

let final = 0;

poop.forEach((element) => {
	final += element;
});

console.log(final);
