import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { CreateCartDetailDto, UpdateCartDetailDto } from './dto';
import { CartDetail } from './entities/cart-detail.entity';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
    private cartsService: CartsService,
    private productsService: ProductsService,
  ) {}

  async create(createCartDetailDto: CreateCartDetailDto) {
    const cart = await this.cartsService.findOne(createCartDetailDto.cartId);

    if (!cart) {
      throw new NotFoundException(
        `No Cart found with id "${createCartDetailDto.cartId}".`,
      );
    }

    const product = await this.productsService.findOne(
      createCartDetailDto.productId,
    );

    if (!product) {
      throw new NotFoundException(
        `No Cart found with id "${createCartDetailDto.productId}".`,
      );
    }

    const createdRecord = await this.cartDetailRepository.save(
      createCartDetailDto,
    );

    return this.findOne(createdRecord.id);
  }

  async findAll() {
    return await this.cartDetailRepository.find();
  }

  async findOne(id: number) {
    return await this.cartDetailRepository.findOne(id);
  }

  async update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
    await this.cartDetailRepository.update(id, updateCartDetailDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const record = await this.cartDetailRepository.findOne(id);

    if (!record) {
      throw new NotFoundException(`No Cart Detail found with id "${id}".`);
    }

    await this.cartDetailRepository.delete(id);

    return true;
  }
}
