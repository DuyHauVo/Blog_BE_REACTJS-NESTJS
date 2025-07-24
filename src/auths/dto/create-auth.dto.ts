import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Email KO ĐÚNG ĐỊNH DẠNG' })
  @IsNotEmpty({ message: 'Email KO ĐƯỢC ĐỂ TRỐNG' })
  email: string;

  @IsNotEmpty({ message: 'Password KO ĐƯỢC ĐỂ TRỐNG' })
  password: string;

  @IsOptional()
  name: string;
}
