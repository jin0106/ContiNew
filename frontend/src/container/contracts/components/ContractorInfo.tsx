import { Input } from "./Input";
import { InputWrapper, Container } from "./SaleInfo";
import Signature from "./Signature";
import { Label } from "./Label";
import useContractorInfo from "../hooks/useContractorInfo";

interface Props {
	authority: string | undefined;
	address: string | undefined;
	name: string | undefined;
	birth: string | undefined;
	phone: string | undefined;
	koreanAuthority: string | undefined;
	signature: string | undefined;
}

function ContractorInfo({
	authority,
	address,
	name,
	birth,
	phone,
	koreanAuthority,
	signature,
}: Props) {
	const { disabled, register } = useContractorInfo(authority);

	return (
		<>
			<Container>
				<Label>{koreanAuthority} 주소</Label>
				<Input disabled={disabled} defaultValue={address} {...register(`${authority}_address`)} />
			</Container>
			<Container isJustify={true}>
				<InputWrapper>
					<Label>{koreanAuthority} 성명</Label>
					<Input
						disabled={disabled}
						defaultValue={name}
						{...register(`${authority}_name`)}
						width={25}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label>
						{koreanAuthority}
						<br />
						생년월일
					</Label>
					<Input
						disabled={disabled}
						type="date"
						defaultValue={birth}
						{...register(`${authority}_birth`)}
						width={25}
					/>
				</InputWrapper>
			</Container>
			<Container>
				<Label>{koreanAuthority} 전화</Label>
				<Input
					disabled={disabled}
					defaultValue={phone}
					{...register(`${authority}_phone`)}
					width={30}
				/>
			</Container>
			<Container>
				<Label>서명</Label>
				<Signature signature={signature} authority={authority} />
			</Container>
		</>
	);
}

export default ContractorInfo;
