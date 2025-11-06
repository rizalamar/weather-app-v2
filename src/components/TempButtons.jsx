import React from "react";

export default function TempButtons(props) {
	const { unit, setUnit } = props;
	return (
		<div className="flex items-center gap-2 my-2">
			<button
				className={`px-4 py-2 rounded font-semibold ${
					unit === "C" ? "bg-amber-300" : "bg-neutral-200"
				} cursor-pointer text-slate-950`}
				onClick={() => setUnit("C")}
				type="button"
			>
				Celcius
			</button>
			<button
				className={`px-4 py-2 rounded font-semibold ${
					unit === "F" ? "bg-amber-300" : "bg-neutral-200"
				} cursor-pointer text-slate-950`}
				onClick={() => setUnit("F")}
				type="button"
			>
				Fahrenheit
			</button>
		</div>
	);
}
