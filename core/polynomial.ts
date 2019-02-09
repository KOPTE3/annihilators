import * as assert from 'assert';
import Monomial from './monomial';

export default class Polynomial {
	public vector: number[] = [];

	constructor(public readonly size: number) {
		assert.ok(this.size > 0);

		this.vector = new Array(Math.pow(2, size)).fill(0);
	}

	get length(): number {
		return this.vector.length;
	}

	static from(vector: number[], size: number): Polynomial {
		assert.strictEqual(vector.length, Math.pow(2, size));

		const result = new Polynomial(size);
		for (let i = 0; i < result.length; i++) {
			result.vector[i] = vector[i] ? 1 : 0;
		}
		return result;
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
