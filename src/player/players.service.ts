import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/createItem.dto';
import { CreatePlayerDto } from './dto/createPlayer.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  getAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  async getPlayerById(id: string): Promise<Player> {
    const player = await this.playersRepository.findOne(id);
    if (player) {
      return player;
    }
    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  }

  async getPlayerItemsById(id: string): Promise<Item[]> {
    const player = await this.playersRepository.findOne(id, {
      relations: ['items'],
    });
    if (player) {
      return player.items;
    }
    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  }

  async deletePlayer(id: string): Promise<{ deleted: boolean }> {
    const deleteResponse = await this.playersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }

  async createPlayer(player: CreatePlayerDto) {
    const newPlayer = this.playersRepository.create(player);
    await this.playersRepository.save(newPlayer);
    return newPlayer;
  }

  async createPlayerItem(id: string, item: CreateItemDto) {
    const player = await this.playersRepository.findOne(id, {
      relations: ['items'],
    });
    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    const itemObject = new Item();
    itemObject.name = item.name;
    itemObject.description = item.description;
    itemObject.player = player;

    const newItem = this.itemsRepository.create(itemObject);
    await this.itemsRepository.save(newItem);
    const createdItem = await this.itemsRepository.findOne(newItem.id);
    return createdItem;
  }
}
