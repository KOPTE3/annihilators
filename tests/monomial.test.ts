import Monomial from '../core/monomial';

test('new Monomial', function () {
	const m = new Monomial(7);
	expect(m.size).toEqual(7);
	expect(m.vector).toEqual([0, 0, 0, 0, 0, 0, 0]);
});

test('#from', function () {
	const m = Monomial.from([0, 0, 0, 0, 0, 0, 0]);
	expect(m.size).toEqual(7);
	expect(m.vector).toEqual([0, 0, 0, 0, 0, 0, 0]);
});

test('#from', function () {
	const m = Monomial.from(0, 7);
	expect(m.size).toEqual(7);
	expect(m.vector).toEqual([0, 0, 0, 0, 0, 0, 0]);
});

test('#from', function () {
	const m = Monomial.from(3, 7);
	expect(m.size).toEqual(7);
	expect(m.vector).toEqual([1, 1, 0, 0, 0, 0, 0]);
});

test('#from', function () {
	const m = Monomial.from(127, 7);
	expect(m.size).toEqual(7);
	expect(m.vector).toEqual([1, 1, 1, 1, 1, 1, 1]);
});

test('#from', function () {
	const m = Monomial.from(126, 7);
	expect(m.size).toEqual(7);
	expect(m.vector).toEqual([0, 1, 1, 1, 1, 1, 1]);
});

test('#toString', function () {
	let m: Monomial;

	const strings = [
		'1',
		'x1',
		'x2',
		'x1x2',
		'x3',
		'x1x3',
		'x2x3',
		'x1x2x3',
	];

	m = Monomial.from(0, 3);
	expect(m.toString()).toEqual(strings[0]);

	m = Monomial.from(1, 3);
	expect(m.toString()).toEqual(strings[1]);

	m = Monomial.from(2, 3);
	expect(m.toString()).toEqual(strings[2]);

	m = Monomial.from(3, 3);
	expect(m.toString()).toEqual(strings[3]);

	m = Monomial.from(4, 3);
	expect(m.toString()).toEqual(strings[4]);

	m = Monomial.from(5, 3);
	expect(m.toString()).toEqual(strings[5]);

	m = Monomial.from(6, 3);
	expect(m.toString()).toEqual(strings[6]);

	m = Monomial.from(7, 3);
	expect(m.toString()).toEqual(strings[7]);
});

test('#multiply', function () {
	const m1 = Monomial.from(3, 3);
	const m2 = Monomial.from(5, 3);

	const m = m1.multiply(m2);
	expect(m.size).toEqual(3);
	expect(m.vector).toEqual([1, 1, 1]);
});
