import { EventProps } from "src/pages/createSale";

const usePhoto = ({ houseInfo, setHouseInfo }: Omit<EventProps, "changeEvent">) => {
	const addSelectedImg = (imgs: FileList) => {
		const images = [...houseInfo.images, ...imgs].slice(0, 10) as File[];
		setHouseInfo({ ...houseInfo, images });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const images = e.target.files!;
		if (houseInfo.images) addSelectedImg(images);
		else setHouseInfo({ ...houseInfo, images });
	};

	const spliceIdxImage = (idx: number): File[] => {
		const img = houseInfo.images as File[];
		img.splice(idx, 1);
		return img;
	};

	const DeletePhoto = (idx: number) => {
		const images = spliceIdxImage(idx);
		setHouseInfo({ ...houseInfo, images });
	};

	return { handleImageChange, DeletePhoto };
};

export default usePhoto;
