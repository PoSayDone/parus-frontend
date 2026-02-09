import type { QnAProps } from "./q-n-a";
import QnA from "./q-n-a";

const pickQnAProps = (props: QnAProps): QnAProps => ({
	title: props.title,
	subtitle: props.subtitle,
	question1Title: props.question1Title,
	question1Description: props.question1Description,
	question2Title: props.question2Title,
	question2Description: props.question2Description,
	question3Title: props.question3Title,
	question3Description: props.question3Description,
	question4Title: props.question4Title,
	question4Description: props.question4Description,
	question5Title: props.question5Title,
	question5Description: props.question5Description,
});

export default function QnAServer(props: QnAProps) {
	return <QnA {...pickQnAProps(props)} />;
}
