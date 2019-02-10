// import './tasks/generate-all';

import Polynomial from './core/polynomial';

const p = new Polynomial(4);

p.vector[0] = 1;
p.vector[1] = 1;
p.vector[2] = 1;
p.vector[4] = 1;
p.vector[8] = 1;
p.vector[3] = 1;

console.log(p.sort().join('+'))
