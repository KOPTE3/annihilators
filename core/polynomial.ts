import * as assert from 'assert';
import Monomial from './monomial';
import {bitCount} from './utils/bit-count';
import {perf, perfEnd} from './utils/perf';
import {binomials} from './utils/binomials';

export default class Polynomial {
	public vector: number[] = [];

	constructor(public readonly size: number) {
		assert.ok(this.size > 0);

		this.vector = new Array(Math.pow(2, size)).fill(0);
	}

	get length(): number {
		return this.vector.length;
	}

	get deg(): number {
		return this.vector.reduce(function (deg, value, order) {
			if (value) {
				return Math.max(deg, bitCount(order));
			}

			return deg;
		}, 0);
	}

	get minDeg(): number {
		return this.vector.reduce(function (deg, value, order) {
			if (value) {
				return Math.min(deg, bitCount(order));
			}

			return deg;
		}, 0);
	}

	static from(vector: number[], size: number): Polynomial {
		assert.strictEqual(vector.length, Math.pow(2, size));

		const result = new Polynomial(size);
		for (let i = 0; i < result.length; i++) {
			result.vector[i] = vector[i] ? 1 : 0;
		}
		return result;
	}

	static* Vectors(size: number) {
		const length = Math.pow(2, size);
		const vector: number[] = (new Array(length)).fill(0);

		while (!vector.every(v => v === 1)) {
			yield vector;
			perf('inc');
			for (let i = 0; i < vector.length; i++) {
				if (vector[i]) {
					vector[i] = 0;
				} else {
					vector[i] = 1;
					break;
				}
			}
			perfEnd('inc');
		}

		yield vector;
	}

	static* DegVectors(size: number, deg: number, mapped?: boolean) {
		const length = Math.pow(2, size);
		const partSizes = binomials(size);
		let fromIndex = 0;
		let toIndex = 0;
		for (let i = 0; i <= deg; i++) {
			if (i < deg) {
				fromIndex += partSizes[i];
			}
			if (i <= deg) {
				toIndex += partSizes[i];
			}

		}
		const vector: number[] = (new Array(length)).fill(0);
		vector[fromIndex] = 1;

		const maps = Monomial.GenerateSortedMap(size);

		function m(initialVector: number[]): number[] {
			const mappedVector: number[] = (new Array(length)).fill(0);
			initialVector.forEach((value, position) => mappedVector[maps.sortedToOrdered[position]] = value);
			return mappedVector;
		}

		while (vector[toIndex] !== 1) {
			if (mapped) {
				yield m(vector);
			} else {
				yield vector;
			}

			for (let i = 0; i < vector.length; i++) {
				if (vector[i]) {
					vector[i] = 0;
				} else {
					vector[i] = 1;
					break;
				}
			}
		}
	}

	static* SymmetricVectors(size: number) {
		assert.ok(size > 0);
		assert.ok(size < 32);

		let bitmask = 1;
		const length = size + 1;

		const bits: number[] = [];
		for (let i = 0; i < length; i++) {
			bits[i] = 1 << i;
		}

		const threshold = 1 << length;

		while (!(bitmask & threshold)) {
			const vector: number[] = (new Array(length)).fill(0);
			for (let i = 0; i < length; i++) {
				vector[i] = (bitmask & bits[i]) ? 1 : 0;
			}
			yield vector;
			bitmask++;
		}
	}

	static* SymmetricVectors2(size: number) {
		assert.ok(size > 0);
		assert.ok(size < 32);

		let bitmask = 2;
		const length = size + 1;

		const bits: number[] = [];
		for (let i = 0; i < length; i++) {
			bits[i] = 1 << i;
		}

		const threshold = 1 << length;

		while (!(bitmask & threshold)) {
			const vector: number[] = (new Array(length)).fill(0);
			for (let i = 0; i < length; i++) {
				vector[i] = (bitmask & bits[i]) ? 1 : 0;
			}
			yield vector;
			bitmask += 2;
		}
	}

	static symmetric(size: number, kvector: number[]): Polynomial {
		assert.ok(size > 0);
		assert.strictEqual(kvector.length, size + 1);

		const length = Math.pow(2, size);

		const vector: number[] = (new Array(length)).fill(0);
		const maps = Monomial.GenerateSortedMap(size);
		const partSizes = binomials(size);

		let currentIndex = 0;

		for (let i = 0; i <= kvector.length; i++) {
			if (kvector[i]) {
				for (let j = 0; j < partSizes[i]; j++) {
					vector[currentIndex + j] = 1;
				}
			}

			currentIndex += partSizes[i];
		}

		function m(initialVector: number[]): number[] {
			const mappedVector: number[] = (new Array(length)).fill(0);
			initialVector.forEach((value, position) => mappedVector[maps.sortedToOrdered[position]] = value);
			return mappedVector;
		}

		const mapped = m(vector);
		return Polynomial.from(mapped, size);
	}

	static GeneratePolynomials(size: number): Polynomial[] {
		assert.ok(size > 0);

		const result: Polynomial[] = [];

		for (let vector of Polynomial.Vectors(size)) {
			result.push(Polynomial.from(vector, size));
		}

		return result;
	}

	isZero(): boolean {
		return this.vector.every(bit => bit === 0);
	}

	append(m: Monomial): Polynomial {
		const order = m.order;

		this.vector[order] = this.vector[order] ? 0 : 1;
		return this;
	}

	copy(): Polynomial {
		const result = new Polynomial(this.size);
		for (let i = 0; i < result.length; i++) {
			result.vector[i] = this.vector[i];
		}

		return result;
	}

	add(p: Polynomial): Polynomial {
		assert.strictEqual(p.size, this.size);

		const result = new Polynomial(this.size);
		const l = result.length;
		for (let i = 0; i < l; i++) {
			const m1 = this.vector[i] === 0;
			const m2 = p.vector[i] === 0;
			const r = m1 !== m2;
			result.vector[i] = r ? 1 : 0;
		}

		return result;
	}

	multiply(p: Polynomial): Polynomial {
		assert.strictEqual(p.size, this.size);

		const result = new Polynomial(this.size);
		const l = result.length;
		const s = this.size;

		const firstMonomials: Monomial[] = [];
		const secondMonomials: Monomial[] = [];

		for (let i = 0; i < l; i++) {
			if (p.vector[i]) {
				firstMonomials.push(Monomial.from(i, s));
			}
			if (this.vector[i]) {
				secondMonomials.push(Monomial.from(i, s));
			}
		}

		for (const firstMonomial of firstMonomials) {
			for (const secondMonomial of secondMonomials) {
				result.append(firstMonomial.multiply(secondMonomial));
			}
		}

		return result;
	}

	toString(print?: boolean): string {
		let string = '';
		let parts: string[] = [];

		for (let i = 0; i < this.length; i++) {
			if (this.vector[i]) {
				parts.push(Monomial.from(i, this.size).toString());
			}
		}

		string = parts.join('+');

		string = string || '0';

		if (print) {
			console.log(string);
		}

		return string;
	}

	toTex(): string {
		let string = '';
		let parts: string[] = [];

		for (let i = 0; i < this.length; i++) {
			if (this.vector[i]) {
				parts.push(Monomial.from(i, this.size).toTex());
			}
		}

		string = parts.join(' + ');

		string = string || '0';

		return string;
	}

	sort(): Monomial[] {
		let sorted: Monomial[] = [];

		for (let i = 0; i < this.length; i++) {
			if (this.vector[i]) {
				sorted.push(Monomial.from(i, this.size));
			}
		}

		return sorted.sort(Monomial.CompareMonomials);
	}
}
