import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ContractContext } from "src/pages/contract/[id]";
import { Input } from "./Input";
import { Label } from "./Label";
import { Box, Container } from "./SaleInfo";
import Signature from "./Signature";

function SellerInfo() {
	const [disabled, setDisabled] = useState(true);
	const [signatureDisabled, setSignatureDisabled] = useState(true);
	const { register } = useFormContext();
	const { role, current_level, seller_address, seller_name, seller_birth, seller_phone } =
		useContext(ContractContext);

	useEffect(() => {
		if (current_level === 1 && role === "seller") {
			setDisabled(false);
		}
		if (current_level === 3 && role === "seller") {
			setSignatureDisabled(false);
		}
	}, [current_level]);

	return (
		<>
			<Container>
				<Label>임차인 주소</Label>
				<Input disabled={disabled} defaultValue={seller_address} {...register("seller_address")} />
			</Container>
			<Container isJustify={true}>
				<Box>
					<Label>임차인 성명</Label>
					<Input
						disabled={disabled}
						defaultValue={seller_name}
						{...register("seller_name")}
						width={25}
					/>
				</Box>

				<Box>
					<Label>
						임차인 <br></br>생년월일
					</Label>
					<Input
						disabled={disabled}
						type="date"
						defaultValue={seller_birth}
						{...register("seller_birth")}
						width={25}
					/>
				</Box>
			</Container>
			<Container>
				<Label>임차인 전화</Label>
				<Input
					disabled={disabled}
					defaultValue={seller_phone}
					{...register("seller_phone")}
					width={30}
				/>
			</Container>
			<Container>
				<Label>서명</Label>
				<Signature signatureDisabled={signatureDisabled} from="sellerInfo" />
			</Container>
		</>
	);
}

export default SellerInfo;
