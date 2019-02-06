import Monomial from './core/monomial';

const SIZE = 6;

for (let order = 0; order < 64; order++) {
	Monomial.from(order, SIZE).toString(true);
}
