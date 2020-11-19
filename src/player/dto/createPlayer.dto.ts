import { IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
