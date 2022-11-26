import React from "react";
import { Step, Stepper } from "react-form-stepper";
import { FormProvider } from "react-hook-form";

import ContractForm from "@container/contracts/components/ContractForm";
import { ContractType } from "src/types/contractType";

import styled from "styled-components";
import useContract from "@container/contracts/hooks/useContract";
export const ContractContext = React.createContext<ContractType>({});

function Contract() {
	const { contract, methods, step, handleClickBreakContract, showButtons } = useContract();

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
						<BreakButton onClick={handleClickBreakContract}>계약 파기</BreakButton>
						{showButtons()}
					</>
				)}
			</FormProvider>
		</ContractContext.Provider>
	);
}

export default Contract;

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
