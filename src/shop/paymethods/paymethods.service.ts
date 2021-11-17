import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymethodDto } from './dto/create-paymethod.dto';
import { UpdatePaymethodDto } from './dto/update-paymethod.dto';
import { Paymethod } from './entities/paymethod.entity';

@Injectable()
export class PaymethodsService {
  constructor(
    @InjectRepository(Paymethod)
    private paymethodRepository: Repository<Paymethod>,
  ) {}

  async create(createPaymethodDto: CreatePaymethodDto) {
    const createdRecord = await this.paymethodRepository.save(
      createPaymethodDto,
    );

    return this.findOne(createdRecord.id);
  }

  async findAll() {
    return await this.paymethodRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(id: number) {
    return await this.paymethodRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async update(id: number, updatePaymethodDto: UpdatePaymethodDto) {
    await this.paymethodRepository.update(id, updatePaymethodDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.paymethodRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`No Direction found with id "${id}".`);
    }

    await this.paymethodRepository.update(id, {
      isDeleted: true,
    });

    return true;
  }
}
