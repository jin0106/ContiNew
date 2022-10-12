import HouseInfo from "src/types/houseInfo";
import InputCheck from "./InputCheck";
import { Label, StyledPTag } from "./Table";

export interface OptionInfoListProps {
	value: number;
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	title: string;
	houseInfo?: HouseInfo;
}

function OptionInfoList({ value, changeEvent, title, houseInfo }: OptionInfoListProps) {
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

export default OptionInfoList;
