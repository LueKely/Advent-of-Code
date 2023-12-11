import { readFile } from '../utils/readTextFile.mjs';

const payload = readFile('./day-03.txt');

//   .0000000.
//   .000%000.
//   .0000000.

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
	return {
		topBottom: [symbolPos - 3, symbolPos + 3],
		leftRight: [symbolPos - 3, symbolPos + 3],
	};
}

// create a line cutter that will take an numbers on which part it will slice
function lineCutter(position, line) {
	return line.slice(position[0], position[1]);
}

// rework line parser
function lineParser(line) {
	const stack = [];
	const regex = /\d+/g;
	let part = '';

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

const topSegment = payload[9];
const segment = payload[10];
const bottomSegment = payload[11];

const normalizedPositions = getPostionsHorizontal(39);

// control group
console.log(bottomSegment);
console.log(segment);
console.log(topSegment);
// console.log(segment[39]);
console.log('normalized position based on the current symbol position');
console.log(normalizedPositions);

const topResult = lineCutter(normalizedPositions.topBottom, topSegment);
const bottomResult = lineCutter(normalizedPositions.topBottom, bottomSegment);
const leftAndRightResult = lineCutter(normalizedPositions.leftRight, segment);

// top
console.log('top: ' + topResult);
// bottom
console.log('bottom: ' + bottomResult);
// left
console.log('left and right ' + leftAndRightResult);
// right

// console.log(lineParser(segment));
// readLine(segment);
