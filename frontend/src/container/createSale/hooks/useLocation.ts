import axios from "axios";
import { EventProps } from "src/pages/createSale";

const useLocation = ({ houseInfo, setHouseInfo }: Omit<EventProps, "changeEvent">) => {
	const searchAddress = async (data: DaumPostcodeData) => {
		const result = await axios.get(
			`https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`,
			{
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
				},
				withCredentials: false,
			},
		);
		const { jibunAddress, sido, sigungu, bname } = data;
		const longitude = +result.data.documents[0].x;
		const latitude = +result.data.documents[0].y;
		setHouseInfo({
			...houseInfo,
			longitude,
			latitude,
			jibunAddress,
			sidoName: sido,
			gunguName: sigungu,
			dongName: bname,
		});
	};

	const loadModal = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		window.daum.postcode.load(() => {
			const postcode = new window.daum.Postcode({
				oncomplete: function (data) {
					searchAddress(data);
				},
			});
			postcode.open();
		});
	};

	return { loadModal };
};

export default useLocation;
