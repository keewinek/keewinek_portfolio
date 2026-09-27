import { useEffect } from "preact/hooks";

export default function Redirect({ url }: { url: string }) {
	useEffect(() => {
		globalThis.location.href = url;
	}, [url]);

	return null;
}
