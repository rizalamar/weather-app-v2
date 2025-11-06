import React from "react";

export default function SkeletonCard() {
	return (
		<div className="flex flex-col items-center w-full max-w-lg mt-6">
			<div className="flex flex-col items-center w-full gap-4 p-6 animate-pulse">
				<div className="w-1/2 h-6 mb-2 bg-gray-300 rounded"></div>
				<div className="w-24 h-24 mb-2 bg-gray-300 rounded-full"></div>
				<div className="w-2/3 h-8 mb-2 bg-gray-300 rounded"></div>
				<div className="w-1/3 h-6 mb-2 bg-gray-300 rounded"></div>
				<div className="w-1/4 h-12 bg-gray-300 rounded"></div>
			</div>
			<p className="mt-3 text-slate-50">Fetching Weather...</p>
		</div>
	);
}
