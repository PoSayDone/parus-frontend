import type { WhereToFindUsProps } from "./location";
import WhereToFindUs from "./location";

const pickLocationProps = (
	props: WhereToFindUsProps,
): WhereToFindUsProps => ({
	title: props.title,
	subtitle: props.subtitle,
	lat: props.lat,
	lng: props.lng,
	zoom: props.zoom,
});

export default function WhereToFindUsServer(props: WhereToFindUsProps) {
	return <WhereToFindUs {...pickLocationProps(props)} />;
}
