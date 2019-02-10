import * as assert from 'assert';
import Monomial from './monomial';
import * as math from 'mathjs';
import {Matrix} from 'mathjs';
import Polynomial from './polynomial';
import gaussAlgorithm, {rank} from './gauss-algorithm';

export default class PolynomialMatrix {
	public matrix: Matrix;
	private readonly monomials: Monomial[];

	constructor(public readonly size: number) {
		assert.ok(this.size > 0);

		this.monomials = Monomial.GenerateSortedMonomials(size);
		this.matrix = math.matrix(math.zeros(size, size));
	}

	private _polynomial: Polynomial;

	public get polynomial(): Polynomial {
		return this._polynomial;
	}

	public set polynomial(polynomial: Polynomial) {
		this.calculate(polynomial);
	}

	public get length(): number {
		return this.monomials.length;
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

	print() {
		console.log(this.monomials.join('  '));

		for (let row = 0; row < this.length; row++) {
			const column = this.matrix.toArray()[row];
			console.log(column.join('  '));

		}
	}

	alphaRank(): number {
		const array: number[][] = this.matrix.toArray() as any;
		const subarray: number[][] = [];

		for (let row = 0; row < this.length; row++) {
			subarray.push(array[row]);

			const trapezoidMatrix = gaussAlgorithm(math.matrix(subarray));
			const r = rank(trapezoidMatrix);

			if (r < row + 1) {
				return row + 1;
			}
		}

		return this.length + 1;
	}

	af(): number {
		const alphaRank = this.alphaRank();
		let sum = 0;
		for (let r = 0; r <= this.size; r++) {
			sum += math.combinations(this.size, r) as number;

			if (alphaRank <= sum) {
				return r;
			}
		}

		throw new Error(`Все векторы в матрице линейного преобразования полинома линейно независимы`);
	}
}
