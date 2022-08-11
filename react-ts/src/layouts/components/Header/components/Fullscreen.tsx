import screenfull from "screenfull";
import { message } from "antd";
import { useEffect, useState } from "react";

const Fullscreen = () => {
	const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

	useEffect(() => {
		screenfull.on("change", () => {
			if (screenfull.isFullscreen) setFullScreen(true);
			else setFullScreen(false);
			return () => screenfull.off("change", () => { });
		});
	}, []);

	const handleFullScreen = () => {
		if (!screenfull.isEnabled) message.warning("Your browser does not currently support full screen ❌");
		screenfull.toggle();
	};
	return (
		<i className={["icon-style iconfont", fullScreen ? "icon-suoxiao" : "icon-fangda"].join(" ")} onClick={handleFullScreen}></i>
	);
};
export default Fullscreen;
