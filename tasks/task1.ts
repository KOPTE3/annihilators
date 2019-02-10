import Polynomial from '../core/polynomial';
import PolynomialMatrix from '../core/polynomial-matrix';

const size = 5;
const vector = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const polynomial = Polynomial.from(vector, size);
const pm = new PolynomialMatrix(size);

console.time('calculate');
pm.calculate(polynomial);
console.timeEnd('calculate');

polynomial.toString(true);
pm.print();

console.time('alphaRank');
const alphaRank = pm.alphaRank();
console.timeEnd('alphaRank');


console.dir({alphaRank});
