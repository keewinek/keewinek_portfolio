import { useEffect } from "preact/hooks";

export default function Redirect({ url }: { url: string }) {
	useEffect(() => {
		if (typeof window !== "undefined" && window.location) {
			window.location.href = url;
		}
	}, [url]);
	
	return (
		<></>
	);
}