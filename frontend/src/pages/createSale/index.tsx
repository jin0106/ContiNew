import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import styled from "styled-components";
import { saleApi } from "src/api";
import articleApi from "src/api/article";
import { checkData, createFormData } from "@utils/index";
import { convertURLtoFile } from "@utils/convertURLtoFile";
import snakeToCamel from "@utils/snakeToCamel";
import {
	PriceInfo,
	SaleInfo,
	OptionInfo,
	LocationInfo,
	Description,
	Photos,
} from "@container/createSale/components";
import HouseInfo from "src/types/houseInfo";

interface ButtonProps {
	isApplyBtn?: boolean;
}

export interface EventProps {
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	houseInfo: HouseInfo;
	setHouseInfo: React.Dispatch<React.SetStateAction<HouseInfo>>;
	articleId?: number;
}

export interface TextAreaProps {
	changeEvent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	houseInfo: HouseInfo;
	setHouseInfo?: React.Dispatch<React.SetStateAction<HouseInfo>>;
}

interface Props {
	saleInfo: HouseInfo;
}

const numberKey = ["deposit", "monthlyRent", "maintenanceFee", "period", "floor"];

function index(props: Props) {
	let { saleInfo } = props;
	const accessToken = cookie.load("access_token");
	const router = useRouter();
	const [houseInfo, setHouseInfo] = useState<HouseInfo>({
		saleType: "",
		houseType: "",
		contractType: "",
		deposit: "",
		monthlyRent: "",
		maintenanceFee: "",
		maintenanceDetail: "",
		period: "",
		options: [],
		jibunAddress: "",
		addressDetail: "",
		floor: "",
		images: [],
		description: "",
		sidoName: "",
		gunguName: "",
		dongName: "",
		latitude: 0,
		longitude: 0,
		agreement: "",
	});

	const convertUrltoFileList = () => {
		const snakeInfo = snakeToCamel(saleInfo) as HouseInfo;
		const newImgs: File[] = [];
		const img = Array.from(saleInfo.images as string[]);
		img.forEach(
			async (file) =>
				await convertURLtoFile(file).then((v) => {
					newImgs.push(v);
				}),
		);
		const temp = { ...snakeInfo, images: newImgs as unknown as File[] };
		setHouseInfo(temp);
	};
	useEffect(() => {
		if (saleInfo) {
			convertUrltoFileList();
		}
	}, []);

	const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		const idx = houseInfo.options.indexOf(+e.target.value);
		if (idx !== -1) {
			const deleteOption = houseInfo.options.slice().filter((i) => i !== +e.target.value);
			return setHouseInfo({ ...houseInfo, options: deleteOption });
		}
		const addOptions = houseInfo.options.slice();
		addOptions.push(+e.target.value);
		setHouseInfo({ ...houseInfo, options: addOptions });
	};

	const onlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		return setHouseInfo({
			...houseInfo,
			[e.target.name]: e.target.value.replace(/\D/, ""),
		});
	};

	const handleHouseInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "options") return handleOptions(e);
		if (numberKey.includes(e.target.name)) return onlyNumber(e);
		setHouseInfo({ ...houseInfo, [e.target.name]: e.target.value });
	};
	const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setHouseInfo({ ...houseInfo, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (checkData(houseInfo) && houseInfo.agreement === "agree") {
			const res = await saleApi.createSale(createFormData(houseInfo));
			if (res === "H03") return toast.error("1인당 1개의 매물만 올릴 수 있습니다.");
			if (typeof res !== "string") window.location.replace(`/article/${res.data.house_id}`);
		}
	};

	const editSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (checkData(houseInfo) && houseInfo.agreement === "agree" && router.query.id) {
			const res = await articleApi.editArticle(createFormData(houseInfo), +router.query.id);
			if (res.status === 204) window.location.replace(`/article/${router.query.id}`);
		}
	};

	return accessToken ? (
		<>
			<Head>
				<title>매물 등록</title>
			</Head>
			<Container>
				<SaleInfo houseInfo={houseInfo} changeEvent={handleHouseInfo} setHouseInfo={setHouseInfo} />
				<PriceInfo
					houseInfo={houseInfo}
					changeEvent={handleHouseInfo}
					setHouseInfo={setHouseInfo}
				/>
				<OptionInfo
					houseInfo={houseInfo}
					changeEvent={handleHouseInfo}
					setHouseInfo={setHouseInfo}
				/>
				<LocationInfo
					houseInfo={houseInfo}
					changeEvent={handleHouseInfo}
					setHouseInfo={setHouseInfo}
				/>
				<Photos
					houseInfo={houseInfo}
					setHouseInfo={setHouseInfo}
					articleId={
						router.query.id !== undefined ? parseInt(router.query.id as string) : undefined
					}
				/>
				<Description
					houseInfo={houseInfo}
					changeEvent={handleTextArea}
					setHouseInfo={setHouseInfo}
				/>
				<Div>
					<StyledSpan onClick={() => window.open("/term", "이용약관", "width=500px, height=500px")}>
						다음의 약관
					</StyledSpan>
					<AgreementText>을 읽고 동의하십니까?</AgreementText>
					<RadioText>동의</RadioText>
					<InputRadio type="radio" name="agreement" onChange={handleHouseInfo} value="agree" />
					<RadioText>비동의</RadioText>
					<InputRadio type="radio" name="agreement" onChange={handleHouseInfo} value="disagree" />
				</Div>
				<Div>
					<Button onClick={() => router.back()}>취소</Button>
					{router.query.id ? (
						<Button isApplyBtn={true} onClick={editSubmit}>
							수정 하기
						</Button>
					) : (
						<Button isApplyBtn={true} onClick={onSubmit}>
							매물 등록
						</Button>
					)}
				</Div>
			</Container>
		</>
	) : (
		router.push("/account/signin")
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	if (context.query.id) {
		const { id } = context.query;
		const res = await articleApi.getArticle(+id!);
		return {
			props: {
				saleInfo: res?.data,
			},
		};
	}
	return {
		props: {
			saleInfo: false,
		},
	};
};

export default index;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 120rem;
	@media ${(props) => props.theme.tabletS} {
		width: auto;
	}
`;

const Button = styled.button<ButtonProps>`
	width: 12rem;
	height: 4rem;
	border: none;
	margin-right: 2rem;
	background-color: ${(props) => props.isApplyBtn && props.theme.mainColor};
	color: ${(props) => props.isApplyBtn && "#fff"};
	cursor: pointer;
`;

const Div = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 4rem;
`;

const AgreementText = styled.p`
	font-size: 1.5rem;
	margin-right: 1rem;
	font-weight: 300;
`;

const RadioText = styled.p`
	font-size: 1.2rem;
`;

const InputRadio = styled.input`
	margin-right: 1.5rem;
`;

const StyledSpan = styled.span`
	font-weight: bold;
	cursor: pointer;
	font-size: 1.5rem;
	text-decoration: underline;
`;
