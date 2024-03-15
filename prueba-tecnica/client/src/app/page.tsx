import { LoadMore } from "@/components/lore-more";

export default function Home() {
	return (
		<div className="w-full h-screen flex justify-center items-center flex-col">
		<h1>Scroll Infinity</h1>
		<div className="w-[85%] h-85vh bg-gray-700 overflow-y-auto">
			<LoadMore />
		</div>
		</div>
	);
}
