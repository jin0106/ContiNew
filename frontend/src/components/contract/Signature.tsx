import { useContext, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSignatureCanvas from "react-signature-canvas";

import { ContractContext } from "src/pages/contract/[id]";
import styled from "styled-components";

interface Props {
	signatureDisabled: boolean;
	from: string;
}
function Signature({ signatureDisabled, from }: Props) {
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const { seller_signature, buyer_signature } = useContext(ContractContext);

	const { control } = useFormContext();

	const formatIntoPng = () => {
		if (signCanvas.current) {
			const dataURL = signCanvas.current.toDataURL("image/png");
			return dataURL;
		}
	};

	return (
		<div>
			{signatureDisabled ? (
				<DisabledCanvas>
					<img src={from === "sellerInfo" ? seller_signature : buyer_signature} />
				</DisabledCanvas>
			) : (
				<>
					<Controller
						name={from === "sellerInfo" ? "seller_signature" : "buyer_signature"}
						control={control}
						render={({ field }) => (
							<ReactSignatureCanvas
								ref={signCanvas}
								canvasProps={{ width: 300, height: 100, className: "sigCanvas" }}
								clearOnResize={false}
								backgroundColor="rgb(245, 245, 245)"
								onEnd={() => field.onChange(formatIntoPng())}
							/>
						)}
					/>
					<button
						onClick={() => {
							signCanvas.current.clear();
						}}
					>
						clear
					</button>
				</>
			)}
		</div>
	);
}

const DisabledCanvas = styled.div`
	width: 30rem;
	height: 10rem;
	background-color: rgb(245, 245, 245);
`;
export default Signature;
