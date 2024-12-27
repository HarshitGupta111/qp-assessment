import { ArrayNotEmpty, ArrayUnique, IsArray, IsString } from 'class-validator';

export class BookItemsDTO {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  ItemIds: string[];
}
