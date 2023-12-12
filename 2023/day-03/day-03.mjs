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
		topBottom: [symbolPos - 3, symbolPos + 4],
		leftRight: [symbolPos - 3, symbolPos + 4],
	};
}

// create a line cutter that will take an numbers on which part it will slice
function lineCutter(position, line) {
	return line.slice(position[0], position[1]);
}

//   .0000000.
//   .000%000.
//   .0000000.

// rework line parser
function lineParser(line) {
	const stack = [];

	const regex = /[^0-9a-zA-Z.]/g;
	const regexNumber = /^\d+$/;
	const regexMiddleDot = /\d\.\d/;
	let part = '';
	// this if is for the middle
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
		console.log('bar');
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
console.log(lineParser(leftAndRightResult));
// console.log(lineParser(segment));
// readLine(segment);
