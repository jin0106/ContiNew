import { useContext, useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSignatureCanvas from "react-signature-canvas";

import { ContractContext } from "src/pages/contract/[id]";
import styled from "styled-components";

interface Props {
	signature: string | undefined;
	authority: string | undefined;
}
function Signature({ signature, authority }: Props) {
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const [signatureDisabled, setSignatureDisabled] = useState(true);

	const { control } = useFormContext();

	const formatIntoPng = () => {
		if (signCanvas.current) {
			const dataURL = signCanvas.current.toDataURL("image/png");
			return dataURL;
		}
	};

	const { role, current_level } = useContext(ContractContext);

	useEffect(() => {
		if (role === authority) {
			if (role === "seller" && current_level === 3) setSignatureDisabled(false);
			else if (role === "buyer" && current_level === 2) setSignatureDisabled(false);
		}
	}, [role, current_level]);

	return (
		<div>
			{signatureDisabled ? (
				<DisabledCanvas>
					<img src={signature} />
				</DisabledCanvas>
			) : (
				<>
					<Controller
						name={`${authority}_signature`}
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
