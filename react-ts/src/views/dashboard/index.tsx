import welcome from "@/assets/images/welcome.png";
import "./index.less";

import { Col, Row, Slider } from 'antd';
import React, { useState } from 'react';

const gutters: Record<string, number> = {};
const vgutters: Record<string, number> = {};
const colCounts: Record<string, number> = {};

// [8, 16, 24, 32, 40, 48].forEach((value, i) => {
// 	gutters[i] = value;
// });
// [8, 16, 24, 32, 40, 48].forEach((value, i) => {
// 	vgutters[i] = value;
// });
// [2, 3, 4, 6, 8, 12].forEach((value, i) => {
// 	colCounts[i] = value;
// });

const Dashboard: React.FC = () => {
	const [gutterKey, setGutterKey] = useState(1);
	const [vgutterKey, setVgutterKey] = useState(1);
	const [colCountKey, setColCountKey] = useState(2);

	const cols = [];
	const colCount = 3
	const gutters = 16
	const vgutters = 16
	let colCode = '';
	for (let i = 0; i < colCount; i++) {
		cols.push(
			<Col key={i.toString()} span={24 / colCount}>
				<div>Column</div>
			</Col>,
		);
		colCode += `  <Col span={${24 / colCount}} />\n`;
	}

	return (
		<>
			<span>Horizontal Gutter (px): </span>
			<Row gutter={[gutters, vgutters]}>
				{/* {cols}
				{cols} */}
				<Col key={0} span={24 / colCount}>
					<div>Column</div>
				</Col>
				<Col key={1} span={24 / colCount}>
					<div>Column</div>
				</Col>
				<Col key={2} span={24 / colCount}>
					<div>Column</div>
				</Col>
				<Col key={3} span={24 / colCount}>
					<div>Column</div>
				</Col>
				<Col key={4} span={24 / colCount}>
					<div>Column</div>
				</Col>
				<Col key={5} span={24 / colCount}>
					<div>Column</div>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;