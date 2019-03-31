import Polynomial from '../core/polynomial';
import * as BigInt from 'big-integer';
import Monomial from '../core/monomial';

const lambdaVector = [0, 0, 0, 0, 1, 0, 0, 0];
const size = lambdaVector.length - 1;

const checkPolynomial1 = Polynomial.symmetric(size, lambdaVector);
const checkPolynomial2 = checkPolynomial1.add((new Polynomial(size)).append(Monomial.from(0, size)));

console.log('N =', size);
console.log('f(x) =', checkPolynomial1.toString());
console.log('f(x) + 1 =', checkPolynomial2.toString());

for (let d = 1; d < size; d++) {
	let checked = 0;

	const countAll = Polynomial.CountDegVectors(size, d);
	let checkedAll = BigInt();
	let Mx1 = 0;
	let now = Date.now();
	console.log('Проверяем полиномы степени', d, `(всего ${countAll.toString(10)})`);
	console.time('Проверка полиномов степени ' + d + ' завершена');

	const iterator = Polynomial.DegVectors(size, d, true);
	for (let vector of iterator) {
		const p = Polynomial.from(vector, size);
		const r = checkPolynomial1.multiply(p);
		const isZero1 = r.isZero();
		const isZero2 = r.vector.join('') === p.vector.join('');

		if (isZero1 || isZero2) {
			console.dir({isZero1, isZero2, d});
			p.toString(true);
			console.dir(vector);
			break;
		}
		checked++;

		if (checked === 5000000) {
			Mx1++;
			checkedAll = checkedAll.plus(checked);
			checked = 0;
			console.log(`${Mx1}M completed`, vector.join(''), '+' + ((Date.now() - now) / 1000) + 's');
			now = Date.now();
		}
	}

	checkedAll = checkedAll.plus(checked);
	checked = 0;
	console.log(`100% completed`);

	console.log(`Проверено ${checkedAll.toString(10)} полиномов`);
	console.timeEnd('Проверка полиномов степени ' + d + ' завершена');
	console.log();
	console.log();
}
