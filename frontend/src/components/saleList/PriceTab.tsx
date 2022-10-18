import { ChangeEvent, useState } from "react";
import {
	setContractType,
	setDeposit,
	setMaintenanceFee,
	setMonthlyRent,
} from "src/store/searchFilter";
import styled from "styled-components";
import Container from "./Container";
import Slider from "./Slider";
import { useDispatch } from "react-redux";

function PriceTab() {
	const dispatch = useDispatch();
	const contractTypeArr = ["전체", "월세", "전세"];
	const [contractTypes, setContractTypes] = useState("전체");
	const changeContractTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { id } = e.target;
		if (contractTypes === id) {
			setContractTypes("");
			return chagneRedux("1");
		}
		if (id === "전체") {
			setContractTypes(id);
			return chagneRedux("");
		}
		setContractTypes(id);
		return chagneRedux(id);
	};

	const chagneRedux = (str: string) => {
		dispatch(setContractType({ contractType: str }));
	};
	return (
		<Container title="거래 유형 / 가격" isPrice="price">
			<SmallBox>
				<Title>거래 유형</Title>
				<Tab>
					{contractTypeArr.map((value, idx) => (
						<InputBox key={idx}>
							<Input
								type="checkbox"
								id={value}
								onChange={changeContractTypeHandler}
								checked={
									value !== "전체"
										? contractTypes === "전체" || contractTypes === value
										: contractTypes === "전체"
								}
							/>
							<Label htmlFor={value} style={{ cursor: "pointer" }}>
								{value}
							</Label>
						</InputBox>
					))}
				</Tab>
			</SmallBox>
			<SmallBox>
				<Slider
					title="가격"
					maxMin={{ min: 0, max: 10000 }}
					subTitle="보증금 / 전세금"
					itemName="Deposit"
					setChange={setDeposit}
				/>
			</SmallBox>
			{contractTypes !== "전세" && (
				<SmallBox>
					<Slider
						maxMin={{ min: 0, max: 300 }}
						subTitle="월세"
						itemName="MonthlyRent"
						setChange={setMonthlyRent}
					/>
				</SmallBox>
			)}
			<SmallBox>
				<Slider
					maxMin={{ min: 0, max: 50 }}
					subTitle="관리비"
					itemName="MaintenanceFee"
					setChange={setMaintenanceFee}
				/>
			</SmallBox>
		</Container>
	);
}

export default PriceTab;

export const Title = styled.h1`
	font-size: 2rem;
	margin-bottom: 2rem;
`;

export const Tab = styled.div`
	display: flex;
	margin-bottom: 2rem;
`;

export const InputBox = styled.div`
	display: flex;
	align-items: center;
`;

export const Input = styled.input`
	font-size: 1.4rem;
`;

export const Label = styled.label`
	font-size: 1.4rem;
	margin-left: 0.5rem;
	margin-right: 5rem;
`;

export const SmallBox = styled.div`
	margin-bottom: 2rem;
	&::after {
		content: "";
		display: block;
		border: 0.05rem solid rgba(233, 233, 233, 0.4);
		width: 100%;
		margin-top: 2rem;
	}
`;
