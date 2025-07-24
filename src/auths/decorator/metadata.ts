import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const ALLOWANY  = 'allow-any ';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const AllowAny = () => SetMetadata(ALLOWANY, true);

