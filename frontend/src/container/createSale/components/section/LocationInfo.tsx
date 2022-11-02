import useLocation from "@container/createSale/hooks/useLocation";
import { Button, InputText } from "../index";
import { Text } from "../Table";
import { Container } from "../Container";
import { TableRowAndHead } from "../TableRow";
import LocationTableData from "../LocationComponent";
import { EventProps } from "src/pages/createSale";
import styled from "styled-components";

function LocationInfo({ houseInfo, changeEvent, setHouseInfo }: EventProps) {
	const { loadPopUp } = useLocation({ houseInfo, setHouseInfo });

	return (
		<Container title="위치 정보">
			<TableRowAndHead title="주소">
				<LocationTableData>
					<InputText
						width={40}
						value={houseInfo.jibunAddress}
						name="jibunAddress"
						placeholder="예) 서울 동대문구 이문동 294-295"
						readOnly
					/>
					<Button onClick={loadPopUp}>주소 검색</Button>
				</LocationTableData>
				<LocationTableData>
					<InputText
						value={houseInfo.addressDetail}
						name="addressDetail"
						placeholder="상세 주소"
						onChange={changeEvent}
					/>
				</LocationTableData>
				<LocationTableData>
					<InputText
						width={10}
						value={houseInfo.floor}
						name="floor"
						placeholder="층수"
						onChange={changeEvent}
					/>
					<Text>층</Text>
					<StyledP>반지하는 0으로 입력해주세요</StyledP>
				</LocationTableData>
			</TableRowAndHead>
		</Container>
	);
}

export default LocationInfo;

const StyledP = styled.p`
	margin-left: 2rem;
	color: rgba(0, 0, 0, 0.5);
`;
