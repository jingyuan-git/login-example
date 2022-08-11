import React, { Suspense } from "react";
import { Spin } from "antd";

/**
 * @description router lazy load
 * @param {Element} Comp: components that need to be accessed
 * @returns element
 */
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%"
					}}
				/>
			}
		>
			<Comp />
		</Suspense>
	);
};

export default lazyLoad;
