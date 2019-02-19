import Polynomial from '../core/polynomial';
import * as assert from 'assert';


const SIZE = 8;
const kVector = [ 0, 1, 0, 1, 0, 0, 0, 0, 0 ];

const multiplierVector: number[] = (new Array(SIZE + 1)).fill(0);
multiplierVector[2] = 1;
const multiplier = Polynomial.symmetric(SIZE, multiplierVector);
const p = Polynomial.symmetric(SIZE, kVector);

const minDeg = p.minDeg;
console.log({minDeg});


multiplier.toString(true);
console.log(p.sort().join('+'));

const result = p.multiply(multiplier);

result.toString(true);
