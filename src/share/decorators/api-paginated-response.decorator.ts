import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ReadProductDto } from '../../shop/products/dto/read-product.dto';

import { PageDto } from '../dto';
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto, ReadProductDto),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
