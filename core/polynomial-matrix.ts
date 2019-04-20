import * as assert from 'assert';
import Monomial from './monomial';
import * as math from 'mathjs';
import {Matrix} from 'mathjs';
import Polynomial from './polynomial';
import gaussAlgorithm, {rank} from './gauss-algorithm';
import * as memoizee from 'memoizee';

const C = memoizee(math.combinations, { primitive: true });
function calc_ (alphaRank, size) {
	let sum = 0;
	for (let r = 0; r <= size; r++) {
		sum += C(size, r) as number;

		if (alphaRank <= sum) {
			return r;
		}
	}

	throw new Error(`Все векторы в матрице линейного преобразования полинома линейно независимы`);
}

const calc = memoizee(calc_, { primitive: true });

export default class PolynomialMatrix {
	public matrix: Matrix;
	private readonly monomials: Monomial[];

	public preparedMatrices: Matrix[] | null = null;

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

	prepareSymmetric(): void {
		this.preparedMatrices = [];
		const length = this.size + 1;
		for (let i = 0; i < length; i++) {
			const vector: number[] = (new Array(length)).fill(0);
			vector[i] = 1;

			const symmetric = Polynomial.symmetric(this.size, vector);
			const pMatrix = new PolynomialMatrix(this.size);
			pMatrix.calculate(symmetric);

			this.preparedMatrices.push(pMatrix.matrix.clone());
		}
	}

	calculateSymmetric(kvector) {
		if (!this.preparedMatrices) {
			this.prepareSymmetric();
		}
		let matrix = math.matrix(math.zeros(this.length, this.length));

		for (let i = 0; i < kvector.length; i++) {
			if (kvector[i]) {
				matrix = math.add(matrix, this.preparedMatrices![i]) as Matrix;
			}
		}

		matrix.forEach((a: any, b: any, m: Matrix) => {
			m.set(b, a % 2);
		}, true);
		this.matrix = matrix;
	}

	plusOneSymmetric() {
		for (let row = 0; row < this.length; row++) {
			const initial = this.matrix.get([row, row]);
			this.matrix.set([row, row], initial ? 0 : 1);
		}
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

	plusOne() {
		this._polynomial.append(Monomial.from(0, this.size));

		for (let row = 0; row < this.length; row++) {
			const initial = this.matrix.get([row, row]);
			this.matrix.set([row, row], initial ? 0 : 1);
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
		return calc(alphaRank, this.size);
	}
}
