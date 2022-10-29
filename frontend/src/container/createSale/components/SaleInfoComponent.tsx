import React from "react";
import HouseInfo from "src/types/houseInfo";
import { InputRadio, Label, StyledPTag } from "./Table";

interface SaleInfoComponentProps {
	value: string;
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	houseInfo: HouseInfo;
	type: string;
}

function SaleInfoComponent({ value, houseInfo, changeEvent, type }: SaleInfoComponentProps) {
	const checkType = () => {
		if (type === "saleType") return houseInfo.saleType === value;
		if (type === "houseType") return houseInfo.houseType === value;
		if (type === "contractType") return houseInfo.contractType === value;
	};

	return (
		<li>
			<Label htmlFor={type}>
				<InputRadio
					type="radio"
					name={type}
					value={value}
					checked={checkType()}
					onChange={changeEvent}
				/>
				<StyledPTag isCheck={checkType() ? "checked" : undefined}>{value}</StyledPTag>
			</Label>
		</li>
	);
}

export default SaleInfoComponent;
