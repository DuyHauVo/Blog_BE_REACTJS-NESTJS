import {
  IsNotEmpty,
  IsNotIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class queryDTO_Post {
  @IsNumberString({}, { message: `phải là chuỗi "abc21" ` })
  @IsNotEmpty()
  Page: number | string;

  @IsNumberString({}, { message: `phải là chuỗi "abc21" ` })
  @IsNotEmpty()
  currenPage: number | string;

  @IsOptional()
  @IsString()
  name: string;
}
