import * as fs from 'fs';
import * as path from 'path';
import Polynomial from '../core/polynomial';

const SIZE = 7;
type Vector = number[];
type Entry = {
	af: number,
	vectors: Vector[],
};
type Map = {
	[af: number]: Vector[];
};

const afMapSource = fs.readFileSync(path.resolve(__dirname, '..', 'afs-size7-deg6.copy.json'), 'utf8');
const afMap: Entry[] = JSON.parse(afMapSource);

const size7deg1vectorsRaw = fs.readFileSync(path.resolve(__dirname, '..', 'generated-all', 'size-7-deg-1-2.txt'), 'utf8');
const size7deg1polynomials: Polynomial[] = size7deg1vectorsRaw
	.split('\n')
	.filter(line => !!line)
	.map(line => {
		return Polynomial.from(line.trim().split('').map(Number), SIZE);
	});

const entryWithAf1 = afMap.find(({af}) => af == 1)!;
const entryWithAf2 = afMap.find(({af}) => af == 2)!;

console.log(`af=1, #=${entryWithAf1.vectors.length}`);
console.log(`af=2, #=${entryWithAf2.vectors.length}`);

let n = 0;
let finded = 0;

console.log('## af = 1 ##\n\n');


for (let vector of entryWithAf1.vectors) {
	const check = Polynomial.from(vector, SIZE);
	console.log(`#${n+1}`.padEnd(4),`deg=${check.deg}`, `f=${check.toString()}`);
	n++;
	let find = false;
	for (let size7deg1polynomial of size7deg1polynomials) {
		const m = check.multiply(size7deg1polynomial);
		if (m.isZero()) {
			console.log(`    find annihilator: g=` + size7deg1polynomial.toString());
			find = true;
			break;
		}
	}

	if (find) {
		finded++;
	} else {
		console.log(`    no find`);
	}
	console.log();
}

console.dir({n, finded});

let n2 = 0;
let find2 = 0;

for (let vector of entryWithAf2.vectors) {
	const check = Polynomial.from(vector, SIZE);
	console.log(`#${n2+1}`.padEnd(4),`deg=${check.deg}`, `f=${check.toString()}`);
	n2++;
	let find = false;
	for (let size7deg1polynomial of size7deg1polynomials) {
		const m = check.multiply(size7deg1polynomial);
		if (m.isZero()) {
			console.log(`    find annihilator: g=` + size7deg1polynomial.toString());
			find = true;
			break;
		}
	}

	if (find) {
		find2++;
	} else {
		console.log(`    no find`);
	}
}

console.dir({n2, find2});
