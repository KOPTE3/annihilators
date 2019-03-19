import Polynomial from '../core/polynomial';
import * as assert from 'assert';
import * as columnify from 'columnify';

type Vector = number[];

interface Stat {
	symmetric: Polynomial;
	symmetricVector: Vector;
	checkA: boolean;
	checkB: boolean;
	annihilators: Vector[];
	theoremA: boolean;
	theoremB: boolean;
}

const size = 9;
console.log(`n = ${size}`);

console.time('program-2');

const linearVectors: Polynomial[] = [];
const stats: Stat[] = [];

const generator = Polynomial.DegVectors(size, 1, true);

for (const vector of generator) {
	const linear = Polynomial.from(vector, size);
	linearVectors.push(linear);
}

console.log(`Found ${linearVectors.length} linear vectors`);

const sigma1 = linearVectors[linearVectors.length - 2];
const sigma01 = linearVectors[linearVectors.length - 1];

function checkVectorA(vector: number[]): boolean {
	assert.strictEqual(vector.length, size + 1);

	for (let i = 0; i < vector.length; i++) {
		if (vector[i]) {
			if (i % 2 === 0) {
				if (i + 1 < vector.length) {
					if (vector[i + 1] !== 1) {
						return false;
					}
				}
			} else {
				if (i - 1 >= 0) {
					if (vector[i - 1] !== 1) {
						return false;
					}
				}
			}
		}
	}

	return true;
}

function checkVectorB(vector: number[]): boolean {
	assert.strictEqual(vector.length, size + 1);

	for (let i = 0; i < vector.length; i++) {
		if (vector[i] && i % 2 === 0) {
			return false;
		}
	}

	return true;
}

function eq(vectorA: number[], vectorB: number[]): boolean {
	return vectorA.every((bit, pos) => vectorB[pos] === bit);
}

for (const symmetricVector of Polynomial.SymmetricVectors(size)) {
	const symmetric = Polynomial.symmetric(size, symmetricVector);
	const stat: Stat = {
		symmetric,
		symmetricVector,
		checkA: checkVectorA(symmetricVector),
		checkB: checkVectorB(symmetricVector),
		annihilators: [],
		theoremA: true,
		theoremB: true,
	};
	stats.push(stat);


	for (const linear of linearVectors) {
		const r = symmetric.multiply(linear);
		const isZero = r.isZero();

		if (isZero) {
			stat.annihilators.push(linear.vector);
		}
	}

	if (stat.checkA) {
		if (stat.annihilators.length !== 1) {
			stat.theoremA = false;
		} else if (!eq(stat.annihilators[0], sigma1.vector)) {
			stat.theoremA = false;
		}
	}

	if (stat.checkB) {
		if (stat.annihilators.length !== 1) {
			stat.theoremB = false;
		} else if (!eq(stat.annihilators[0], sigma01.vector)) {
			stat.theoremB = false;
		}
	}

	if ((!stat.checkA) && (!stat.checkB) && stat.annihilators.length > 0) {
		stat.theoremA = false;
		stat.theoremB = false;
	}
}

const R2 = 'Вектор σ';
const R3 = 'Теорема А';
const R4 = 'Теорема Б';
const R5 = 'Кол-во линейных "занулителей"';
const R6 = 'Пример';

const tableData = stats.map(function (item): any {
	const o = {
		[R2]: `[ ${item.symmetricVector.join(' ')} ]`,
		[R3]: item.checkA,
		[R4]: item.checkB,
		[R5]: item.annihilators.length,
	};

	if (item.annihilators.length === 1) {
		o[R6] = Polynomial.from(item.annihilators[0], size).toString();
	}

	return o;
});

console.table(tableData, [R2, R3, R4, R5, R6]);

for (let stat of stats) {
	console.log(stat.symmetricVector, `${stat.checkA ? 'A' : ' '}${stat.checkB ? 'B' : ' '}`, stat.annihilators.length);
}

console.log(`\n\n### Симметрические полиномы, которые нарушают условия теорем ###\n`);

for (let stat of stats) {
	if (!(stat.theoremA && stat.theoremB)) {
		const {symmetric, symmetricVector, checkA, checkB, theoremA, theoremB, annihilators} = stat;
		console.log(`σ = [ ${symmetricVector.join(' ')} ]`);
		console.log('Список "занулителей":', `${annihilators.length} элементов`);

		const array: any[] = [];
		let strs = annihilators.map((vector: Vector) => Polynomial.from(vector, size).toString());

		while (strs.length) {
			array.push(strs.splice(0, 4));
		}

		console.log(columnify(array, {
			showHeaders: false,
			columnSplitter: '     '
		}));
		console.log('');
	}
}

console.timeEnd('program-2');
