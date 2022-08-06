import { useEffect } from "react";
import { getDashboardInfo } from "@/api/modules/dashboard";
import "./index.less";

import { Col, Row, Slider } from 'antd';
import React, { useState } from 'react';
import { Dashboard } from "@/api/interface";

const DashboardInfo: React.FC = () => {

	const [data, setData] = useState<Dashboard.ResDashboard>();

	const cols = [];
	let colCount = 3
	const gutters = 16
	const vgutters = 16

	const [loading, setLoading] = useState(false);
	const getDashboardData = async () => {
		setLoading(true);
		try {
			const { data } = await getDashboardInfo();
			console.log("data", data);
			if (!data) return;
			colCount = 5
			console.log("colCount useEffect", colCount);
			setData(data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDashboardData();
	}, []);

	return (
		<>
			<Row gutter={[gutters, vgutters]}>
				{/* {cols}
				{cols} */}
				<Col key={0} span={24 / colCount}>
					<div className="card border-secondary">
						<header className="card-header">
							<div className="card-title"> Project Information <span className="badge badge-pill badge-warning"></span> </div>
						</header>
						<div className="card-body">
							<p>Operating System: {data?.GoOS}
								<span className="badge badge-brown"> {data?.GoArch} </span>
							</p>
							<p>Project Address: {data?.ProjectPath} </p>
							<p>Domain Name: {data?.Host}</p>
						</div>
					</div>
				</Col>
				<Col key={1} span={24 / colCount}>
					<div className="card border-secondary">
						<header className="card-header">
							<div className="card-title">Memory Information <span className="badge badge-pill badge-warning"></span> </div>
						</header>
						<div className="card-body">
							<p>Totol: {data?.MemTotal}</p>
							<p>Used: {data?.MemUsed}</p>
							<p>Usage Rates: {data?.MemUsedPercent}% </p>
						</div>
					</div>
				</Col>
				<Col key={2} span={24 / colCount}>
					<div className="card border-secondary">
						<header className="card-header">
							<div className="card-title">Disk Information<span className="badge badge-pill badge-warning"></span> </div>
						</header>
						<div className="card-body">
							<p>Totol: {data?.DiskTotal}</p>
							<p>Used: {data?.DiskUsed}</p>
							<p>Usage Rates: {data?.DiskUsedPercent}%</p>
						</div>
					</div>
				</Col>
				<Col key={3} span={24 / colCount}>
					<div className="card border-secondary">
						<header className="card-header">
							<div className="card-title">CPU Information <span className="badge badge-pill badge-warning"></span> </div>
						</header>
						<div className="card-body">
							<p>CPU: {data?.CpuName}	</p>
							<p>Cores: {data?.CpuCores}</p>
							<p>CPU Utilization: {data?.CpuUsedPercent}%</p>
						</div>
					</div>
				</Col>
				<Col key={4} span={24 / colCount}>
					<div className="card border-secondary">
						<header className="card-header">
							<div className="card-title">Open-source Information <span className="badge badge-pill badge-warning"></span> </div>
						</header>
						<div className="card-body">
							<p>GitHub Address:<a target="_blank" href="https://github.com/jingyuan-git"> System Monitoring Tool</a></p>
							<p>GitHub Stars: <a href="https://github.com/jingyuan-git/go-gin-api/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/jingyuan-git/go-gin-api?style=flat-square" /></a></p>
							<p>GitHub Forks: <a href="https://github.com/jingyuan-git/go-gin-api/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/jingyuan-git/go-gin-api?style=flat-square" /></a></p>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default DashboardInfo;