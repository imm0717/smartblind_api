import UseCaseError from "./UseCaseError"

export default class Result<T, Y = UseCaseError> {
    private value?: T;
    private error?: Y;

    public isError: boolean;

    constructor(value?: T, error?: Y) {
        if (error){
            this.error = error;
            this.isError = true;
        } else {
            this.isError = false;
            this.value = value;
        }
    }

    public getValue(): T {
        if (this.isError){
          throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }
          return this.value as T;
    }

    public getError(): Y {
        if (this.isError){
          return this.error as Y;
        }
          return undefined;
    }

    public static ok<T>(results: T): Result<T> {
        return new Result<T>(results, undefined);
    }

    public static fail<T, Y extends UseCaseError>(error: Y): Result<T, Y> {
        return new Result<T, Y>(undefined, error);
    }
}