import Monomial from './core/monomial';

const m1 = new Monomial(7);

m1.vector[1] = 1;
m1.vector[2] = 1;
m1.vector[4] = 1;

const m2 = Monomial.from([0, 1, 0, 0, 0, 0, 1]);
const m3 = Monomial.from(3, 7);
console.dir(m3);


const r = m1.multiply(m2).multiply(m3);

console.dir({r});

r.toString(true);
