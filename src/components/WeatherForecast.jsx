import React from "react";

export default function WeatherForecast(props) {
	const { weather, getIcon, getDay, convertTemp, unit } = props;
	return (
		<div className="grid grid-cols-5 max-sm:grid-cols-[repeat(5, 180px)] max-sm:overflow-x-auto max-sm:flex max-sm:gap-4 max-sm:w-full max-sm:justify-center gap-10 place-items-center">
			{weather?.days?.slice(0, 5).map((day) => (
				<div
					className="flex flex-col items-center justify-center gap-4 "
					key={day.datetime}
				>
					<h3 className="uppercase">{getDay(day.datetime)}</h3>

					<img
						src={getIcon(day?.icon)}
						alt={day?.conditions}
						className="w-14 h-14 invert"
					/>

					<p>{Math.round(convertTemp(unit, day?.temp))}°</p>
				</div>
			))}
		</div>
	);
}
