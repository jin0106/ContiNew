import Tabs from "@components/Tabs";
import styled from "styled-components";
import useMyContractsList from "@container/contracts/hooks/useMyContracts";
import MyContractsList from "@container/contracts/components/MyContractsList";

function MyContracts() {
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
			<MyContractsList
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
export default MyContracts;
