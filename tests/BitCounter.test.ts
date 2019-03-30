import BitCounter, {toBigNumber, toBitArray} from '../core/BitCounter';

test('toBigNumber', function () {
	expect(toBigNumber(0, 4)).toEqual([1, 0, 0, 0]);
	expect(toBigNumber(1, 4)).toEqual([2, 0, 0, 0]);
	expect(toBigNumber(2, 4)).toEqual([4, 0, 0, 0]);
	expect(toBigNumber(3, 4)).toEqual([8, 0, 0, 0]);
	expect(toBigNumber(4, 4)).toEqual([16, 0, 0, 0]);
	expect(toBigNumber(31, 4)).toEqual([2147483648, 0, 0, 0]);
	expect(toBigNumber(32, 4)).toEqual([0, 1, 0, 0]);
	expect(toBigNumber(63, 4)).toEqual([0, 2147483648, 0, 0]);
	expect(toBigNumber(64, 4)).toEqual([0, 0, 1, 0]);
	expect(toBigNumber(95, 4)).toEqual([0, 0, 2147483648, 0]);
	expect(toBigNumber(96, 4)).toEqual([0, 0, 0, 1]);
	expect(toBigNumber(127, 4)).toEqual([0, 0, 0, 2147483648]);
});

test('toBitArray', function () {
	expect(toBitArray([0])).toEqual(''.padEnd(32, '0').split('').map(Number));
	expect(toBitArray([1])).toEqual('1'.padEnd(32, '0').split('').map(Number));
	expect(toBitArray([2])).toEqual('01'.padEnd(32, '0').split('').map(Number));
	expect(toBitArray([3])).toEqual('11'.padEnd(32, '0').split('').map(Number));
	expect(toBitArray([15])).toEqual('1111'.padEnd(32, '0').split('').map(Number));
	expect(toBitArray([16])).toEqual('00001'.padEnd(32, '0').split('').map(Number));
	expect(toBitArray([2147483648])).toEqual('1'.padStart(32, '0').split('').map(Number));
	expect(toBitArray([4294967295])).toEqual('1'.padStart(32, '1').split('').map(Number));
	expect(toBitArray([0, 1])).toEqual('1'.padEnd(32, '0').padStart(64, '0').split('').map(Number));
	expect(toBitArray([0, 2147483648])).toEqual('1'.padStart(64, '0').split('').map(Number));
	expect(toBitArray([4294967295, 1])).toEqual('1'.padEnd(32, '0').padStart(64, '1').split('').map(Number));
});

test('BitCounter', function () {
	const counter = new BitCounter({from: 1, to: 2});

	expect(counter.toBigNumber()).toEqual([2]);
	expect(counter.hasNext()).toBe(true);

	counter.addOne();
	expect(counter.toBigNumber()).toEqual([3]);
	expect(counter.hasNext()).toBe(true);

	counter.addOne();
	expect(counter.toBigNumber()).toEqual([4]);
	expect(counter.hasNext()).toBe(false);
});

test('BitCounter#addOne', function () {
	const counter = new BitCounter({from: 4, to: 6});
	const numbers: number[] = [];

	while (counter.hasNext()) {
		numbers.push(counter.toBigNumber()[0]);
		counter.addOne();
	}

	expect(numbers).toEqual([16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]);
});

test('BitCounter#addTwo', function () {
	const counter = new BitCounter({from: 4, to: 6});
	const numbers: number[] = [];

	while (counter.hasNext()) {
		numbers.push(counter.toBigNumber()[0]);
		counter.addTwo();
	}

	expect(numbers).toEqual([16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62]);
});
