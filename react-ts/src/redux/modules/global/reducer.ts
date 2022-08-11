import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const globalState: GlobalState = {
	token: "",
	userInfo: "",
	assemblySize: "middle",
	language: "",
	themeConfig: {
		// default theme color
		primary: "#1890ff",
		isDark: false,
		// 色弱模式(weak) || 灰色模式(gray)
		weakOrGray: ""
	}
};

// global reducer
const global = (state: GlobalState = globalState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_TOKEN:
				draftState.token = action.token;
				break;
			case types.SET_USRINFO:
				draftState.userInfo = action.userInfo;
				break;
			case types.SET_ASSEMBLY_SIZE:
				draftState.assemblySize = action.assemblySize;
				break;
			case types.SET_LANGUAGE:
				draftState.language = action.language;
				break;
			case types.SET_DARK:
				draftState.themeConfig.isDark = action.isDark;
				break;
			case types.SET_WEAK_OR_GRAY:
				draftState.themeConfig.weakOrGray = action.weakOrGray;
				break;
			default:
				return draftState;
		}
	});

export default global;
