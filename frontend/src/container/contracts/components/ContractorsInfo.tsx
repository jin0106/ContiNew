import { Section } from "@components/contract/Section";
import useContractorsInfo from "@container/contracts/hooks/useContractorsInfo";
import ContractorInfo from "./ContractorInfo";

function ContractorsInfo() {
	const {
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
	} = useContractorsInfo();

	return (
		<>
			<p>본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명 또는 날인한다.</p>
			<Section>
				<ContractorInfo
					authority="seller"
					address={seller_address}
					name={seller_name}
					birth={seller_birth}
					phone={seller_phone}
					koreanAuthority="임차인"
					signature={seller_signature}
				/>
				<ContractorInfo
					authority="buyer"
					address={buyer_address}
					name={buyer_name}
					birth={buyer_birth}
					phone={buyer_phone}
					koreanAuthority="신규 임차인"
					signature={buyer_signature}
				/>
			</Section>
		</>
	);
}

export default ContractorsInfo;
