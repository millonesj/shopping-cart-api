import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CartDetail } from '../cart-detail/entities/cart-detail.entity';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { CreateCartDetailDto, CreateCartDto, UpdateCartDto } from './dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    private connection: Connection,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const queryRunner = this.connection.createQueryRunner();

    // validate if exist user's cart
    const cart = await this.findByUser(createCartDto.userId);
    // If exist cart to update it
    if (cart) {
      return this.updateDetail(
        cart.id,
        createCartDto.userId,
        createCartDto.detail,
      );
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.usersService.findOne(createCartDto.userId);

      if (!user) {
        throw new NotFoundException(
          `No User found with id "${createCartDto.userId}".`,
        );
      }

      const createdCart = await this.cartRepository.create({
        userId: createCartDto.userId,
      });

      const savedCart = await queryRunner.manager.save(createdCart);

      if (createCartDto.detail.length === 0) {
        throw new NotFoundException(`There are no elements in detail.`);
      }

      if (createCartDto.detail.length === 0) {
        throw new NotFoundException(`There are no elements in detail.`);
      }

      for (let index = 0; index < createCartDto.detail.length; index++) {
        const cartDetail = createCartDto.detail[index];

        // Validate if exist product
        const product = await this.productsService.findOne(
          cartDetail.productId,
        );

        if (!product) {
          throw new NotFoundException(
            `No product found with id "${cartDetail.productId}".`,
          );
        }

        // Validate product's stock
        if (product.stock <= cartDetail.quantity) {
          throw new NotFoundException(
            `No product stock with productId "${cartDetail.productId}".`,
          );
        }

        const createdCartDetail = this.cartDetailRepository.create({
          cartId: savedCart.id,
          ...cartDetail,
        });
        await queryRunner.manager.save(createdCartDetail);
      }

      queryRunner.commitTransaction();
      return await this.findByUser(createCartDto.userId);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new NotFoundException(error);
    }
  }

  async findByUser(userId: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: {
        userId,
      },
      relations: ['cartDetail'],
    });
  }

  async findOne(id: number): Promise<Cart> {
    return await this.cartRepository.findOne(id);
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.findOne(id);

    if (!cart) {
      throw new NotFoundException(`No Cart found with id "${id}".`);
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // delete details
      await this.cartDetailRepository.delete({
        cartId: id,
      });

      await this.saveDetail(id, updateCartDto.detail);

      queryRunner.commitTransaction();
      return await this.findByUser(cart.userId);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new NotFoundException(error);
    }
  }

  private async updateDetail(
    id: number,
    userId: number,
    createCartDetailDtos: CreateCartDetailDto[],
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // delete details
      await this.cartDetailRepository.delete({
        cartId: id,
      });

      await this.saveDetail(id, createCartDetailDtos);

      queryRunner.commitTransaction();
      return await this.findByUser(userId);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new NotFoundException(error);
    }
  }

  private async saveDetail(
    cartId: number,
    detail: CreateCartDetailDto[],
  ): Promise<boolean> {
    if (detail.length === 0) {
      throw new NotFoundException(`There are no elements in detail.`);
    }
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let index = 0; index < detail.length; index++) {
        const cartDetail = detail[index];

        // Validate if exist product
        const product = await this.productsService.findOne(
          cartDetail.productId,
        );

        if (!product) {
          throw new NotFoundException(
            `No product found with id "${cartDetail.productId}".`,
          );
        }

        // Validate product's stock
        if (product.stock <= cartDetail.quantity) {
          throw new NotFoundException(
            `No product stock with productId "${cartDetail.productId}".`,
          );
        }

        const createdCartDetail = this.cartDetailRepository.create({
          cartId,
          ...cartDetail,
        });
        await queryRunner.manager.save(createdCartDetail);
      }
      queryRunner.commitTransaction();
      return true;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new NotFoundException(error);
    }
  }

  async remove(id: number) {
    await this.cartRepository.delete(id);
    return true;
  }
}
