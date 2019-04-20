import Polynomial from '../core/polynomial';
import PolynomialMatrix from '../core/polynomial-matrix';

const SIZE = 15;
const matrix = new PolynomialMatrix(SIZE);

console.log(`n =`, SIZE);
console.time('program-1');

const stats = new Map();
let checked = 0;
for (let symmetricVector of Polynomial.SymmetricVectors2(SIZE)) {
	// console.log(symmetricVector.join(' ') + ' -');
	checked++;
	const now = Date.now();
	matrix.calculateSymmetric(symmetricVector);
	const af0 = matrix.af();

	if (af0 < 4) {
		console.log(symmetricVector, 'checked', (Date.now() - now) + 'ms');
		continue;
	}

	matrix.plusOneSymmetric();
	const af1 = matrix.af();

	const min = Math.min(af0, af1);
	// const value = stats.get(min);
	// stats.set(min, (value || 0) + 1);

	if (min > 3) {
		console.log(`a(f)=${af0}`, `a(f')=${af1}`, `min=${min};  `, `λ =`, symmetricVector);
	}

	// const str = polynomial.sort().join('+');
	// console.log('f=', str);
	console.log(symmetricVector, 'checked 2', (Date.now() - now) + 'ms');
}

console.timeEnd('program-1');
console.dir({checked});
const tableData = [...stats.entries()]
	.sort(([a1], [a2]) => a1 - a2)
	.map(([a, count]) => ({'a(f)': a, count}));
console.table(tableData, ['a(f)', 'count']);
