import PolynomialMatrix from '../core/polynomial-matrix';
import Polynomial from '../core/polynomial';
import Monomial from '../core/monomial';

test('#calculate', function () {
	const pm = new PolynomialMatrix(2);

	const p1 = new Polynomial(2);
	p1.append(Monomial.from(0, 2));
	pm.calculate(p1);
	expect(pm.matrix.toArray()).toEqual([
		[1,0,0,0],
		[0,1,0,0],
		[0,0,1,0],
		[0,0,0,1],
	]);

	const p2 = new Polynomial(2);
	p2.append(Monomial.from(3, 2));
	pm.calculate(p2);
	expect(pm.matrix.toArray()).toEqual([
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
	]);

	p2.append(Monomial.from(0, 2));
	pm.calculate(p2);
	expect(pm.matrix.toArray()).toEqual([
		[1,0,0,1],
		[0,1,0,1],
		[0,0,1,1],
		[0,0,0,0],
	]);
});
