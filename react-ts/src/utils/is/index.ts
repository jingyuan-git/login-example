const toString = Object.prototype.toString;

/**
 * @description: determine if the value is not of a certain type
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  determine whether it is a function
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}

/**
 * @description: determine if it is defined
 */
export const isDef = <T = unknown>(val?: T): val is T => {
	return typeof val !== "undefined";
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
	return !isDef(val);
};
/**
 * @description: determine whether it is an object
 */
export const isObject = (val: any): val is Record<any, any> => {
	return val !== null && is(val, "Object");
};

/**
 * @description:  determine whether it is time
 */
export function isDate(val: unknown): val is Date {
	return is(val, "Date");
}

/**
 * @description:  determine whether it is a number type
 */
export function isNumber(val: unknown): val is number {
	return is(val, "Number");
}

/**
 * @description:  determine whether it is asyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
	return is(val, "AsyncFunction");
}

/**
 * @description:  determine whether it is promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
	return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description:  determine whether it is string
 */
export function isString(val: unknown): val is string {
	return is(val, "String");
}

/**
 * @description:  determine whether it is boolean
 */
export function isBoolean(val: unknown): val is boolean {
	return is(val, "Boolean");
}

/**
 * @description:  determine whether it is array
 */
export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}

/**
 * @description: determine whether it is client
 */
export const isClient = () => {
	return typeof window !== "undefined";
};

/**
 * @description: determine whether it is window
 */
export const isWindow = (val: any): val is Window => {
	return typeof window !== "undefined" && is(val, "Window");
};

/**
 * @description: determine whether it is element
 */
export const isElement = (val: unknown): val is Element => {
	return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === "undefined";

/**
 * @description: determine whether it is image
 */
export function isImageDom(o: Element) {
	return o && ["IMAGE", "IMG"].includes(o.tagName);
}

export function isNull(val: unknown): val is null {
	return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) || isNull(val);
}
