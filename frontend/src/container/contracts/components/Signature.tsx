import { Controller } from "react-hook-form";
import ReactSignatureCanvas from "react-signature-canvas";

import styled from "styled-components";
import useSignature from "../hooks/useSignature";

interface Props {
	signature?: string;
	authority?: string;
}

function Signature({ signature, authority }: Props) {
	const { signatureDisabled, control, signCanvas, formatIntoPng } = useSignature(authority);

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
