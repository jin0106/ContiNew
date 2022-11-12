import MyContractsForm from "@container/contracts/components/MyContracts";
import Tabs from "@components/profile/Tabs";
import styled from "styled-components";
import useMyContractsList from "@container/contracts/hooks/useMyContractsList";

function MyContractsList() {
	const {
		accessToken,
		setCurrentTab,
		tabs,
		currentTab,
		onGoingContracts,
		completedContracts,
		goToSignIn,
	} = useMyContractsList();

	return accessToken ? (
		<Container>
			<Tabs setCurrentTab={setCurrentTab} tabs={tabs} />
			<MyContractsForm
				contracts={currentTab === 0 ? onGoingContracts : completedContracts}
				currentTab={currentTab}
			/>
		</Container>
	) : (
		goToSignIn()
	);
}

const Container = styled.div`
	width: 60%;
	margin: 5rem auto;
`;
export default MyContractsList;
