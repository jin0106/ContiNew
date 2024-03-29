import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MapRefType } from "src/pages/saleList";
import { saleApi } from "src/api";
import { useDispatch } from "react-redux";
import { setCoodinates } from "src/store/searchFilter";
import House from "src/types/getListType";

interface Map extends MapRefType {
	searchCondition: never;
}
function Map({ kakaoMap, searchCondition }: Map) {
	const [loadMap, setLoadMap] = useState(false);
	const dispatch = useDispatch();
	const cluster = useRef<kakao.maps.MarkerClusterer>();
	const setCoodinate = () => {
		const coordinate = kakaoMap.current.getBounds();
		const coordinates = {
			xRight: coordinate.oa,
			yTop: coordinate.pa,
			xLeft: coordinate.ha,
			yBottom: coordinate.qa,
		};
		dispatch(setCoodinates(coordinates));
	};

	const createmakers = (sale: House[]) => {
		const markers = sale.map(
			(item) =>
				new kakao.maps.Marker({
					position: new kakao.maps.LatLng(item.latitude, item.longitude),
				}),
		);
		if (cluster.current !== undefined && cluster !== undefined) {
			cluster.current.setMinClusterSize(1);
			cluster.current.clear();
			cluster.current.addMarkers(markers);
		}
	};

	useEffect(() => {
		kakao.maps.load(() => {
			const container = document.getElementById("map") as HTMLElement;
			const options = {
				center: new kakao.maps.LatLng(37.555078, 126.970702),
				level: 8,
			};
			kakaoMap.current = new kakao.maps.Map(container, options);
			const zoomControl = new kakao.maps.ZoomControl();
			kakaoMap.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
			kakao.maps.event.addListener(kakaoMap.current, "idle", setCoodinate);
			setLoadMap(true);
		});
	}, []);

	useEffect(() => {
		if (!loadMap) return;
		cluster.current = new kakao.maps.MarkerClusterer({
			map: kakaoMap.current,
			averageCenter: true,
			calculator: [10, 30, 100, 1000],
			styles: [
				{
					background: "rgba(255, 80, 80, .8)",
					width: "3rem",
					height: "3rem",
					color: "#fff",
					borderRadius: "3rem",
					textAlign: "center",
					lineHeight: "3.3rem",
					fontSize: "1.5rem",
				},
				{
					background: "rgba(255, 80, 80, .8)",
					width: "3.5rem",
					height: "3.5rem",
					color: "#fff",
					borderRadius: "3rem",
					textAlign: "center",
					lineHeight: "4.1rem",
					fontSize: "2rem",
				},
				{
					background: "rgba(255, 80, 80, .8)",
					width: "5rem",
					height: "5rem",
					color: "#fff",
					borderRadius: "3rem",
					textAlign: "center",
					lineHeight: "5rem",
					fontSize: "2rem",
				},
				{
					background: "rgba(255, 80, 80, .8)",
					width: "6rem",
					height: "6rem",
					color: "#fff",
					borderRadius: "3rem",
					textAlign: "center",
					lineHeight: "6rem",
					fontSize: "2rem",
				},
			],
		});
		getSaleList();
	}, [loadMap]);

	const getSaleList = async () => {
		const sale = (await saleApi.getCoodinates(searchCondition)).data;
		createmakers(sale);
	};
	useEffect(() => {
		if (loadMap) getSaleList();
	}, [searchCondition]);

	return (
		<>
			<Container id="map"></Container>
		</>
	);
}

export default Map;

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 12.5em);
	@media ${(props) => props.theme.mobileXS} {
		height: calc(100vh - 10em);
	}
`;
