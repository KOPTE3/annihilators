import * as fs from 'fs';
import * as path from 'path';

function template(tex: string): string {
	return `<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title></title>
	<script src="vendor/math.js"></script>
	<script src="vendor/MathJax.js?config=TeX-MML-AM_CHTML"></script>
</head>
<body>

<main>
${tex}
</main>


</body>
</html>
`
}

export function printTex(name, tex) {
	const content = template(tex);

	fs.writeFileSync(path.resolve(__dirname, '..', 'public', `${name}.html`), content, 'utf8');
}
