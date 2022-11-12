import { useEffect, useState } from "react";
import { contractApi } from "src/api";
import { MyContracts } from "src/types/MyContracts";
import cookie from "react-cookies";
import { useRouter } from "next/router";

const useMyContracts = () => {
	const accessToken = cookie.load("access_token");
	const router = useRouter();

	const [onGoingContracts, setOnGoingContracts] = useState<MyContracts[]>([]);
	const [completedContracts, setCompletedContracts] = useState<MyContracts[]>([]);
	const [currentTab, setCurrentTab] = useState(0);

	const tabs = ["계약중", "계약완료"];

	useEffect(() => {
		if (accessToken) getMyContracts();
	}, []);

	const getMyContracts = async () => {
		const res = await contractApi.getMyContracts();
		res.data.forEach((contract: MyContracts) => {
			if (contract.current_level === 4) setCompletedContracts((prev) => [...prev, contract]);
			else setOnGoingContracts((prev) => [...prev, contract]);
		});
	};

	const goToSignIn = () => {
		router.push("/account/signin");
	};

	return {
		accessToken,
		setCurrentTab,
		tabs,
		currentTab,
		onGoingContracts,
		completedContracts,
		goToSignIn,
	};
};
export default useMyContracts;
