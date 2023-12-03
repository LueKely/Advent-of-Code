import { readFileSync } from 'node:fs';
function readFile(fileRoute, options = { encoding: 'utf-8' }) {
	return readFileSync(fileRoute, options) // read day??.txt content
		.replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
		.trim() // Remove starting/ending whitespace
		.split('\n'); // Split on newline
}

export { readFile };
