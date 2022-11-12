import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import contractApi from "src/api/contract";

import { RootState } from "src/store";
import { ContractType } from "src/types/contractType";

const useContract = () => {
	const router = useRouter();
	const methods = useForm();
	const loginId = useSelector((state: RootState) => state.userInfo.login_id);

	const contractRequiredValue = {
		buyer: String(router.query.buyerId),
		seller: String(router.query.sellerId),
		house_id: Number(router.query.articleId),
	};

	const { seller: sellerId, buyer: buyerId, house_id: houseId } = contractRequiredValue;

	const [contract, setContract] = useState<ContractType>({});
	const { current_level: step, role } = contract;

	useEffect(() => {
		getContractInfo();
	}, []);

	const getContractInfo = async () => {
		const res = await contractApi.getContract(contractRequiredValue);
		if (res.status) {
			setContract({ ...res.data, role: sellerId === loginId ? "seller" : "buyer" });
		}
	};

	const handleClickBreakContract = async () => {
		if (window.confirm("계약을 파기하시겠습니까?")) {
			await contractApi.breakContract(contractRequiredValue);
			router.push("/");
		}
	};

	const handleClickNextOrSave = async (
		data: ContractType,
		next_level: boolean,
		alertMessage: string,
	) => {
		const contractInfo = {
			...data,
			house_id: houseId,
			seller_login_id: sellerId,
			buyer_login_id: buyerId,
			next_level,
		};
		const res = await contractApi.createContract(contractInfo);
		if (res.status) {
			alert(alertMessage);
			window.location.href = "/contract";
		}
	};

	const showButtons = () => {
		if (((step === 1 || step === 3) && role === "seller") || (step === 2 && role === "buyer")) {
			return (
				<StyledDiv>
					<Button
						onClick={methods.handleSubmit((data) =>
							handleClickNextOrSave(data, false, "계약서를 임시저장 했습니다."),
						)}
					>
						임시 저장
					</Button>
					<Button
						onClick={methods.handleSubmit((data) =>
							handleClickNextOrSave(data, true, `${step}단계 계약서 작성이 완료되었습니다.`),
						)}
						isColor={true}
					>
						다음 단계
					</Button>
				</StyledDiv>
			);
		}
	};

	return {
		contract,
		methods,
		step,
		handleClickBreakContract,
		showButtons,
	};
};

const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
`;

interface ButtonProps {
	isColor?: boolean;
}

const Button = styled.button<ButtonProps>`
	border: ${(props) => (props.isColor ? "none" : `1px solid ${props.theme.borderColor}`)};
	width: 10rem;
	height: 3rem;
	border-radius: 0.4rem;
	background-color: ${(props) => (props.isColor ? props.theme.mainColor : "#fff")};
	color: ${(props) => (props.isColor ? "#fff" : "#000")};
	margin-right: 2rem;
	cursor: pointer;
	margin-bottom: 7rem;
`;

export default useContract;
