import { IException } from '../interfaces/exceptions.interface';
export declare class ApplicationExceptions implements IException {
    badRequestException(message: string): void;
    notFoundException(message: string): void;
    internalServerErrorException(message?: string): void;
}
