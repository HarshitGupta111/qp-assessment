import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Action } from '../constant/action.constant';

export class ManageInventoryDTO {
  @IsString()
  @IsNotEmpty()
  ItemId: string;

  @IsString()
  @IsIn([Action.Increase, Action.Decrease])
  @IsNotEmpty()
  Action: string;

  @IsNumber()
  @IsNotEmpty()
  Quantity: number;
}
