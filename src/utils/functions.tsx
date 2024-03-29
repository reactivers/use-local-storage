export const isBrowser = () => {
    return typeof window !== "undefined"
}

export const tryJSONparse = (obj: any) => {
    try {
        return JSON.parse(obj);
    } catch {
        return obj;
    }
}
export const tryJSONStringify = (obj: any) => {
    if (typeof obj === "string") return obj;
    try {
        return JSON.stringify(obj);
    } catch {
        return obj;
    }
}