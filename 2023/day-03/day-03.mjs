import { readFile } from '../utils/readTextFile.mjs';

const payload = readFile('./day-03.txt');
// let's try string manipulation for this part
// such that we can compare strings insted of turning them into arrays

const segment = payload[0];
console.log(segment);
const stack = [];
const regex = /\d+/g;
let part = '';

for (let index = 0; index < segment.length; index++) {
	const next = segment[index + 1];
	const matches = segment[index].match(regex);
	// const matchnNext = segment[next].match(regex);

	if (matches) {
		part += segment[index];

		if (index !== segment.length - 1) {
			if (!next.match(regex)) {
				stack.push(part);
				part = '';
			}
		}
	}

	// if (matchnNext) {

	// }
}

console.log(segment.length);
console.log(stack);
