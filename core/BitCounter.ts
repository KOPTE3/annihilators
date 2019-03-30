interface BitCounterOpts {
	from: number;
	to: number;
}

const PART_SIZE = 32;
const MAX_PART = 4294967295;
const MAX_PART_MINUS_ONE = 4294967294;

// bit = 0 -> [1, 0, 0, 0]; === 1
// bit = 1 -> [0, 1, 0, 0]; === 2
// bit = 3 -> [0, 0, 1, 0]; === 4
// bit = 4 -> [0, 0, 0, 1]; === 8

export type Bit = 0 | 1;
export type BigNumber = number[];
export type BitArray = Bit[];

const powers: number[] = [];
for (let bit = 0; bit < PART_SIZE; bit++) {
	powers[bit] = 2 ** bit;
}


export function toBigNumber(firstNonZeroBit, length): BigNumber {
	const array = (new Array(length)).fill(0);

	const part = Math.floor(firstNonZeroBit / PART_SIZE);
	const idx = firstNonZeroBit % PART_SIZE;

	array[part] = 2 ** idx;
	return array;
}

export function toBitArray(bigNumber: BigNumber): BitArray {
	const length = bigNumber.length * PART_SIZE;
	const array = (new Array(length)).fill(0);

	bigNumber.forEach(function (numberPart, part) {
		powers.forEach(function (power, idx) {
			array[part * PART_SIZE + idx] = (bigNumber[part] & powers[idx]) === 0 ? 0 : 1;
		})
	});

	return array;
}

export default class BitCounter {
	private readonly from: number;
	private readonly to: number;

	private readonly parts: number;
	private readonly value: BigNumber;

	private readonly toPart: number;
	private readonly toValue: number;

	constructor(opts: BitCounterOpts) {
		this.from = opts.from;
		this.to = opts.to;


		this.parts = Math.ceil(this.to / PART_SIZE);
		this.value = toBigNumber(this.from, this.parts);

		const toNumber = toBigNumber(this.to, this.parts);
		this.toPart = toNumber.findIndex(v => v > 0);
		this.toValue = toNumber[this.toPart];
	}

	public toBitArray(): BitArray {
		return toBitArray(this.value);
	}

	public toBigNumber(): BigNumber {
		return this.value;
	}

	public hasNext(): boolean {
		return this.value[this.toPart] < this.toValue;
	}

	public addOne() {
		let pOne = true;
		for (let i = 0; i < this.parts; i++) {
			if (!pOne) {
				break;
			}
			if (this.value[i] === MAX_PART) {
				this.value[i] = 0;
			} else {
				this.value[i]++;
				pOne = false;
			}
		}
	}

	public addTwo() {
		let pOne = true;
		for (let i = 0; i < this.parts; i++) {
			if (!pOne) {
				break;
			}
			if (this.value[i] === MAX_PART_MINUS_ONE) {
				this.value[i] = 0;
			} else {
				this.value[i]++;
				if (i === 0) {
					this.value[i]++;
				}
				pOne = false;
			}
		}
	}
}
