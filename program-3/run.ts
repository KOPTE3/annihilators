import Polynomial from '../core/polynomial';

type Vector = number[];

const size = 6;
let degCount = [0, 0, 0, 0];

console.time('program-3');
console.log(`n = ${size}`);

const generator1 = Polynomial.DegVectors(size, 1, true);
const generator2 = Polynomial.DegVectors(size, 2, true);

const deg1: Polynomial[] = [];
let deg2: Polynomial[] = [];
let zeros = 0;
let all = 0;
let deg1length = 0;
let deg2length = 0;


for (let vector of generator1) {
	const p = Polynomial.from(vector, size);
	deg1.push(p);
	deg1length++;
}

for (let vector of generator2) {
	const p = Polynomial.from(vector, size);
	deg2.push(p);
	deg2length++;

	if (deg2.length === 10000) {
		for (let polynomial1 of deg1) {
			for (let polynomial2 of deg2) {
				const p = polynomial1.multiply(polynomial2);
				const deg = p.deg;
				degCount[deg]++;

				all++;
				// if (p.isZero()) {
				// 	zeros++;
				// }
			}
		}

		deg2 = [];
	}
}

for (let polynomial1 of deg1) {
	for (let polynomial2 of deg2) {
		const p = polynomial1.multiply(polynomial2);
		const deg = p.deg;
		degCount[deg]++;

		all++;
		// if (p.isZero()) {
		// 	zeros++;
		// }
	}
}

const parts = degCount.map(count => count / all);

console.dir({
	'Количество полиномов 1 степени': deg1length,
	'Количество полиномов 2 степени': deg2length,
	'Количество пар полиномов': all,
	'Распределение по степеням': {
		'0-я степень': degCount[0],
		'1-я степень': degCount[1],
		'2-я степень': degCount[2],
		'3-я степень': degCount[3],
	},
	'Распределение по степеням (в частях)': {
		'0-я степень': parts[0],
		'1-я степень': parts[1],
		'2-я степень': parts[2],
		'3-я степень': parts[3],
	},
});

console.timeEnd('program-3');
