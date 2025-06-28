import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { DuckDto } from '../dtos/duck.dto';
import { DuckRepository } from '../repositories/duck.repository';
import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
export declare class DucksService {
    private exception;
    private readonly duckRepo;
    constructor(exception: ApplicationExceptions, duckRepo: DuckRepository);
    createOrUpdateDuck(createDuckDto: CreateDuckDto): Promise<import("../schemas/duck.schema").Duck>;
    findAll(): Promise<import("../schemas/duck.schema").Duck[]>;
    findOne(id: string): Promise<DuckDto>;
    update(id: string, dto: UpdateDuckDto): Promise<import("../schemas/duck.schema").Duck>;
    softDeleteDuck(id: string): Promise<import("../schemas/duck.schema").Duck>;
}
