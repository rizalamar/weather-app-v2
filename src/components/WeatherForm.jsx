import React from "react";

export default function WeatherForm(props) {
	const { getWeather, inputValue, setInputValue } = props;
	return (
		<form onSubmit={getWeather} className="flex gap-2 my-6">
			<input
				aria-label="City name"
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Enter location..."
				className="flex-1 px-4 py-2 text-2xl rounded text-neutral-800 bg-neutral-50 focus:outline-none"
			/>

			<button
				aria-label="Find weather"
				type="submit"
				className="px-4 py-2 font-semibold rounded cursor-pointer text-neutral-950 bg-amber-300 hover:bg-amber-200"
			>
				Find
			</button>
		</form>
	);
}
