import * as assert from 'assert';


export default class Monomial {
	public vector: number[];

	constructor(public readonly size: number) {
		assert.ok(this.size > 0);

		this.vector = new Array(size).fill(0);
	}

	get order(): number {
		return parseInt(this.vector.slice().reverse().join(''), 2);
	}

	get deg(): number {
		return this.vector.reduce(function (deg: number, current: number): number {
			return deg + (current ? 1 : 0);
		});
	}

	static from(order: number, size: number): Monomial;

	static from(vector: number[]): Monomial;

	static from(input: number[] | number, size?: number): Monomial {
		let vector: number[];
		if (typeof input === 'number') {
			assert.ok(size);
			const s = size || 0;
			assert.ok(s >= 0);
			assert.ok(input >= 0);
			assert.ok(input < Math.pow(2, s));

			vector = input.toString(2).padStart(s, '0').split('').reverse().map(Number);
		} else {
			vector = input;
		}

		const _size = size || vector.length;
		assert.ok(_size > 0);

		const result = new Monomial(_size);

		for (let i = 0; i < _size; i++) {
			if (vector[i]) {
				result.vector[i] = 1;
			}
		}

		return result;
	}

	copy(): Monomial {
		return Monomial.from(this.vector);
	}

	multiply(m: Monomial): Monomial {
		assert.strictEqual(m.size, this.size);

		const result = new Monomial(this.size);
		for (let i = 0; i < this.size; i++) {
			result.vector[i] = (this.vector[i] + m.vector[i]) ? 1 : 0;
		}

		return result;
	}

	toString(print?: boolean): string {
		let string = '';
		for (let i = 0; i < this.size; i++) {
			if (this.vector[i]) {
				string += `x${i + 1}`;
			}
		}

		string = string || '1';

		if (print) {
			console.log(string);
		}

		return string;
	}

	toTex(): string {
		let string = '';
		for (let i = 0; i < this.size; i++) {
			if (this.vector[i]) {
				string += `x_{${i + 1}}`;
			}
		}

		string = string || '1';

		return string;
	}

	static CompareMonomials(left: Monomial, right: Monomial): number {
		assert.strictEqual(left.size, right.size);

		const lDeg = left.deg;
		const rDeg = right.deg;

		if (lDeg !== rDeg) {
			return lDeg - rDeg;
		}

		for (let i = 0; i < left.size; i++) {
			if (left.vector[i] > right.vector[i]) {
				return -1;
			}
			if (left.vector[i] < right.vector[i]) {
				return 1;
			}
		}

		return 0;
	}

	static GenerateSortedMonomials(size: number): Monomial[] {
		const length = Math.pow(2, size);
		const allMonomials: Monomial[] = Array.from(new Array(length), function (u, order: number): Monomial {
			return Monomial.from(order, size);
		});

		return allMonomials.sort(Monomial.CompareMonomials);
	}

	static GenerateSortedMap(size: number): {orderedToSorted: number[], sortedToOrdered: number[]} {
		const length = Math.pow(2, size);

		const orderedToSorted = new Array(length).fill(0);
		const sortedToOrdered = new Array(length).fill(0);

		const sortedMonomials = Monomial.GenerateSortedMonomials(size);

		for (let position = 0; position < sortedMonomials.length; position++) {
			const order = sortedMonomials[position].order;
			orderedToSorted[order] = position;
			sortedToOrdered[position] = order;
		}

		return {orderedToSorted, sortedToOrdered};
	}
}
