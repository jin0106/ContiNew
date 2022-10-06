import { useState } from "react";
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

function Photos({ houseInfo, setHouseInfo }: EventProps) {
	const [uploadImgs, setUploadImgs] = useState<FileList | null>(null);
	const [previewImgs, setPreviewImgs] = useState<string[]>([]);

	const setUploadImages = (imgs: FileList) => {
		uploadImgs ? setUploadImgs({ ...uploadImgs, ...imgs }) : setUploadImgs(imgs);
	};

	const addMoreImage = (imgs: FileList) => {
		const dataTransfer = new DataTransfer();
		const img = [...Array.from(houseInfo.images!), ...Array.from(imgs)];
		img.forEach((file) => dataTransfer.items.add(file));
		setHouseInfo({ ...houseInfo, images: dataTransfer.files });
	};

	const sliceByTen = (imgs: FileList) => {
		const newImgs: string[] = [];
		[...imgs].forEach((img) => newImgs.push(URL.createObjectURL(img)));
		return newImgs.splice(0, 9);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedImages = e.target.files!;

		setUploadImages(selectedImages);

		if (houseInfo.images) addMoreImage(selectedImages);
		else setHouseInfo({ ...houseInfo, images: selectedImages });

		const imgs = sliceByTen(selectedImages);
		setPreviewImgs([...previewImgs, ...imgs]);
	};

	const slicePreviewImg = (idx: number) => {
		previewImgs.splice(idx, 1);
		setPreviewImgs([...previewImgs]);
	};

	const sliceImgFile = (idx: number): FileList => {
		const dataTransfer = new DataTransfer();
		const img = Array.from(houseInfo.images!);
		img.splice(idx, 1);
		img.forEach((file) => dataTransfer.items.add(file));
		return dataTransfer.files;
	};

	const DeletePhoto = (idx: number) => {
		slicePreviewImg(idx);
		const newImg = sliceImgFile(idx);
		setHouseInfo({ ...houseInfo, images: newImg });
	};

	return (
		<SmallContainer title="사진 등록">
			<Container>
				<Text>- 사진은 최소 3장 최대 10장 까지 업로드가 가능합니다.</Text>
				<Text>- 사진 용량은 최대 100MB까지 가능합니다.</Text>
				<Text>- 사진은 가로로 찍은 사진을 권장합니다.</Text>
			</Container>
			<Container height={32} background={true} grid={true}>
				{previewImgs.length > 0 &&
					previewImgs.map((img, idx) => (
						<PhotoDiv key={idx + 100}>
							<PreviewImg src={img} alt="" />
							<DeleteButton key={idx} onClick={() => DeletePhoto(idx)}>
								X
							</DeleteButton>
						</PhotoDiv>
					))}
				<Div isImgs={previewImgs.length > 0 && true} hide={previewImgs.length >= 10 && true}>
					<Label isImgs={previewImgs.length > 0 && true} htmlFor="images">
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
	width: calc(100% - 2rem);
	height: ${({ height }) => (height ? `${height}rem` : "auto")};
	margin: 1rem;
	padding: 2rem;
	border: ${(props) => (props.background ? "none" : `1px solid ${props.theme.borderColor}`)};
	background-color: ${({ background }) => (background ? `rgb(244,244,244)` : "none")};
	position: relative;
	display: ${({ grid }) => grid && "grid"};
	grid-template-columns: repeat(5, 1fr);
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
