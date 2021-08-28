declare module 'next.db' {
    export interface Options {
        target?: string | null;
        table?: string;
    }

    export type ValueData = string | object | number | null | boolean | bigint | symbol | any[];

    function get(key: string, ops?: Options): any;
    function set(key: string, value: ValueData, ops?: Options): any;
    function add(key: string, value: number, ops?: Options): any;
    function subtract(key: string, value: number, ops?: Options): any;
    function push(key: string, value: ValueData, ops?: Options): any[];
    function has(key: string, ops?: Options): boolean;
    function includes(key: string, ops?: Options): boolean;
    function all(ops?: Options): { ID: string; data: any; }[];
    function fetchAll(ops?: Options): { ID: string; data: any; }[];
    function del(key: string, ops?: Options): boolean;
    function dataType(key: string, ops?: Options): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

    class Table {
        tableName: string;

        public constructor(tableName: string, options?: object);
        public set(key: string, value: ValueData, ops?: Options): any;
        public get(key: string, ops?: Options): any;
        public fetch(key: string, ops?: Options): any;
        public add(key: string, value: number, ops?: Options): any;
        public subtract(key: string, value: number, ops?: Options): any;
        public push(key: string, value: ValueData, ops?: Options): any[];
        public has(key: string, ops?: Options): boolean;
        public includes(key: string, ops?: Options): boolean;
        public all(ops?: Options): { ID: string; data: any }[];
        public fetchAll(ops?: Options): { ID: string; data: any }[];
        public delete(key: string, ops?: Options): boolean;
    }

    export {
        get,
        set,
        add,
        subtract,
        push,
        has,
        includes,
        all,
        fetchAll,
        del as delete,
        dataType as type,
        Table as table,
    }

}
