import usePhoto from "@container/createSale/hooks/usePhoto";
import { useLayoutEffect, useRef, useState } from "react";
import { EventProps } from "src/pages/createSale";
import styled from "styled-components";
import { SmallContainer } from "../Container";

interface ContainerProps {
	height?: number;
	background?: boolean;
	border?: boolean;
	grid?: boolean;
}

interface DivProps {
	isImgs?: boolean;
	hide?: boolean;
}

function Photos({ houseInfo, setHouseInfo }: Omit<EventProps, "changeEvent">) {
	const [ready, setIsReady] = useState(false);
	const btn = useRef<HTMLButtonElement>(null);
	const { handleImageChange, DeletePhoto } = usePhoto({
		houseInfo,
		setHouseInfo,
	});

	useLayoutEffect(() => {
		if (houseInfo.images) setTimeout(() => btn.current?.click(), 100);
	}, []);

	return (
		<SmallContainer title="사진 등록">
			<Container>
				<Text>- 사진은 최소 3장 최대 10장 까지 업로드가 가능합니다.</Text>
				<Text>- 사진 용량은 최대 100MB까지 가능합니다.</Text>
				<Text>- 사진은 가로로 찍은 사진을 권장합니다.</Text>
			</Container>
			<Container background={true} grid={true}>
				{Array.from(houseInfo.images as FileList).length > 0 &&
					[...(houseInfo.images as FileList)].map((value, idx) => (
						<PhotoDiv key={idx + 100}>
							<PreviewImg src={URL.createObjectURL(value)} alt="" />
							<DeleteButton onClick={() => DeletePhoto(idx)}>X</DeleteButton>
						</PhotoDiv>
					))}
				<HiddenButton onClick={() => setIsReady(true)} ref={btn}>
					기존 이미지 불러오기
				</HiddenButton>
				<Div
					isImgs={houseInfo.images?.length > 0 && true}
					hide={houseInfo.images?.length >= 10 && true}
				>
					<Label isImgs={houseInfo.images?.length > 0 && true} htmlFor="images">
						사진 추가하기
					</Label>
					<Input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} />
				</Div>
			</Container>
		</SmallContainer>
	);
}

export default Photos;

const Container = styled.div<ContainerProps>`
	height: ${({ height }) => (height ? `${height}rem` : "auto")};
	min-height: 20rem;
	margin: 1rem;
	padding: 2rem;
	border: ${(props) => (props.background ? "none" : `1px solid ${props.theme.borderColor}`)};
	background-color: ${({ background }) => (background ? `rgb(244,244,244)` : "none")};
	position: relative;
	display: ${({ grid }) => grid && "grid"};
	grid-template-columns: repeat(5, 1fr);
	@media ${(props) => props.theme.tabletS} {
		grid-template-columns: repeat(4, 1fr);
	}
	@media ${(props) => props.theme.mobile} {
		grid-template-columns: repeat(3, 1fr);
	}
	@media ${(props) => props.theme.mobileS} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const Text = styled.p`
	font-size: 1.3rem;
`;

const Div = styled.div<DivProps>`
	display: ${({ hide }) => hide && "none"};
	width: 20rem;
	height: 12rem;
	cursor: pointer;
	background-color: rgba(244, 244, 244);
	border: 3px solid #fff;
	font-size: 1.3rem;
	font-weight: 800;
	margin-right: 2.5rem;
	margin-bottom: 2rem;
	${(props) =>
		!props.isImgs &&
		`
    border: none;
    width: 12rem;
    height:5rem;
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  background-color: ${props.theme.mainColor};
  color: #fff;
  border-radius: 0.5rem;
  margin:0;
  `}
`;

const Label = styled.label<DivProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	cursor: pointer;
	${(props) =>
		!props.isImgs &&
		`
    border: none;
  color: #fff;
  border-radius: 0.5rem;
  `}
`;

const Input = styled.input`
	display: none;
`;

const PreviewImg = styled.img`
	width: 20rem;
	height: 12rem;
`;

const PhotoDiv = styled.div`
	width: 20rem;
	height: 12rem;
	margin-bottom: 3rem;
	position: relative;
`;

const DeleteButton = styled.button`
	position: absolute;
	top: -1rem;
	right: -1rem;
	cursor: pointer;
`;

const HiddenButton = styled.button`
	display: none;
`;
