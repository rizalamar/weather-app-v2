import { useState, useEffect } from "react";
import {
	getDate,
	getIcon,
	getDay,
	getTextColor,
	getBackgroundWeather,
	convertTemp,
} from "../utils/helper";

export function useWeather() {
	const [inputValue, setInputValue] = useState("");
	const [displayCity, setDisplayCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [unit, setUnit] = useState("C");
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const savedWeather = localStorage.getItem("weather-v2");
		if (savedWeather) setWeather(JSON.parse(savedWeather));
		const savedHistory = localStorage.getItem("weather-history");
		if (savedHistory) setHistory(JSON.parse(savedHistory));
	}, []);

	useEffect(() => {
		if (weather)
			localStorage.setItem("weather-v2", JSON.stringify(weather));
	}, [weather]);

	useEffect(() => {
		localStorage.setItem("weather-history", JSON.stringify(history));
	}, [history]);

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
			addToHistory(inputValue);
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

	function addToHistory(city) {
		if (!city || history.includes(city)) return;
		const newHistory = [city, ...history].slice(0, 5);
		setHistory(newHistory);
	}

	return {
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
	};
}
