import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async create(createOrderStatusDto: CreateOrderStatusDto) {
    const createdRecord = await this.orderStatusRepository.save(
      createOrderStatusDto,
    );

    return this.findOne(createdRecord.id);
  }

  async findAll() {
    return await this.orderStatusRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(id: number) {
    return await this.orderStatusRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    await this.orderStatusRepository.update(id, updateOrderStatusDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.orderStatusRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`No Direction found with id "${id}".`);
    }

    await this.orderStatusRepository.update(id, {
      isDeleted: true,
    });

    return true;
  }
}
