import { useContext, useEffect, useState } from "react";
import { ContractContext } from "src/pages/contract/[id]";

const useContractForm = () => {
	const [disabled, setDisabled] = useState(true);
	const { current_level, role } = useContext(ContractContext);

	useEffect(() => {
		if (current_level === 1 && role === "seller") setDisabled(false);
	}, [current_level]);

	return {
		disabled,
	};
};

export default useContractForm;
