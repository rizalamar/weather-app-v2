export default function WeatherCard(props) {
	const { weather, getIcon, getDate, convertTemp, unit } = props;

	return (
		<div className="flex flex-col items-center justify-center w-full max-w-lg gap-4 p-6 text-center transition-transform duration-700 ease-in-out transform hover:scale-105">
			<p>{getDate(weather?.currentConditions?.datetimeEpoch)}</p>
			<img
				src={getIcon(weather?.currentConditions?.icon)}
				alt={weather?.currentConditions?.conditions}
				className="object-contain w-24 h-24 invert brightness-0"
			/>
			<div className="flex flex-col gap-1">
				<h2 className="text-2xl font-semibold uppercase tracking-[0.35em]">
					{weather?.currentConditions?.conditions}
				</h2>
				<p className="text-lg tracking-widest uppercase">
					{weather?.address}
				</p>
			</div>
			<p className="mt-2 text-8xl">
				{Math.round(
					convertTemp(unit, weather?.currentConditions?.temp)
				)}
				°
			</p>
		</div>
	);
}
