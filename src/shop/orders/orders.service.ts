import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { DirectionsService } from '../directions/directions.service';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';
import { OrderStatusService } from '../order-status/order-status.service';
import { PaymethodsService } from '../paymethods/paymethods.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private connection: Connection,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private paymethodsService: PaymethodsService,
    private cartsService: CartsService,
    private directionService: DirectionsService,
    private orderStatusService: OrderStatusService,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.connection.createQueryRunner();

    // validate if exist user's cart
    const cart = await this.cartsService.findByUser(createOrderDto.userId);

    if (!cart) {
      throw new NotFoundException(
        `No Cart found with userId "${createOrderDto.userId}".`,
      );
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Validate direction
      const direcction = await this.directionService.findOne(
        createOrderDto.directionId,
      );

      if (!direcction) {
        throw new NotFoundException(
          `No direcction found with id "${createOrderDto.directionId}".`,
        );
      }

      // Validate paymethod
      const paymethod = await this.paymethodsService.findOne(
        createOrderDto.directionId,
      );

      if (!paymethod) {
        throw new NotFoundException(
          `No paymethod found with id "${createOrderDto.directionId}".`,
        );
      }

      // Validate order status
      const orderStatus = await this.orderStatusService.findOne(
        createOrderDto.orderStatusId,
      );

      if (!orderStatus) {
        throw new NotFoundException(
          `No order status found with id "${createOrderDto.directionId}".`,
        );
      }

      const createdOrder = await this.ordersRepository.create(createOrderDto);

      const savedOrder = await queryRunner.manager.save(createdOrder);

      if (cart.cartDetail.length === 0) {
        throw new NotFoundException(`There are no elements in detail.`);
      }

      for (let index = 0; index < cart.cartDetail.length; index++) {
        const cartDetail = cart.cartDetail[index];

        // Validate if exist product
        const product = await this.productsService.findOne(
          cartDetail.productId,
        );

        // Validate product's stock
        if (product.stock <= cartDetail.quantity) {
          throw new NotFoundException(
            `No product stock with productId "${cartDetail.productId}".`,
          );
        } else {
          //update  product's stock
          await this.productsService.update(product.id, {
            stock: product.stock - cartDetail.quantity,
          });
        }

        const createdOrderDetail = this.orderDetailRepository.create({
          orderId: savedOrder.id,
          productId: cartDetail.productId,
          price: product.price,
          quality: cartDetail.quantity,
        });
        await queryRunner.manager.save(createdOrderDetail);
      }

      queryRunner.commitTransaction();

      await this.cartsService.remove(cart.id);
      return await this.findOne(savedOrder.id);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new NotFoundException(error);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: number) {
    return await this.ordersRepository.findOne(id, {
      relations: ['orderDetail'],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
