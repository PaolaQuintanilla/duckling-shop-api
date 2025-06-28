export interface IException {
    badRequestException(message: string): void;
    notFoundException(message: string): void;
    internalServerErrorException(message: string): void;
}
