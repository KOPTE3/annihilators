import Polynomial from '../core/polynomial';
import PolynomialMatrix from '../core/polynomial-matrix';
import {gaussAlgorithm} from '../core/gauss-algorithm';

const size = 5;
const vector = [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const polynomial = Polynomial.from(vector, size);
const pm = new PolynomialMatrix(size);

pm.calculate(polynomial);

polynomial.toString(true);
pm.print();


