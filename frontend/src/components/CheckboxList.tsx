import HouseInfo from "src/types/houseInfo";
import { InputCheck } from "@container/createSale/components";
import { Label, StyledPTag } from "@container/createSale/components/Table";

export interface CheckboxListProps {
	value: number;
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	title: string;
	houseInfo?: HouseInfo;
}

function CheckboxList({ value, changeEvent, title, houseInfo }: CheckboxListProps) {
	return (
		<li>
			<Label htmlFor="options">
				<InputCheck name="options" type="checkbox" value={value} onChange={changeEvent} />
				<StyledPTag
					isCheck={
						houseInfo !== undefined && houseInfo.options.includes(value) ? "checked" : undefined
					}
				>
					{title}
				</StyledPTag>
			</Label>
		</li>
	);
}

export default CheckboxList;
