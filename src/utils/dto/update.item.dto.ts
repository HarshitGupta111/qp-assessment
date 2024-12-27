import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateItemDTO {
  @IsString()
  @IsNotEmpty()
  ItemId: string;

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsNumber()
  @IsNotEmpty()
  Price: number;
}
