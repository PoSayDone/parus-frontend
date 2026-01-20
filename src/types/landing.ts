export type Plan = {
	id: string;
	title: string;
	desc: string;
	price: number;
	creditPrice: number;
	badge?: string;
	buttonText: string;
	features: string[];
	link: string;
};

export type CemeteryLocation = {
	id: string;
	name: string;
	address: string;
	handle?: string;
	coords: [number, number] | null;
};
