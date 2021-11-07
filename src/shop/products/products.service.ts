import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../../share/dto/page-meta.dto';
import { PageDto } from '../../share/dto/page.dto';
import { Repository } from 'typeorm';
import {
  QueryProductDto,
  ReadProductDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return `This action create product`;
  }

  /**
   * Returns products according to filters and page
   * @param queryProductDto
   * @returns ReadProductDto type
   */
  async findAll(
    queryProductDto: QueryProductDto,
  ): Promise<PageDto<ReadProductDto>> {
    const { name, sku, fromPrice, toPrice, take, page, skip } = queryProductDto;

    let queryProducts = this.productRepository
      .createQueryBuilder('product')
      .where('product.isDeleted = :isDeleted', { isDeleted: false });

    if (name?.length) {
      queryProducts = queryProducts.andWhere(
        `LOWER(product.name) LIKE(LOWER(:name))`,
        { name: `%${name}%` },
      );
    }

    if (sku?.length) {
      queryProducts = queryProducts.andWhere(`sku = :sku`, { sku });
    }

    if (fromPrice) {
      queryProducts = queryProducts.andWhere(`price >= :fromPrice`, {
        fromPrice,
      });
    }

    if (toPrice) {
      queryProducts = queryProducts.andWhere(`price <= :toPrice`, { toPrice });
    }

    queryProducts.skip(skip).take(take);

    const resultProducts = await queryProducts.getManyAndCount();

    const productsDto = resultProducts[0].map((product: Product) =>
      plainToClass(ReadProductDto, product),
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: resultProducts[1],
      pageOptionsDto: {
        take,
        page,
        skip,
      },
    });

    return new PageDto(productsDto, pageMetaDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
