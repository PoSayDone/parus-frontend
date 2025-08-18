import Section from "@/components/ui/section";
import CheckmarkedDocument from "@/modules/common/icons/checkmarked-document";
import HandWithHeart from "@/modules/common/icons/hand-with-heart";
import TwoPeopleTalking from "@/modules/common/icons/two-people-talking";

export default function WhyUs() {
	return (
		<Section
			className="bg-primary text-on-primary py-[150px] "
			id="why-us"
			title={
				<>
					Почему вы можете
					<br />
					доверять нам?
				</>
			}
		>
			<div className="flex flex-wrap justify-center mx-auto w-full gap-10">
				<div className="flex flex-col items-center flex-1 min-w-[200px]">
					<HandWithHeart size={140} className="mb-10" />
					<h3 className="text-2xl font-medium mb-4">Забота</h3>
					<p className="text-center">
						Поможем организовать
						<br />
						прощание с вниманием к деталям
						<br />и вашим пожеланиям.
					</p>
				</div>
				<div className="flex flex-col items-center flex-1 min-w-[200px]">
					<CheckmarkedDocument size={140} className="mb-10 -ml-5" />
					<h3 className="text-2xl font-medium mb-4">Уверенность</h3>
					<p className="text-center">
						Гарантируем юридическую
						<br />
						чистоту оформления и соблюдение
						<br />
						всех формальностей
					</p>
				</div>
				<div className="flex flex-col items-center flex-1 min-w-[200px]">
					<TwoPeopleTalking size={140} className="mb-10" />
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
