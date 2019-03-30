import Polynomial from '../core/polynomial';

const lambdaVector = [ 0, 0, 0, 0, 1, 0, 0 ];
const size = lambdaVector.length - 1;

const checkPolynomial = Polynomial.symmetric(size, lambdaVector);

console.log('N =', size);
console.log('f(x) =', checkPolynomial.toString());

for (let d = 1; d <= size; d++) {
	if (d > 2) {
		break;
	}

	console.log('Проверяем полиномы степени', d);
	console.time('Проверка полиномов степени ' + d);

	const iterator = Polynomial.DegVectors(size, d, true);
	for (let vector of iterator) {
		const p = Polynomial.from(vector, size);
		// p.toString(true);
	}

	console.timeEnd('Проверка полиномов степени ' + d);
}
