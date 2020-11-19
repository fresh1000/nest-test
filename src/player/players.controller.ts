import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/createItem.dto';
import { CreatePlayerDto } from './dto/createPlayer.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private service: PlayersService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getPlayerById(@Param('id') id: string) {
    return this.service.getPlayerById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPlayer(@Body() player: CreatePlayerDto) {
    return this.service.createPlayer(player);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.service.deletePlayer(id);
  }

  @Post(':id/items')
  @UsePipes(new ValidationPipe())
  createPlayerItem(@Param('id') id: string, @Body() item: CreateItemDto) {
    return this.service.createPlayerItem(id, item);
  }

  @Get(':id/items')
  getPlayerItems(@Param('id') id: string) {
    return this.service.getPlayerItemsById(id);
  }
}
