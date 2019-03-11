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

test('#CompareMonomials', function () {
	expect(Monomial.CompareMonomials(
		Monomial.from([0, 0, 0]),
		Monomial.from([0, 0, 0]),
	)).toBe(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([0, 0, 0]),
		Monomial.from([1, 0, 0]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([0, 0, 0]),
		Monomial.from([0, 1, 0]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([0, 0, 0]),
		Monomial.from([0, 0, 1]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([1, 0, 0]),
		Monomial.from([0, 0, 1]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([0, 0, 1]),
		Monomial.from([0, 1, 0]),
	)).toBeGreaterThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([0, 0, 1]),
		Monomial.from([0, 1, 1]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([1, 0, 1]),
		Monomial.from([0, 1, 1]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([1, 1, 1]),
		Monomial.from([1, 1, 1]),
	)).toBe(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([1, 1, 1, 1]),
		Monomial.from([1, 1, 1, 1]),
	)).toBe(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([1, 0, 0, 1]),
		Monomial.from([0, 1, 1, 0]),
	)).toBeLessThan(0);

	expect(Monomial.CompareMonomials(
		Monomial.from([0, 1, 1, 1, 0]),
		Monomial.from([1, 0, 0, 1, 1]),
	)).toBeGreaterThan(0);
});

test('#GenerateSortedMonomials', function () {
	const monomials = Monomial.GenerateSortedMonomials(5);
	const expected = [
		'1',
		'x1', 'x2', 'x3', 'x4', 'x5',
		'x1x2', 'x1x3', 'x1x4', 'x1x5', 'x2x3', 'x2x4', 'x2x5', 'x3x4', 'x3x5', 'x4x5',
		'x1x2x3', 'x1x2x4', 'x1x2x5', 'x1x3x4', 'x1x3x5', 'x1x4x5', 'x2x3x4', 'x2x3x5', 'x2x4x5', 'x3x4x5',
		'x1x2x3x4', 'x1x2x3x5', 'x1x2x4x5', 'x1x3x4x5', 'x2x3x4x5',
		'x1x2x3x4x5',
	];

	expect(monomials.map(m => m.toString())).toEqual(expected);
});

test('#GenerateSortedMap', function () {
	const map = Monomial.GenerateSortedMap(4);

	expect(map).toEqual({
		orderedToSorted: [0, 1, 2, 5, 3, 6, 8, 11, 4, 7, 9, 12, 10, 13, 14, 15],
		sortedToOrdered: [0, 1, 2, 4, 8, 3, 5, 9, 6, 10, 12, 7, 11, 13, 14, 15],
	});
});

test('#deg', function () {
	let m = Monomial.from([0, 0, 0, 0]);
	expect(m.deg).toEqual(0);

	m = Monomial.from([1, 0, 0, 0]);
	expect(m.deg).toEqual(1);

	m = Monomial.from([1, 0, 1, 0]);
	expect(m.deg).toEqual(2);

	m = Monomial.from([1, 1, 1, 1]);
	expect(m.deg).toEqual(4);
});
