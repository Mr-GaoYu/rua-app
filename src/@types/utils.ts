export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
