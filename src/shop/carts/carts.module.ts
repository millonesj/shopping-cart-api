import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { CartDetail } from '../cart-detail/entities/cart-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartDetail, User, Product])],
  controllers: [CartsController],
  providers: [CartsService, UsersService, ProductsService],
})
export class CartsModule {}
