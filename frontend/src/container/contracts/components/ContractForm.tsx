import { Header } from "@components/account/Header";
import ContractInfo from "./ContractInfo";
import ContractorsInfo from "./ContractorsInfo";
import SaleInfo from "./SaleInfo";

import styled from "styled-components";
import useContractForm from "../hooks/useContractForm";

function ContractForm() {
	const { disabled } = useContractForm();

	return (
		<Container>
			<Title>임차권 양도 양수 계약서</Title>
			<SaleInfo disabled={disabled} />
			<ContractInfo disabled={disabled} />
			<ContractorsInfo />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 80vw;
	margin: 3rem auto;
	border: 0.3px solid #dddddd;
	padding: 1.5rem;
`;

const Title = styled(Header)`
	font-size: 3rem;
	@media ${(props) => props.theme.mobile} {
		font-size: 2.4rem;
	}
`;

export default ContractForm;
