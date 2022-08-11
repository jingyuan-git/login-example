// * response parameters (excluding data)
export interface Result {
	code: string;
	msg: string;
}

// * resultData
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * pagination response parameters
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * pagination request parameters
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * login
export namespace Login {
	export interface ReqLoginForm {
		email: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
		user_info: UserInfo;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

// * userInfo 
export interface UserInfo {
	email: string,
	nickname: string,
	phone: string,
	gender: string,
}

// * register
export namespace Register {
	export interface ReqRegisterForm {
		password: string,
		email: string,
		nickname: string,
		phone: string,
		gender: string,
	}
	export interface ResRegister {
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

// * user management
export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		age: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
	}
}

// * dashboard
export namespace Dashboard {
	export interface ReqDashboardForm {
	}
	export interface ResDashboard {
		MemTotal: string;
		MemUsed: string;
		MemUsedPercent: number;

		DiskTotal: string;
		DiskUsed: string;
		DiskUsedPercent: number;

		HostOS: string;
		HostName: string;

		CpuName: string;
		CpuCores: number;
		CpuUsedPercent: number;

		GoPath: string;
		GoVersion: string;
		Goroutine: number;
		ProjectPath: string;
		// Env         string
		Host: string;
		GoOS: string;
		GoArch: string;

		ProjectVersion: string;
	}
}