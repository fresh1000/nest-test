import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Player } from './player.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Item])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayerModule {}
