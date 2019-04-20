import Polynomial from '../core/polynomial';
import PolynomialMatrix from '../core/polynomial-matrix';

const kv = [ 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1 ];
const size = kv.length - 1;

const p = Polynomial.symmetric(size, kv);
const pm = new PolynomialMatrix(size);

pm.calculate(p);
console.log('size', pm.matrix.size());
console.log('a(f)', pm.af());
