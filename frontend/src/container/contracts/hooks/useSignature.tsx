import { useContext, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ContractContext } from "src/pages/contract/[id]";

const useSignature = (authority?: string) => {
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const [signatureDisabled, setSignatureDisabled] = useState(true);

	const { control } = useFormContext();

	const formatIntoPng = () => {
		if (signCanvas.current) {
			const dataURL = signCanvas.current.toDataURL("image/png");
			return dataURL;
		}
	};

	const { role, current_level } = useContext(ContractContext);

	useEffect(() => {
		if (role === authority) {
			if (role === "seller" && current_level === 3) setSignatureDisabled(false);
			else if (role === "buyer" && current_level === 2) setSignatureDisabled(false);
		}
	}, [role, current_level]);

	return {
		signatureDisabled,
		control,
		signCanvas,
		formatIntoPng,
	};
};

export default useSignature;
