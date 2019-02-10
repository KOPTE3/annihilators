import Polynomial from '../core/polynomial';
import Monomial from '../core/monomial';


test('new Polynomial', function () {
	const p = new Polynomial(3);
	expect(p.size).toEqual(3);
	expect(p.length).toEqual(8);
	expect(p.vector).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
});

test('#from', function () {
	const p = new Polynomial(3);
	p.append(Monomial.from(0, 3));

	expect(p.vector).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);

	p.append(Monomial.from(0, 3));

	expect(p.vector).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
});

test('#append', function () {
	const p = new Polynomial(3);
	p.append(Monomial.from(0, 3));
	p.append(Monomial.from(3, 3));
	p.append(Monomial.from(4, 3));

	expect(p.vector).toEqual([1, 0, 0, 1, 1, 0, 0, 0]);
});

test('#toString', function () {
	const p = new Polynomial(3);

	expect(p.toString()).toEqual('0');

	p.vector[0] = 1;
	expect(p.toString()).toEqual('1');

	p.vector[0] = 0;
	p.vector[1] = 1;
	expect(p.toString()).toEqual('x1');

	p.vector[1] = 0;
	p.vector[2] = 1;
	expect(p.toString()).toEqual('x2');

	p.vector[2] = 0;
	p.vector[3] = 1;
	expect(p.toString()).toEqual('x1x2');
});

test('#toString', function () {
	const p = new Polynomial(3);

	p.append(Monomial.from(0, 3));
	p.append(Monomial.from(3, 3));
	p.append(Monomial.from(4, 3));

	expect(p.toString()).toEqual('1+x1x2+x3');
});

test('#from', function () {
	const p = Polynomial.from([1, 0, 0, 1, 1, 0, 0, 0], 3);

	expect(p.toString()).toEqual('1+x1x2+x3');
});

test('#add', function () {
	const p1 = new Polynomial(3);
	p1.append(Monomial.from(0, 3));
	p1.append(Monomial.from(3, 3));
	p1.append(Monomial.from(4, 3));

	const p2 = new Polynomial(3);
	p2.append(Monomial.from(0, 3));
	p2.append(Monomial.from(4, 3));
	p2.append(Monomial.from(7, 3));

	const p = p1.add(p2);

	expect(p.vector).toEqual([0, 0, 0, 1, 0, 0, 0, 1]);
});

test('#multiply', function () {
	const p1 = new Polynomial(3);
	p1.append(Monomial.from(0, 3));
	p1.append(Monomial.from(3, 3));
	p1.append(Monomial.from(4, 3));

	const p2 = new Polynomial(3);
	p2.append(Monomial.from(0, 3));
	p2.append(Monomial.from(4, 3));
	p2.append(Monomial.from(7, 3));

	const p = p1.multiply(p2);

	expect(p.vector).toEqual([1, 0, 0, 1, 1, 0, 0, 0]);
});

test('#sort', function () {
	const p = Polynomial.from([1, 0, 0, 1, 1, 0, 0, 0], 3);
	const sorted = p.sort();

	expect(sorted.map(m => m.toString())).toEqual(['1', 'x3', 'x1x2']);
});

test('#DegVectors', function () {
	const vectors: number[][] = [];
	for (let degVector of Polynomial.DegVectors(3, 1)) {
		vectors.push(degVector.slice());
	}

	expect(vectors).toEqual([
		[ 0, 1, 0, 0, 0, 0, 0, 0 ],
		[ 1, 1, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 1, 0, 0, 0, 0, 0 ],
		[ 1, 0, 1, 0, 0, 0, 0, 0 ],
		[ 0, 1, 1, 0, 0, 0, 0, 0 ],
		[ 1, 1, 1, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 1, 0, 0, 0, 0 ],
		[ 1, 0, 0, 1, 0, 0, 0, 0 ],
		[ 0, 1, 0, 1, 0, 0, 0, 0 ],
		[ 1, 1, 0, 1, 0, 0, 0, 0 ],
		[ 0, 0, 1, 1, 0, 0, 0, 0 ],
		[ 1, 0, 1, 1, 0, 0, 0, 0 ],
		[ 0, 1, 1, 1, 0, 0, 0, 0 ],
		[ 1, 1, 1, 1, 0, 0, 0, 0 ],
	]);

	const vectors2: number[][] = [];
	for (let degVector of Polynomial.DegVectors(3, 1, true)) {
		vectors2.push(degVector.slice());
	}

	console.dir(vectors2);
	expect(vectors2).toEqual([
		[ 0, 1, 0, 0, 0, 0, 0, 0 ],
		[ 1, 1, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 1, 0, 0, 0, 0, 0 ],
		[ 1, 0, 1, 0, 0, 0, 0, 0 ],
		[ 0, 1, 1, 0, 0, 0, 0, 0 ],
		[ 1, 1, 1, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 1, 0, 0, 0 ],
		[ 1, 0, 0, 0, 1, 0, 0, 0 ],
		[ 0, 1, 0, 0, 1, 0, 0, 0 ],
		[ 1, 1, 0, 0, 1, 0, 0, 0 ],
		[ 0, 0, 1, 0, 1, 0, 0, 0 ],
		[ 1, 0, 1, 0, 1, 0, 0, 0 ],
		[ 0, 1, 1, 0, 1, 0, 0, 0 ],
		[ 1, 1, 1, 0, 1, 0, 0, 0 ],
	]);
});
