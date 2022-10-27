import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "./Input";
import { Label } from "./Label";
import { InputWrapper, Container } from "./SaleInfo";
import Signature from "./Signature";

import { ContractContext } from "src/pages/contract/[id]";

function BuyerInfo() {
	const [disabled, setDisabled] = useState(true);
	const [signatureDisabled, setSignatureDisabled] = useState(true);
	const { register } = useFormContext();
	const { role, current_level, buyer_address, buyer_birth, buyer_name, buyer_phone } =
		useContext(ContractContext);

	useEffect(() => {
		if (current_level === 2 && role === "buyer") {
			setDisabled(false);
			setSignatureDisabled(false);
		}
	}, [current_level]);

	return (
		<>
			<Container>
				<Label>신규 임차인 주소</Label>
				<Input disabled={disabled} {...register("buyer_address")} defaultValue={buyer_address} />
			</Container>
			<Container isJustify={true}>
				<InputWrapper>
					<Label>신규 임차인 성명</Label>
					<Input
						disabled={disabled}
						{...register("buyer_name")}
						defaultValue={buyer_name}
						width={25}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label>
						신규 임차인<br></br>생년월일
					</Label>
					<Input
						disabled={disabled}
						{...register("buyer_birth")}
						type="date"
						defaultValue={buyer_birth}
						width={30}
					/>
				</InputWrapper>
			</Container>
			<Container>
				<Label>신규 임차인 전화</Label>
				<Input
					disabled={disabled}
					{...register("buyer_phone")}
					defaultValue={buyer_phone}
					width={30}
				/>
			</Container>
			<Container>
				<Label>서명</Label>
				<Signature signatureDisabled={signatureDisabled} from="buyerInfo" />
			</Container>
		</>
	);
}

export default BuyerInfo;
