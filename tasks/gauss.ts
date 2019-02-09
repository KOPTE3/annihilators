import {gaussAlgorithm} from '../core/gauss-algorithm';
import {Matrix} from 'mathjs';
import * as math from 'mathjs';


const matrix = math.matrix([
	[1,0,0,1],
	[0,1,0,1],
	[0,0,1,1],
	[0,0,0,0],
]);

const m = gaussAlgorithm(matrix);
const arr: number[][] = m.toArray() as any;
for (let row = 0; row < arr.length; row++) {
	const column = arr[row];
	console.log(column.join(' '));
}
