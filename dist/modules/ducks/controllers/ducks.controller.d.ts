import { DucksService } from '../services/ducks.service';
import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
export declare class DucksController {
    private readonly ducksService;
    constructor(ducksService: DucksService);
    create(dto: CreateDuckDto): Promise<import("../schemas/duck.schema").Duck>;
    findAll(): Promise<import("../schemas/duck.schema").Duck[]>;
    findOne(id: string): Promise<import("../dtos/duck.dto").DuckDto>;
    update(id: string, dto: UpdateDuckDto): Promise<import("../schemas/duck.schema").Duck>;
    eraseDuck(id: string): Promise<{
        message: string;
        duck: import("../schemas/duck.schema").Duck;
    }>;
}
