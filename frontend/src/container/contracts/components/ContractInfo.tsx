import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import ContractTerms from "./ContractTerms";
import { InputWrapper, Container } from "./SaleInfo";

import { ContractContext } from "src/pages/contract/[id]";
import { Section } from "@components/contract/Section";
import { Label } from "@components/contract/Label";
import { Input, RadioInput } from "@components/contract/Input";
import { Unit } from "@components/contract/Unit";
interface Props {
	disabled: boolean;
}

function ContractInfo({ disabled }: Props) {
	const { register } = useFormContext();

	const {
		contract_type,
		tenancy_deposit,
		maintenance_fee,
		contract_start,
		contract_end,
		total_premium,
		down_payment,
		middle_payment,
		middle_date,
		balance_date,
		balance_payment,
	} = useContext(ContractContext);

	return (
		<>
			<h2>&#91;임차인의 임대차계약 현황&#93;</h2>
			<Section>
				<Container>
					<InputWrapper>
						<Label>계약종류</Label>
						<Label bold={true} htmlFor="전세" width={4}>
							전세
						</Label>
						<RadioInput
							type="radio"
							id="전세"
							value="전세"
							disabled={disabled}
							{...register("contract_type")}
						/>
						<Label bold={true} htmlFor="월세" width={4}>
							월세
						</Label>
						<RadioInput
							type="radio"
							id="월세"
							value="월세"
							disabled={disabled}
							{...register("contract_type")}
						/>
					</InputWrapper>
				</Container>
				<Container isJustify={true}>
					<InputWrapper>
						<Label>임차보증금</Label>
						<Input
							disabled={disabled}
							defaultValue={tenancy_deposit}
							width={25}
							{...register("tenancy_deposit")}
						/>
						<Unit>만원</Unit>
					</InputWrapper>
					<InputWrapper>
						<Label>관리비</Label>
						<Input
							disabled={disabled}
							defaultValue={maintenance_fee}
							width={25}
							{...register("maintenance_fee")}
						/>
						<Unit>만원</Unit>
					</InputWrapper>
				</Container>
				<Container>
					<Label>계약 기간</Label>
					<Input
						type="date"
						disabled={disabled}
						defaultValue={contract_start}
						{...register("contract_start")}
						width={25}
						margin={3}
					/>
					<Input
						type="date"
						disabled={disabled}
						defaultValue={contract_end}
						{...register("contract_end")}
						width={25}
					/>
				</Container>
			</Section>
			<h2>&#91;계약내용&#93;</h2>
			<p>제1조&#40;권리금의 지급&#41; 신규임차인은 임차인에게 다음과 같이 권리금을 지급한다.</p>
			<Section>
				<Container>
					<Label>총 권리금</Label>
					<Input disabled={disabled} defaultValue={total_premium} {...register("total_premium")} />
					<Unit>만원</Unit>
				</Container>
				<Container>
					<Label>계약금</Label>
					<Input disabled={disabled} defaultValue={down_payment} {...register("down_payment")} />
					<Unit>만원</Unit>
				</Container>
				<Container>
					<Label>중도금</Label>
					<Input
						disabled={disabled}
						defaultValue={middle_payment}
						{...register("middle_payment")}
					/>
					<Unit>만원</Unit>
				</Container>
				<Container>
					<Label>중도금 기한</Label>
					<Input
						type="date"
						disabled={disabled}
						defaultValue={middle_date}
						{...register("middle_date")}
					/>
				</Container>
				<Container>
					<Label>잔금</Label>
					<Input
						disabled={disabled}
						defaultValue={balance_payment}
						{...register("balance_payment")}
					/>
					<Unit>만원</Unit>
				</Container>
				<Container>
					<Label>잔금 기한</Label>
					<Input
						type="date"
						disabled={disabled}
						defaultValue={balance_date}
						{...register("balance_date")}
					/>
				</Container>
			</Section>
			<ContractTerms />
		</>
	);
}

export default ContractInfo;
