import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import WeatherForecast from "./components/WeatherForecast";

import {
	getDate,
	getIcon,
	getDay,
	getTextColor,
	getBackgroundWeather,
	convertTemp,
} from "./utils/helper";
import SkeletonCard from "./components/SkeletonCard";
import TempButtons from "./components/TempButtons";

export default function App() {
	const [inputValue, setInputValue] = useState("");
	const [displayCity, setDisplayCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [unit, setUnit] = useState("C");
	const [history, setHistory] = useState([]);
	const [showHistory, setShowHistory] = useState(false);

	const currentIcon = weather?.currentConditions?.icon;
	const bgClass = getBackgroundWeather(currentIcon);
	const textClass = getTextColor(currentIcon);

	async function getWeather(e) {
		e.preventDefault();
		setError("");

		if (!inputValue.trim()) {
			setError("Please enter a right city!");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch(
				`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?unitGroup=metric&key=6LNQR3QLVDC6F2VXYAVH3XUPJ`
			);
			if (!res.ok) throw new Error("City not found.");
			const data = await res.json();
			setWeather(data);
			setDisplayCity(inputValue);
			setInputValue("");
		} catch (error) {
			if (error.message === "City not found.") {
				setError("City not found. Try something else.");
			} else if (error.message === "Failed to fetch") {
				setError(
					"Unable to connect to server. Please check your internet connection."
				);
			} else {
				setError("An error occured. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	}

	//ambil data dari localStorage
	useEffect(() => {
		const savedHistory = localStorage.getItem("weather-history-v2");
		if (savedHistory) setHistory(JSON.parse(savedHistory));
	}, []);

	//simpan data saat fetch berhasil
	useEffect(() => {
		if (weather) {
			// kalau sudah ada data dengan nama kota yang sama, jangan tambahkan
			const alreadyExists = history.some(
				(item) => item.resolvedAddress === weather.resolvedAddress
			);

			if (!alreadyExists) {
				//tambahkan weather baru diatas list
				const newHistory = [weather, ...history];

				//batasi hanya 5 history
				const limitedHistory = newHistory.slice(0, 5);

				//simpan ke state dan localStorage
				setHistory(limitedHistory);
				localStorage.setItem(
					"weather-history-v2",
					JSON.stringify(limitedHistory)
				);
			}
		}
	}, [weather]);

	function toggleHistory() {
		setShowHistory((prev) => !prev);
	}

	function handleSelectHistory(item) {
		setWeather(item);
		setDisplayCity(item.address);
		setShowHistory(false);
	}

	useEffect(() => {
		const savedWeather = localStorage.getItem("weather-v2");
		if (savedWeather) setWeather(JSON.parse(savedWeather));
	}, []);

	useEffect(() => {
		if (weather)
			localStorage.setItem("weather-v2", JSON.stringify(weather));
		console.log("data weather: ", weather);
	}, [weather]);

	return (
		<main
			className={`min-h-screen max-w-full w-full mx-auto flex flex-col items-center ${bgClass} ${textClass} transition-colors duration-700`}
		>
			<button
				onClick={toggleHistory}
				className="absolute px-4 py-2 font-semibold transition rounded cursor-pointer top-6 right-6 bg-amber-300 hover:bg-amber-200 text-neutral-900"
			>
				History
			</button>

			<div
				className={`fixed top-0 right-0 w-72 h-full bg-white/90 backdrop-blur-lg shadow-lg p-4 overflow-y-auto transform transition-all duration-500 ease-in-out z-50 ${
					showHistory
						? "translate-x-0 opacity-100"
						: "translate-x-full opacity-0"
				}`}
			>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-800">
						Recent History
					</h2>
					<button
						className="px-4 py-2 text-sm font-bold text-gray-600 cursor-pointer hover:text-gray-800"
						onClick={() => setShowHistory(false)}
					>
						X
					</button>
				</div>

				{history.length === 0 ? (
					<p className="text-sm text-gray-500">No history yet</p>
				) : (
					<ul>
						{history.map((item, index) => {
							<li
								key={index}
								onClick={() => handleSelectHistory(item)}
								className="p-3 transition bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
							>
								<p className="font-medium ">
									{item.resolvedAddress}
								</p>
								<p className="text-sm text-gray-600">
									{item.currentConditions?.conditions} -{" "}
									{Math.round(item.currentConditions?.temp)}°C
								</p>
							</li>;
						})}
					</ul>
				)}
			</div>

			<WeatherForm
				getWeather={getWeather}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>

			{error && <p className="font-medium text-red-600">{error}</p>}

			{loading ? (
				<SkeletonCard />
			) : (
				<div className="flex flex-col items-center gap-10">
					<WeatherCard
						city={displayCity}
						getDate={getDate}
						weather={weather}
						getIcon={getIcon}
						unit={unit}
						convertTemp={convertTemp}
						className="animate-fade-in"
					/>
					<TempButtons unit={unit} setUnit={setUnit} />
					<WeatherForecast
						weather={weather}
						getIcon={getIcon}
						getDay={getDay}
						unit={unit}
						convertTemp={convertTemp}
					/>
				</div>
			)}
		</main>
	);
}
