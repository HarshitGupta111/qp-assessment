import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemDTO {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsNumber()
  @IsNotEmpty()
  Price: number;

  @IsNumber()
  @IsNotEmpty()
  Quantity: number;
}
