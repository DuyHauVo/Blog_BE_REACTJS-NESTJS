import {
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class queryDTO_User {
  @IsNumberString()
  @IsNotEmpty()
  Page: number;

  @IsNumberString()
  @IsNotEmpty()
  currenPage: number;

  @IsString()
  @IsNotIn([null, undefined])
  name: string;
}
