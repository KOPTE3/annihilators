import Polynomial from '../core/polynomial';
import * as fs from 'fs';
import {WriteStream} from 'fs';
import * as path from 'path';
import {perf, perfEnd, perfPrint} from '../core/utils/perf';

const outputDir = path.resolve(__dirname, '..', 'generated-all');

type Vector = number[];

const size = 5;

const streams: { [deg: number]: WriteStream } = {};
const stats: { [deg: number]: number } = {};
for (let i = 0; i <= size; i++) {
	streams[i] = fs.createWriteStream(path.resolve(outputDir, `size-${size}-deg-${i}.txt`), {
		autoClose: true,
		encoding: 'utf8',
	});
	stats[i] = 0;
}

let count = 0;

console.time('generate-all');

const generator = Polynomial.Vectors(size);

function batch() {
	let subCount = 0;
	let done, vector;
	while ({done, value: vector} = generator.next(), !done) {
		perf('from');
		const p = Polynomial.from(vector, size);
		perfEnd('from');

		perf('deg');
		const deg = p.deg;
		perfEnd('deg');
		count++;
		subCount++;
		stats[deg]++;
		streams[deg].write(vector.join('') + '\n', 'utf8');

		if (count === 10000000) {
			break;
		}

		if (subCount % 100000 === 0) {
			console.dir({count});

			setImmediate(batch);
			return;
		}
	}

	perfPrint();

	console.log(`Generated ${count} polynomials`);
	console.log(stats);

	console.timeEnd('generate-all');

	for (let i = 0; i <= size; i++) {
		streams[i].end();
	}

}

setImmediate(batch);
