import * as assert from 'assert';
import * as process from 'process';

const perfs: { [label: string]: [number, number] } = {};
const timers: { [label: string]: [number, number] } = {};

export function perf(label: string) {
	assert.ok(typeof timers[label] === 'undefined');
	perfs[label] = perfs[label] || [0, 0];
	timers[label] = process.hrtime();
}

export function perfEnd(label: string) {
	assert.ok(typeof timers[label] !== 'undefined');
	const now = process.hrtime();
	perfs[label][0] += now[0] - timers[label][0];
	perfs[label][1] += now[1] - timers[label][1];
	if (perfs[label][1] < 0) {
		perfs[label][0]--;
		perfs[label][1] += 1000000000;
	}
	if (perfs[label][1] >= 1000000000) {
		perfs[label][0]++;
		perfs[label][1] -= 1000000000;
	}
	delete timers[label];
}

export function perfPrint() {
	console.dir(perfs);
}
