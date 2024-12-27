import { v4 as uuid } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { ItemEntity } from './utils/entity/item.entity';
import { AddItemDTO } from './utils/dto/add.item.dto';
import { UpdateItemDTO } from './utils/dto/update.item.dto';
import { ManageInventoryDTO } from './utils/dto/manage.inventory.dto';
import { Action } from './utils/constant/action.constant';
import { BookItemsDTO } from './utils/dto/book.item.dto';
import { ExceptionMessage } from './utils/constant/message.constant';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async validateItemId(itemId: string): Promise<ItemEntity> {
    try {
      const item = await this.dataSource.manager.findOneBy(ItemEntity, {
        ItemId: itemId,
      });
      if (!item) {
        throw new NotFoundException(ExceptionMessage.NotFound);
      }
      return item;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getItems(): Promise<ItemEntity[]> {
    try {
      return await this.dataSource.manager.find(ItemEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addItem(params: AddItemDTO): Promise<void> {
    try {
      await this.dataSource.manager.insert(ItemEntity, {
        ItemId: uuid(),
        Name: params.Name,
        Price: +params.Price,
        TotalQuantity: +params.Quantity,
        RemainingQuantity: +params.Quantity,
        CreatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteItem(itemId: string): Promise<void> {
    try {
      await this.validateItemId(itemId);
      await this.dataSource.manager.delete(ItemEntity, { ItemId: itemId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateItem(params: UpdateItemDTO): Promise<void> {
    try {
      await this.validateItemId(params.ItemId);
      await this.dataSource.manager.update(
        ItemEntity,
        {
          ItemId: params.ItemId,
        },
        {
          Name: params.Name,
          Price: params.Price,
          ModifiedAt: new Date().toISOString(),
        },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async manageInventory(params: ManageInventoryDTO): Promise<void> {
    try {
      const item = await this.validateItemId(params.ItemId);
      await this.dataSource.manager.update(
        ItemEntity,
        {
          ItemId: params.ItemId,
        },
        {
          TotalQuantity:
            params.Action === Action.Increase
              ? item.TotalQuantity + params.Quantity
              : item.TotalQuantity - params.Quantity >= 0
                ? item.TotalQuantity - params.Quantity
                : 0,
          RemainingQuantity:
            params.Action === Action.Increase
              ? item.RemainingQuantity + params.Quantity
              : item.RemainingQuantity - params.Quantity >= 0
                ? item.RemainingQuantity - params.Quantity
                : 0,
          ModifiedAt: new Date().toISOString(),
        },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async bookItems(params: BookItemsDTO): Promise<void> {
    try {
      const items = await this.dataSource.manager.findBy(ItemEntity, {
        ItemId: In(params.ItemIds),
      });
      if (items.length !== params.ItemIds.length) {
        throw new BadRequestException(ExceptionMessage.NotFound);
      }
      if (!items.every((item) => item.RemainingQuantity >= 1)) {
        throw new BadRequestException(ExceptionMessage.SoldOut);
      }

      await this.dataSource.manager.increment(
        ItemEntity,
        { ItemId: In(params.ItemIds) },
        'BookedQuantity',
        1,
      );

      await this.dataSource.manager.decrement(
        ItemEntity,
        { ItemId: In(params.ItemIds) },
        'RemainingQuantity',
        1,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
