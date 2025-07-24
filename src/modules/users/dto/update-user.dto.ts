import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({ message: 'Id KO ĐÚNG ĐỊNH DẠNG' })
  @IsNotEmpty({ message: 'Id KO ĐC ĐỂ TRỐNG' })
  _id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  age: number;

  @IsOptional()
  image: string;
}
