import { useEffect, useState } from "react";

export const useCurrencyInfo = (currency: string): CurrencyType => {
	const [data, setData] = useState<CurrencyType>({});

	useEffect(() => {
		fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`
		)
			.then((response) => response.json())
			.then((response) => setData(response[currency]))
			.catch((error) => {
				console.log(error);
			});
	}, [currency]);
	return data;
};
