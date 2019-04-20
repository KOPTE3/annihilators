import {Matrix} from 'mathjs';
import * as math from 'mathjs';
import gaussAlgorithm from '../core/gauss-algorithm';


const matrix = math.matrix([
	[0,1,1,1],
	[1,0,1,1],
]);

// @ts-ignore
const m = gaussAlgorithm(matrix);
// @ts-ignore
const arr: number[][] = m.toArray() as any;
for (let row = 0; row < arr.length; row++) {
	const column = arr[row];
	console.log(column.join(' '));
}
