import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ContractContext } from "src/pages/contract/[id]";

const useContractorsInfo = () => {
	const { register } = useFormContext();
	const {
		role,
		seller_address,
		seller_name,
		seller_birth,
		seller_phone,
		seller_signature,
		buyer_address,
		buyer_birth,
		buyer_name,
		buyer_phone,
		buyer_signature,
	} = useContext(ContractContext);

	return {
		register,
		role,
		seller_address,
		seller_name,
		seller_birth,
		seller_phone,
		seller_signature,
		buyer_address,
		buyer_birth,
		buyer_name,
		buyer_phone,
		buyer_signature,
	};
};

export default useContractorsInfo;
