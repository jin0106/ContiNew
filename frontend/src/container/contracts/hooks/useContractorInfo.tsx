import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ContractContext } from "src/pages/contract/[id]";

const useContractorInfo = (authority?: string) => {
	const { register } = useFormContext();
	const { role, current_level } = useContext(ContractContext);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (role === authority) {
			if (current_level === 1 && role === "seller") setDisabled(false);
			else if (current_level === 2 && role === "buyer") setDisabled(false);
		}
	}, [role, current_level]);

	return {
		disabled,
		register,
	};
};

export default useContractorInfo;
