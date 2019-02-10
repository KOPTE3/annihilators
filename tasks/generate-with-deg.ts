import Polynomial from '../core/polynomial';
import * as fs from 'fs';
import * as path from 'path';
import {perfPrint} from '../core/utils/perf';

const outputDir = path.resolve(__dirname, '..', 'generated-all');

type Vector = number[];

const size = 4;
const deg = 3;

const stream = fs.createWriteStream(path.resolve(outputDir, `size-${size}-deg-${deg}-2.txt`), {
	autoClose: true,
	encoding: 'utf8',
});

let count = 0;

console.time('generate-with-deg');

const generator = Polynomial.DegVectors(size, deg, true);

function batch() {
	let subCount = 0;
	let done, vector;
	while ({done, value: vector} = generator.next(), !done) {
		count++;
		subCount++;
		stream.write(vector.join('') + '\n', 'utf8');

		if (count === 1000000) {
			break;
		}

		if (subCount % 10000 === 0) {
			console.dir({count});

			setImmediate(batch);
			return;
		}
	}

	perfPrint();

	console.log(`Generated ${count} polynomials`);

	console.timeEnd('generate-with-deg');
	stream.end();
}

setImmediate(batch);
