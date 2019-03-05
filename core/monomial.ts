import * as assert from 'assert';
import {bitCount} from './utils/bit-count';


export default class Monomial {
	private _order: number = 0;

	public get vector(): number[] {
		return this._order.toString(2).padStart(this.size, '0').split('').reverse().map(Number);
	}

	constructor(public readonly size: number) {
		assert.ok(this.size > 0);
	}

	get order(): number {
		return this._order;
	}

	get deg(): number {
		return bitCount(this._order);
	}

	static from(order: number, size: number): Monomial;

	static from(vector: number[]): Monomial;

	static from(input: number[] | number, size?: number): Monomial {
		let order: number;
		let inputSize = 0;
		if (typeof input === 'number') {
			assert.ok(size);
			const s = size || 0;
			assert.ok(s >= 0);
			assert.ok(input >= 0);
			assert.ok(input < Math.pow(2, s));

			order = input;
		} else {
			inputSize = input.length;
			order = parseInt(input.slice().reverse().join(''), 2);
		}

		const _size = size || inputSize;
		assert.ok(_size > 0);

		const result = new Monomial(_size);
		result._order = order;

		return result;
	}

	copy(): Monomial {
		return Monomial.from(this._order, this.size);
	}

	multiply(m: Monomial): Monomial {
		assert.strictEqual(m.size, this.size);

		const result = this._order | m.order;

		return Monomial.from(result, this.size);
	}

	toString(print?: boolean): string {
		const v = this.vector;
		let string = '';
		for (let i = 0; i < this.size; i++) {
			if (v[i]) {
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
		const v = this.vector;
		let string = '';
		for (let i = 0; i < this.size; i++) {
			if (v[i]) {
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

		const lV = left.vector;
		const rV = right.vector;

		for (let i = 0; i < left.size; i++) {
			if (lV[i] > rV[i]) {
				return -1;
			}
			if (lV[i] < rV[i]) {
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
