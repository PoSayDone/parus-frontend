import { isEmpty } from "./is-empty";

type ConvertToLocaleParams = {
	amount: number;
	currency_code: string;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	locale?: string;
};

export const convertToLocale = ({
	amount,
	currency_code,
	minimumFractionDigits,
	maximumFractionDigits,
	locale = "en-US",
}: ConvertToLocaleParams) => {
	if (amount === 0) return "Бесплатно";

	if (currency_code === "rub") {
		const formatted = new Intl.NumberFormat(locale, {
			style: "decimal",
			minimumFractionDigits,
			maximumFractionDigits,
		}).format(amount);
		return `${formatted} ₽`;
	}

	return currency_code && !isEmpty(currency_code)
		? new Intl.NumberFormat(locale, {
				style: "currency",
				currency: currency_code,
				minimumFractionDigits,
				maximumFractionDigits,
			}).format(amount)
		: amount.toString();
};
