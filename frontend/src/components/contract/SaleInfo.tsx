import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";
import { Unit } from "./Unit";

import { ContractContext } from "src/pages/contract/[id]";
import styled from "styled-components";
interface Props {
	disabled: boolean;
}
interface ContainerProps {
	isJustify?: boolean;
}

function SaleInfo({ disabled }: Props) {
	const { register } = useFormContext();
	const { location, area, net_leasable_area } = useContext(ContractContext);

	return (
		<>
			<h2>&#91;임대차목적물의 표시&#93;</h2>
			<Section>
				<Container>
					<Label>소재지</Label>
					<Input disabled={disabled} defaultValue={location} {...register("location")} />
				</Container>

				<Container isJustify={true}>
					<InputWrapper>
						<Label>면적</Label>
						<Input disabled={disabled} defaultValue={area} width={25} {...register("area")} />
						<Unit>
							m<sup>2</sup>
						</Unit>
					</InputWrapper>
					<InputWrapper>
						<Label>전용면적</Label>
						<Input
							disabled={disabled}
							defaultValue={net_leasable_area}
							width={25}
							{...register("net_leasable_area")}
						/>
						<Unit>
							m<sup>2</sup>
						</Unit>
					</InputWrapper>
				</Container>
			</Section>
		</>
	);
}

export default SaleInfo;

export const Container = styled.div<ContainerProps>`
	display: flex;
	margin-bottom: 2rem;
	justify-content: ${({ isJustify }) => isJustify && "space-between"};
	@media ${(props) => props.theme.mobileS} {
		flex-direction: ${({ isJustify }) => isJustify && "column"};
	}
`;

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	@media ${(props) => props.theme.mobileS} {
		margin-bottom: 2rem;
	}
`;
