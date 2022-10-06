import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="ko">
				<Head>
					<meta name="title" content="ContiNew" />
					<meta name="description" content="부동산 중개플랫폼" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta property="og:title" content="ContiNew" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://contiNew.com" />
					<meta property="og:article:author" content="2030" />
					<script
						src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false&libraries=services,clusterer,drawing`}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
