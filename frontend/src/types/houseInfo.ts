interface HouseInfo {
	sidoName: string;
	gunguName: string;
	dongName: string;
	jibunAddress: string;
	addressDetail: string;
	latitude: number;
	longitude: number;
	floor: string;
	saleType: string;
	houseType: string;
	deposit: string;
	monthlyRent: string;
	maintenanceFee: string;
	maintenanceDetail: string;
	period: string;
	description: string;
	options: number[];
	images: FileList | string[] | File[];
	contractType: string;
	agreement: string;
}

export default HouseInfo;
