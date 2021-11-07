import Link from "next/link";

export default function About() {
	return (
		<div className="bg-[#171923] text-white min-h-screen flex flex-col justify-center items-center gap-5">
			<h1 className="text-2xl">Processo seletivo da Intranett</h1>
			<h2 className="text-2xl">
				Pagina feita por Jonathan, Linkedin:{" "}
				<a className="text-blue-600" href="https://www.linkedin.com/in/jonathan-mattos-729a7419a/">
					https://www.linkedin.com/in/jonathan-mattos-729a7419a/
				</a>
			</h2>
		</div>
	);
}
