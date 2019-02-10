// вычисляет альфа-ранги всех полиномов из size7deg6.json


import * as fs from 'fs';
import * as path from 'path';
import PolynomialMatrix from '../core/polynomial-matrix';
import Polynomial from '../core/polynomial';

const SIZE = 7;

const inputPolynomialsVectorsJSON = fs.readFileSync(path.resolve(__dirname, '..', 'size7deg6.json'), 'utf8');
const inputPolynomialsVectors: number[][] = JSON.parse(inputPolynomialsVectorsJSON);
console.log(`Length = ${inputPolynomialsVectors.length}`);

const part = inputPolynomialsVectors.slice(0);
const all = part.length;
let progress = 0;

const pm = new PolynomialMatrix(SIZE);

console.time('calculate');

type Vector = number[];
type Entry = {
	af: number,
	vectors: Vector[],
};
type Map = {
	[af: number]: Vector[];
};

const map: Map = {};

const result: Array<{}> = [];

for (let partElement of part) {
	const polynomial = Polynomial.from(partElement, SIZE);
	pm.calculate(polynomial);
	const af = pm.af();
	map[af] = map[af] || [];
	map[af].push(partElement);

	progress++;
	console.log(`${progress}/${all}`);
}

console.timeEnd('calculate');

const entries: Entry[] = [];

for (let [af, vectors] of Object.entries(map)) {
	console.log(`a(f) = ${af}, #{vectors} = ${vectors.length}`);
	entries.push({af: Number(af), vectors});
}

fs.writeFileSync(path.resolve(__dirname, '..', 'afs-size7-deg6.json'), JSON.stringify(entries), 'utf8');
