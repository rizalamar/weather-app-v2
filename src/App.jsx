import React from "react";
import { useWeather } from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import WeatherForecast from "./components/WeatherForecast";
import SkeletonCard from "./components/SkeletonCard";

export default function App() {
	const {
		inputValue,
		setInputValue,
		displayCity,
		weather,
		error,
		loading,
		unit,
		setUnit,
		history,
		getWeather,
		getDate,
		getIcon,
		getDay,
		getTextColor,
		getBackgroundWeather,
		convertTemp,
	} = useWeather();

	const currentIcon = weather?.currentConditions?.icon;
	const bgClass = getBackgroundWeather(currentIcon);
	const textClass = getTextColor(currentIcon);

	return (
		<main
			className={`min-h-screen max-w-full w-full mx-auto flex flex-col items-center ${bgClass} ${textClass} transition-colors duration-700`}
		>
			<WeatherForm
				getWeather={getWeather}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
			{history.length > 0 && (
				<div className="flex flex-wrap gap-2 my-2">
					{history.map((city) => (
						<button
							key={city}
							className="px-2 py-1 rounded bg-neutral-200"
							onClick={() => setInputValue(city)}
							type="button"
						>
							{city}
						</button>
					))}
				</div>
			)}
			{error && <p className="font-medium text-red-600">{error}</p>}
			{loading ? (
				<SkeletonCard />
			) : (
				<>
					<div className="flex items-center gap-2 my-2">
						<button
							className={`px-2 py-1 rounded ${
								unit === "C" ? "bg-amber-300" : "bg-neutral-200"
							}`}
							onClick={() => setUnit("C")}
							type="button"
						>
							°C
						</button>
						<button
							className={`px-2 py-1 rounded ${
								unit === "F" ? "bg-amber-300" : "bg-neutral-200"
							}`}
							onClick={() => setUnit("F")}
							type="button"
						>
							°F
						</button>
					</div>
					<WeatherCard
						city={displayCity}
						getDate={getDate}
						weather={weather}
						getIcon={getIcon}
						unit={unit}
						convertTemp={convertTemp}
					/>
					<WeatherForecast
						weather={weather}
						getIcon={getIcon}
						getDay={getDay}
						unit={unit}
						convertTemp={convertTemp}
					/>
				</>
			)}
		</main>
	);
}
