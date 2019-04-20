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

test('#calculateSymmetric', function () {
	const pmActual = new PolynomialMatrix(2);
	const pmExpected = new PolynomialMatrix(2);

	pmActual.calculateSymmetric([1, 0, 0]);
	pmExpected.calculate(Polynomial.symmetric(2, [1, 0, 0]));

	expect(pmActual.matrix.toArray()).toEqual(pmExpected.matrix.toArray());

	pmActual.calculateSymmetric([0, 1, 0]);
	pmExpected.calculate(Polynomial.symmetric(2, [0, 1, 0]));

	expect(pmActual.matrix.toArray()).toEqual(pmExpected.matrix.toArray());

	pmActual.calculateSymmetric([0, 1, 1]);
	pmExpected.calculate(Polynomial.symmetric(2, [0, 1, 1]));

	expect(pmActual.matrix.toArray()).toEqual(pmExpected.matrix.toArray());

	pmActual.calculateSymmetric([1, 0, 1]);
	pmExpected.calculate(Polynomial.symmetric(2, [1, 0, 1]));

	expect(pmActual.matrix.toArray()).toEqual(pmExpected.matrix.toArray());


	const pmActualBig = new PolynomialMatrix(4);
	const pmExpectedBig = new PolynomialMatrix(4);

	pmActualBig.calculateSymmetric([1, 0, 0, 1, 1]);
	pmExpectedBig.calculate(Polynomial.symmetric(4, [1, 0, 0, 1, 1]));

	expect(pmActualBig.matrix.toArray()).toEqual(pmExpectedBig.matrix.toArray());
});


test('#plusOne', function () {
	const pm = new PolynomialMatrix(2);

	const p1 = new Polynomial(2);
	p1.append(Monomial.from(3, 2));

	pm.calculate(p1);
	expect(pm.matrix.toArray()).toEqual([
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
	]);

	pm.plusOne();
	expect(pm.matrix.toArray()).toEqual([
		[1,0,0,1],
		[0,1,0,1],
		[0,0,1,1],
		[0,0,0,0],
	]);
});

test('#af', function () {
	const pm = new PolynomialMatrix(2);

	const p2 = new Polynomial(2);
	p2.append(Monomial.from(3, 2));
	pm.calculate(p2);
	expect(pm.af()).toBe(1);

	p2.append(Monomial.from(0, 2));
	pm.calculate(p2);
	expect(pm.af()).toBe(2);

	const p1 = new Polynomial(2);
	p1.append(Monomial.from(0, 2));
	pm.calculate(p1);
	expect(pm.af.bind(pm)).toThrow();
});
