export function getDate(time) {
	const date = new Date(time * 1000);

	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	const formattedDate = date.toLocaleDateString("en-US", options);

	return formattedDate;
}

export function getDay(day) {
	const date = new Date(day);

	const formattedDay = date.toLocaleDateString("en-US", {
		weekday: "short",
	});

	return formattedDay;
}

export function getTextColor(condition = "") {
	const darkBackgrounds = [
		"clear-night",
		"partly-cloudy-night",
		"cloudy",
		"rain",
		"fog",
		"wind",
	];

	return darkBackgrounds.includes(condition)
		? "text-white"
		: "text-neutral-900";
}

export function getBackgroundWeather(condition = "") {
	const weatherBackgrounds = {
		"clear-day": "bg-linear-to-b from-blue-400 to-blue-200",
		"clear-night": "bg-linear-to-b from-indigo-500 to-gray-900",
		"partly-cloudy-day": "bg-linear-to-b from-blue-300 to-gray-200",
		"partly-cloudy-night": "bg-linear-to-b from-gray-700 to-gray-900",
		cloudy: "bg-gradient-to-b from-gray-400 to-gray-600",
		rain: "bg-gradient-to-b from-gray-500 to-blue-400",
		snow: "bg-gradient-to-b from-blue-100 to-white",
		fog: "bg-gradient-to-b from-gray-300 to-gray-500",
		wind: "bg-gradient-to-b from-sky-300 to-sky-500",
	};

	return (
		weatherBackgrounds[condition] ||
		"bg-linear-to-b from-neutral-50 to-neutral-200"
	);
}

export function getIcon(icon) {
	return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/3rd%20Set%20-%20Monochrome/${icon}.svg`;
}

export function convertTemp(unit, tempC) {
	return unit === "C" ? tempC : (tempC * 9) / 5 + 32;
}
