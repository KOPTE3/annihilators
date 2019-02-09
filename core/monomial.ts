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
			assert.ok(input >= 0);

			vector = input.toString(2).padStart(size || 0, '0').split('').reverse().map(Number);
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
}
