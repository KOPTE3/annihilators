import Polynomial from '../core/polynomial';
import PolynomialMatrix from '../core/polynomial-matrix';

const SIZE = 7;

const matrix = new PolynomialMatrix(SIZE);

console.time('symmetric-check-3');

const stats = new Map();

for (let symmetricVector of Polynomial.SymmetricVectors(SIZE)) {
	const polynomial = Polynomial.symmetric(SIZE, symmetricVector);
	// console.log(str);

	matrix.calculate(polynomial);
	try {
		const af = matrix.af();

		const value = stats.get(af);
		stats.set(af, (value || 0) + 1);

		if (af > 3) {
			const str = polynomial.sort().join('+');
			console.log(`a(f)=${af}`, symmetricVector, `f=` + str);
		}
	} catch {
		const str = polynomial.sort().join('+');

		console.log('f=', str);
	}
}

console.timeEnd('symmetric-check-3');

console.dir([...stats.entries()]);
