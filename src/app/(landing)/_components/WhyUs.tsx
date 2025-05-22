import Section from "@/components/ui/section";

export default function WhyUs() {
	return (
		<Section
			className="bg-primary text-on-primary py-[150px]"
			id="why-us"
			title={
				<>
					Почему вы можете
					<br />
					доверять нам?
				</>
			}
		>
			<div className="flex flex-wrap justify-center gap-40 mx-auto">
				<div className="flex flex-col items-center">
					<div className="w-[115px] h-[115px] bg-secondary rounded-full mb-10" />
					<h3 className="text-2xl font-medium mb-4">Забота</h3>
					<p className="text-center">
						Поможем организовать
						<br />
						прощание с вниманием к деталям
						<br />и вашим пожеланиям.
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-[115px] h-[115px] bg-secondary rounded-full mb-10" />
					<h3 className="text-2xl font-medium mb-4">Уверенность</h3>
					<p className="text-center">
						Гарантируем юридическую
						<br />
						чистоту оформления и соблюдение
						<br />
						всех формальностей
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-[115px] h-[115px] bg-secondary rounded-full mb-10" />
					<h3 className="text-2xl font-medium mb-4">Понимание</h3>
					<p className="text-center">
						Предложим оптимальные
						<br />
						решения, учитывая традиции
						<br />и возможности семьи
					</p>
				</div>
			</div>
		</Section>
	);
}
