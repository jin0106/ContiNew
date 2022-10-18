import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setHouseType } from "src/store/searchFilter";
import styled from "styled-components";
import Container from "./Container";
import { Input, Label, SmallBox, Title } from "./PriceTab";

function RoomType() {
	const dispatch = useDispatch();

	const [roomType, setRoomType] = useState("전체");
	const rooms = ["원룸", "투룸", "쓰리룸", "전체"];
	const changeRoomTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { id } = e.target;
		if (id === roomType) {
			setRoomType("");
			return chagneRedux("전체");
		}
		if (id === "전체") {
			setRoomType("전체");
			return chagneRedux("");
		}
		setRoomType(id);
		return chagneRedux(id);
	};
	const chagneRedux = (str: string) => {
		dispatch(setHouseType({ houseType: str }));
	};
	return (
		<Container title="방 종류" width={20} isPrice="room">
			<SmallBox>
				<Title>방 종류</Title>
				<Tab>
					{rooms.map((value, idx) => (
						<InputBox key={idx}>
							<Input
								type="checkbox"
								id={value}
								onChange={changeRoomTypeHandler}
								checked={
									roomType !== "전체"
										? roomType === "전체" || roomType === value
										: roomType === "전체"
								}
							/>
							<Label htmlFor={value} style={{ cursor: "pointer" }}>
								{value}
							</Label>
						</InputBox>
					))}
				</Tab>
			</SmallBox>
		</Container>
	);
}

export default RoomType;

const Tab = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
`;
