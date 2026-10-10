/** Minimal HTML templating: `html` escapes interpolated values unless they came from `html` or `raw`. */
class Raw {
	constructor(value) {
		this.value = value;
	}
	toString() {
		return this.value;
	}
}

export const raw = (value) => new Raw(String(value));

export const esc = (value) =>
	String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function render(value) {
	if (value == null || value === false) return "";
	if (value instanceof Raw) return value.value;
	if (Array.isArray(value)) return value.map(render).join("");
	return esc(value);
}

export function html(strings, ...values) {
	let out = strings[0];
	values.forEach((v, i) => {
		out += render(v) + strings[i + 1];
	});
	return new Raw(out);
}

/** Space-joined class list that skips falsy entries. */
export const cx = (...parts) => parts.filter(Boolean).join(" ");
