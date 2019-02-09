import * as assert from 'assert';
import Monomial from './monomial';
import {Matrix} from 'mathjs';
import * as math from 'mathjs';
import Polynomial from './polynomial';

export default class PolynomialMatrix {
	private readonly monomials: Monomial[];
	private _polynomial: Polynomial;
	public matrix: Matrix;

	public get length(): number {
		return this.monomials.length;
	}

	public get polynomial(): Polynomial {
		return this._polynomial;
	}

	public set polynomial(polynomial: Polynomial) {
		this.calculate(polynomial);
	}

	calculate(polynomial: Polynomial) {
		assert.strictEqual(polynomial.size, this.size);

		this._polynomial = polynomial;
		this.matrix = math.matrix(math.zeros(this.size, this.size));

		for (let row = 0; row < this.length; row++) {
			const multiplier = new Polynomial(this.size);
			const rowMonomial = this.monomials[row];

			multiplier.vector[rowMonomial.order] = 1;
			const result = polynomial.multiply(multiplier);

			for (let column = 0; column < this.length; column++) {
				const columnMonomial = this.monomials[column];

				this.matrix.set([row, column], result.vector[columnMonomial.order]);
			}
		}
	}

	constructor(public readonly size: number) {
		assert.ok(this.size > 0);

		this.monomials = Monomial.GenerateSortedMonomials(size);
		this.matrix = math.matrix(math.zeros(size, size));
	}

	print() {
		console.log(this.monomials.join('  '));

		for (let row = 0; row < this.length; row++) {
			const column = this.matrix.toArray()[row];
			console.log(column.join('  '));

		}
	}
}
