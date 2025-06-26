import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IException } from '../interfaces/exceptions.interface';

@Injectable()
export class ApplicationExceptions implements IException {
  public badRequestException(message: string): void {
    throw new BadRequestException(message);
  }

  public notFoundException(message: string): void {
    throw new NotFoundException(message);
  }

  public internalServerErrorException(message?: string): void {
    throw new InternalServerErrorException(message);
  }
}
