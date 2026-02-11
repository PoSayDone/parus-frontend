import {
	TypographyH3,
	TypographyP,
	TypographyPreline,
} from "@/components/typography";
import Section from "@/components/ui/section";
import CheckmarkedDocument from "@/modules/common/icons/checkmarked-document";
import HandWithHeart from "@/modules/common/icons/hand-with-heart";
import TwoPeopleTalking from "@/modules/common/icons/two-people-talking";

export type WhyUsProps = {
	title?: string;
	item1Title?: string;
	item1Description?: string;
	item2Title?: string;
	item2Description?: string;
	item3Title?: string;
	item3Description?: string;
};

const DEFAULT_WHY_US = {
	title: "Почему вы можете\nдоверять нам?",
	item1Title: "Забота",
	item1Description:
		"Поможем организовать\nпрощание с вниманием к деталям\nи вашим пожеланиям.",
	item2Title: "Уверенность",
	item2Description:
		"Гарантируем юридическую\nчистоту оформления и соблюдение\nвсех формальностей",
	item3Title: "Понимание",
	item3Description:
		"Предложим оптимальные\nрешения, учитывая традиции\nи возможности семьи",
};

export default function WhyUs({
	title = DEFAULT_WHY_US.title,
	item1Title = DEFAULT_WHY_US.item1Title,
	item1Description = DEFAULT_WHY_US.item1Description,
	item2Title = DEFAULT_WHY_US.item2Title,
	item2Description = DEFAULT_WHY_US.item2Description,
	item3Title = DEFAULT_WHY_US.item3Title,
	item3Description = DEFAULT_WHY_US.item3Description,
}: WhyUsProps) {
	return (
		<Section
			className="py-37.5"
			id="why-us"
			title={<TypographyPreline>{title}</TypographyPreline>}
		>
			<div className="flex flex-wrap justify-center mx-auto w-full gap-10 container">
				<div className="flex flex-col items-center flex-1 min-w-50">
					<HandWithHeart size={140} className="mb-10" />
					<TypographyH3 className="mb-4">
						{item1Title}
					</TypographyH3>
					<TypographyP className="text-center whitespace-pre-line">
						{item1Description}
					</TypographyP>
				</div>
				<div className="flex flex-col items-center flex-1 min-w-50">
					<CheckmarkedDocument size={140} className="mb-10 -ml-5" />
					<TypographyH3 className="mb-4">
						{item2Title}
					</TypographyH3>
					<TypographyP className="text-center whitespace-pre-line">
						{item2Description}
					</TypographyP>
				</div>
				<div className="flex flex-col items-center flex-1 min-w-[200px]">
					<TwoPeopleTalking size={140} className="mb-10" />
					<TypographyH3 className="mb-4">
						{item3Title}
					</TypographyH3>
					<TypographyP className="text-center whitespace-pre-line">
						{item3Description}
					</TypographyP>
				</div>
			</div>
		</Section>
	);
}
