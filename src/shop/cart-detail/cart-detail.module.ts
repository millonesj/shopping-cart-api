import { Module } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CartDetailController } from './cart-detail.controller';
import { CartDetail } from './entities/cart-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { Cart } from '../carts/entities/cart.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartDetail, Cart, User, Product])],
  controllers: [CartDetailController],
  providers: [CartDetailService, CartsService, UsersService, ProductsService],
})
export class CartDetailModule {}
