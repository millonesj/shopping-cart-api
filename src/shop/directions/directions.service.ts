import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { QueryDirectionDto } from './dto/query-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { Direction } from './entities/direction.entity';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(Direction)
    private directionRepository: Repository<Direction>,
  ) {}
  async create(createDirectionDto: CreateDirectionDto) {
    const createdRecord = await this.directionRepository.save(
      createDirectionDto,
    );

    return this.findOne(createdRecord.id);
  }

  async findAllByUser(queryDirectionDto: QueryDirectionDto) {
    console.log(
      '🚀 ~ file: directions.service.ts ~ line 24 ~ DirectionsService ~ findAllByUser ~ queryDirectionDto',
      queryDirectionDto,
    );
    const x = await this.directionRepository.find({
      where: {
        userId: queryDirectionDto.userId,
        // isDeleted: false,
      },
    });
    console.log(
      '🚀 ~ file: directions.service.ts ~ line 30 ~ DirectionsService ~ findAllByUser ~ x',
      x,
    );
    return x;
  }

  async findOne(id: number) {
    return await this.directionRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    await this.directionRepository.update(id, updateDirectionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.directionRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`No Direction found with id "${id}".`);
    }

    await this.directionRepository.update(id, {
      isDeleted: true,
    });

    return true;
  }
}
