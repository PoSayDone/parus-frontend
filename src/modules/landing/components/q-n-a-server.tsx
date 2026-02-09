import type { QnAProps } from "./q-n-a";
import QnA from "./q-n-a";

const pickQnAProps = (props: QnAProps): QnAProps => ({
	title: props.title,
	subtitle: props.subtitle,
	questions: props.questions,
});

export default function QnAServer(props: QnAProps) {
	return <QnA {...pickQnAProps(props)} />;
}
