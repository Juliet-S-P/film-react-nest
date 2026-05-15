import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @Type(() => Number)
  @IsNumber()
  row: number;

  @Type(() => Number)
  @IsNumber()
  seat: number;

  @Type(() => Number)
  @IsNumber()
  price: number;
}
