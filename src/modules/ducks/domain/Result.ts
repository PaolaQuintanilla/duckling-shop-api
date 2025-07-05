export class Result<T extends object, E extends object> {
  private readonly _value: T | null;
  private readonly _error: E | null;
  private readonly _isSuccess: boolean;

  private constructor(value: T | null, isSuccess: boolean, error: E | null) {
    this._value = value;
    this._error = error;
    this._isSuccess = isSuccess;
  }

  get value(): T {
    if (!this._isSuccess || !this._value) {
      throw new Error('Cannot get the value from a failed result.');
    }
    return this._value;
  }

  get error(): E {
    if (this._isSuccess || !this._error) {
      throw new Error('Cannot get the error from a successful result.');
    }
    return this._error;
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  static success<T extends object, E extends object>(value: T): Result<T, E> {
    return new Result(value, true, null);
  }

  static failure<T extends object, E extends object>(error: E): Result<T, E> {
    return new Result(null, false, error);
  }
}
