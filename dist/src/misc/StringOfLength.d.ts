declare type StringOfLength<Min extends number, Max extends number> = string & {
    readonly StringOfLength: unique symbol;
};
declare const stringOfLength: <Min extends number, Max extends number>(input: unknown, min: Min, max: Max) => StringOfLength<Min, Max>;
export { stringOfLength, StringOfLength };
