import {Matrix} from 'mathjs';
import * as assert from 'assert';
import * as math from 'mathjs';


function hasOnes(matrix: number[][], column: number, fromrow: number): number {
	// assert.ok(fromrow < matrix.length);
	for (let row = fromrow; row < matrix.length; row++) {
		if (matrix[row][column] > 0) {
			return row;
		}
	}

	return -1;
}

function swapRows(matrix: number[][], r1: number, r2: number): number[][] {
	if (r1 !== r2) {
		const row1 = matrix[r1];
		const row2 = matrix[r2];
		matrix[r1] = row2;
		matrix[r2] = row1;
	}

	return matrix;
}

function sumRows(matrix: number[][], targetRow: number, otherRow: number, fromcolumn = 0): number[][] {
	// assert.strictEqual(matrix[targetRow].length, matrix[otherRow].length);
	for (let column = fromcolumn; column < matrix[targetRow].length; column++) {
		matrix[targetRow][column] += matrix[otherRow][column];

		matrix[targetRow][column] %= 2;
	}

	return matrix;
}

export default function gaussAlgorithm(array: number[][]): {m:number[][]; r:number} {
	const rows = array.length;
	const columns = array[0].length;

	let currentRow = 0;
	let nonZerosLine = -1;
	for (let column = 0; column < columns; column++) {
		if (currentRow >= rows) {
			break;
		}
		const oneRow = hasOnes(array, column, currentRow);
		if (oneRow === -1) {
			continue;
		}

		swapRows(array, oneRow, currentRow);
		nonZerosLine = currentRow;
		for (let row = 0; row < rows; row++) {
			if (row === currentRow) {
				continue;
			}

			if (array[row][column] === 1) {
				sumRows(array, row, currentRow, column);
			}
		}

		currentRow++;
	}

	return {m: array, r: nonZerosLine + 1};
}

export function rank(matrix: Matrix): number {
	const array: number[][] = matrix.toArray() as any;

	const zeroRow = array.findIndex(function (row: number[]) {
		return row.every(cell => cell === 0);
	});

	if (zeroRow === -1) {
		return array.length;
	}

	return zeroRow;
}
