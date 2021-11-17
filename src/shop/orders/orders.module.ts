import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CartsService } from '../carts/carts.service';
import { Cart } from '../carts/entities/cart.entity';
import { CartDetail } from '../cart-detail/entities/cart-detail.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { DirectionsService } from '../directions/directions.service';
import { Direction } from '../directions/entities/direction.entity';
import { PaymethodsService } from '../paymethods/paymethods.service';
import { Paymethod } from '../paymethods/entities/paymethod.entity';
import { OrderStatusService } from '../order-status/order-status.service';
import { OrderStatus } from '../order-status/entities/order-status.entity';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Cart,
      CartDetail,
      User,
      Product,
      Direction,
      Paymethod,
      OrderStatus,
      OrderDetail,
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    CartsService,
    UsersService,
    ProductsService,
    DirectionsService,
    PaymethodsService,
    OrderStatusService,
  ],
})
export class OrdersModule {}
