import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Step, Stepper } from "react-form-stepper";
import { useForm, FormProvider } from "react-hook-form";

import contractApi from "src/api/contract";

import ContractForm from "@container/contracts/components/ContractForm";

import { RootState } from "src/store";
import { ContractType } from "src/types/contractType";
import styled from "styled-components";

export const ContractContext = React.createContext<ContractType>({});

function Contract() {
	const router = useRouter();
	const methods = useForm();

	const buyerId = router.query.buyerId as string;
	const sellerId = router.query.sellerId as string;
	const articleId = Number(router.query.articleId);
	const value = { buyer: buyerId, seller: sellerId, house_id: articleId };

	const [contract, setContract] = useState<ContractType>({});
	const { current_level: step, role } = contract;
	const loginId = useSelector((state: RootState) => state.userInfo.login_id);

	useEffect(() => {
		getContractInfo();
	}, []);

	const getContractInfo = async () => {
		const res = await contractApi.getContract(value);
		if (res.status) {
			if (sellerId === loginId) setContract({ ...res.data, role: "seller" });
			else setContract({ ...res.data, role: "buyer" });
		}
	};

	const handleBreakContractButton = async () => {
		if (window.confirm("계약을 파기하시겠습니까?")) {
			await contractApi.breakContract(value);
			router.push("/");
		}
	};

	const handleNextStepClick = async (data: ContractType) => {
		const contractInfo = {
			...data,
			house_id: articleId,
			seller_login_id: sellerId,
			buyer_login_id: buyerId,
			next_level: true,
		};
		const res = await contractApi.createContract(contractInfo);
		if (res.status) {
			alert(`${step}단계 계약서 작성이 완료되었습니다.`);
			window.location.href = "/contract";
		}
	};

	const handleTempSaveClick = async (data: ContractType) => {
		const contractInfo = {
			...data,
			house_id: articleId,
			seller_login_id: sellerId,
			buyer_login_id: buyerId,
			next_level: false,
		};
		const res = await contractApi.createContract(contractInfo);
		if (res.status) {
			alert(`계약서를 임시저장 했습니다.`);
			window.location.href = "/contract";
		}
	};

	const showButtons = () => {
		if (
			(step === 1 && role === "seller") ||
			(step === 2 && role === "buyer") ||
			(step === 3 && role === "seller")
		) {
			return (
				<StyledDiv>
					<Button id="save" onClick={methods.handleSubmit(handleTempSaveClick)}>
						임시 저장
					</Button>
					<Button id="next" onClick={methods.handleSubmit(handleNextStepClick)} isColor={true}>
						다음 단계
					</Button>
				</StyledDiv>
			);
		}
	};

	return (
		<ContractContext.Provider value={contract}>
			<FormProvider {...methods}>
				{step === 4 ? (
					<ContractForm />
				) : (
					<>
						<Stepper activeStep={step && step - 1}>
							<Step label="계약 조건 작성" />
							<Step label="신규 임차인 정보 작성 및 서명" />
							<Step label="임차인 서명" />
						</Stepper>
						<ContractForm />
						<BreakButton onClick={handleBreakContractButton}>계약 파기</BreakButton>
						{showButtons()}
					</>
				)}
			</FormProvider>
		</ContractContext.Provider>
	);
}

export default Contract;

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

const BreakButton = styled.button`
	width: 10rem;
	height: 3rem;
	border-radius: 0.4rem;
	cursor: pointer;
	border: none;
	background-color: inherit;
	color: #e31941;
	display: block;
	margin: 2rem 0 2rem 83vw;
	font-size: 1.2rem;
`;
