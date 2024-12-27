import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationGuard } from './utils/guard/authentication.guard.service';
import { AddItemDTO } from './utils/dto/add.item.dto';
import { Roles } from './utils/decorator/role.decorator';
import { Role } from './utils/enum/role.enum';
import { AuthorisationGuard } from './utils/guard/authorisation.guard.service';
import { ItemEntity } from './utils/entity/item.entity';
import { UpdateItemDTO } from './utils/dto/update.item.dto';
import { ManageInventoryDTO } from './utils/dto/manage.inventory.dto';
import { BookItemsDTO } from './utils/dto/book.item.dto';

@Controller('grocery')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthenticationGuard, AuthorisationGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('item')
  async getItems(): Promise<ItemEntity[]> {
    return await this.appService.getItems();
  }

  @UseGuards(AuthenticationGuard, AuthorisationGuard)
  @Roles(Role.ADMIN)
  @Post('item')
  async addItem(@Body() params: AddItemDTO): Promise<void> {
    await this.appService.addItem(params);
  }

  @UseGuards(AuthenticationGuard, AuthorisationGuard)
  @Roles(Role.ADMIN)
  @Delete('item/:itemId')
  async deleteItem(@Param('itemId') itemId: string): Promise<void> {
    await this.appService.deleteItem(itemId);
  }

  @UseGuards(AuthenticationGuard, AuthorisationGuard)
  @Roles(Role.ADMIN)
  @Patch('item')
  async updateItem(@Body() params: UpdateItemDTO): Promise<void> {
    await this.appService.updateItem(params);
  }

  @UseGuards(AuthenticationGuard, AuthorisationGuard)
  @Roles(Role.ADMIN)
  @Patch('manage-inventory')
  async manageInventory(@Body() params: ManageInventoryDTO): Promise<void> {
    await this.appService.manageInventory(params);
  }

  @UseGuards(AuthenticationGuard, AuthorisationGuard)
  @Roles(Role.USER)
  @Patch('book-items')
  async bookItems(@Body() params: BookItemsDTO): Promise<void> {
    await this.appService.bookItems(params);
  }
}
