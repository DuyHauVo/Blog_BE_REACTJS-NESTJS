import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name không đc để trống' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Emaail không đúng đình dạng' })
  email: string;

  @IsNotEmpty()
  password: string;

  age: number;
  image: string;
}
