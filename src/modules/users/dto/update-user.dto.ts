import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {

  @IsOptional()
  name: string;

  @IsOptional()
  age: number;

  @IsOptional()
  image: string;
}
