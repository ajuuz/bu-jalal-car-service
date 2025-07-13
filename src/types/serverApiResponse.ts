export type ServerApiResponse<T>={
    success:boolean,
    message:string,
    data?:T
}
