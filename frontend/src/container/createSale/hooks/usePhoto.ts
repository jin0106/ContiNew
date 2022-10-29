import { EventProps } from "src/pages/createSale";

const usePhoto = ({ houseInfo, setHouseInfo }: Omit<EventProps, "changeEvent">) => {
	const addSelectedImg = (imgs: FileList) => {
		const img = [...houseInfo.images, ...imgs].slice(0, 10);
		setHouseInfo({ ...houseInfo, images: img as File[] });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedImages = e.target.files!;
		if (houseInfo.images) addSelectedImg(selectedImages);
		else setHouseInfo({ ...houseInfo, images: selectedImages });
	};

	const spliceIdxImage = (idx: number): File[] => {
		const img = houseInfo.images as File[];
		img.splice(idx, 1);
		return img;
	};

	const DeletePhoto = (idx: number) => {
		const newImg = spliceIdxImage(idx);
		setHouseInfo({ ...houseInfo, images: newImg });
	};

	return { handleImageChange, DeletePhoto };
};

export default usePhoto;
