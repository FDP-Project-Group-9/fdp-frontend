export type FunctionType = (...args: any []) => void;
export type UniversalObjectType = {
    [key: string]: string | number | boolean | FunctionType | UniversalObjectType
};