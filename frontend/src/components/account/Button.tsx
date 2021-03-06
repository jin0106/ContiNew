import styled from "styled-components";
interface ButtonProps {
	color?: string;
	backgroundColor?: string;
	disabled?: boolean;
	width?: number;
	margin?: string;
}

export const Button = styled.button<ButtonProps>`
	border: 0.2px solid #dedede;
	color: ${({ color, disabled }) => (disabled ? "white" : color)};
	background-color: ${({ backgroundColor, disabled }) =>
		backgroundColor ? (disabled ? "#eaeaea" : backgroundColor) : "inherit"};
	margin: ${({ margin }) => (margin ? `${margin}` : 0)};
	font-size: 1.5rem;
	padding: 0.5rem 0;
	&:hover {
		cursor: pointer;
	}
	width: ${({ width }) => (width ? `${width}%` : "100%")};
`;
