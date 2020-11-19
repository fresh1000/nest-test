import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Player } from './player.entity';
import { Player as PlayerInterface } from './interfaces/player.interface';
import { Item as ItemInterface } from './interfaces/item.interface';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/createPlayer.dto';
import { CreateItemDto } from './dto/createItem.dto';

const playerArray: PlayerInterface[] = [
  {
    id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
    name: 'test1',
    description: 'sss1',
    createdAt: new Date('2020-11-19T14:10:53.230Z'),
    updatedAt: new Date('2020-11-19T14:10:54.230Z'),
  },
  {
    id: 'aec48745-54da-4b35-8a94-dadfc65a423f',
    name: 'test2',
    description: 'sss2',
    createdAt: new Date('2020-11-19T14:10:53.230Z'),
    updatedAt: new Date('2020-11-19T14:10:54.230Z'),
  },
];

const itemArray: ItemInterface[] = [
  {
    id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
    name: 'test1',
    description: 'sss1',
    createdAt: new Date('2020-11-19T14:10:53.230Z'),
    updatedAt: new Date('2020-11-19T14:10:54.230Z'),
  },
  {
    id: 'aec48745-54da-4b35-8a94-dadfc65a423f',
    name: 'test2',
    description: 'sss2',
    createdAt: new Date('2020-11-19T14:10:53.230Z'),
    updatedAt: new Date('2020-11-19T14:10:54.230Z'),
  },
];

const playerWithItems = {
  id: '1fb21309-0526-4ee9-a13e-f7aff4f0a8a6',
  name: 'test',
  description: 'sss',
  items: itemArray,
  createdAt: new Date('2020-11-19T14:10:53.230Z'),
  updatedAt: new Date('2020-11-19T14:10:54.230Z'),
};

describe('PlayerService', () => {
  let service: PlayersService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useValue: {
            find: jest.fn().mockResolvedValue(playerArray),
            delete: jest.fn().mockResolvedValue({ affected: true }),
            create: jest.fn().mockResolvedValue(playerArray[0]),
            save: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: getRepositoryToken(Item),
          useValue: {
            create: jest.fn().mockResolvedValue(itemArray[0]),
            save: jest.fn().mockResolvedValue(null),
            findOne: jest.fn().mockResolvedValue(itemArray[0]),
          },
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    playerRepository = module.get<Repository<Player>>(
      getRepositoryToken(Player),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all players', async () => {
    const result: PlayerInterface[] = [
      {
        id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
        name: 'test1',
        description: 'sss1',
        createdAt: new Date('2020-11-19T14:10:53.230Z'),
        updatedAt: new Date('2020-11-19T14:10:54.230Z'),
      },
      {
        id: 'aec48745-54da-4b35-8a94-dadfc65a423f',
        name: 'test2',
        description: 'sss2',
        createdAt: new Date('2020-11-19T14:10:53.230Z'),
        updatedAt: new Date('2020-11-19T14:10:54.230Z'),
      },
    ];

    await expect(service.getAll()).resolves.toEqual(result);
  });

  it('should find player by id', async () => {
    playerRepository.findOne = jest.fn().mockResolvedValue(playerArray[0]);
    const result: PlayerInterface = {
      id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
      name: 'test1',
      description: 'sss1',
      createdAt: new Date('2020-11-19T14:10:53.230Z'),
      updatedAt: new Date('2020-11-19T14:10:54.230Z'),
    };

    await expect(
      service.getPlayerById('0ac20183-99e2-489b-ae0d-51b131f279f3'),
    ).resolves.toEqual(result);
  });

  it('should find player items by id', async () => {
    playerRepository.findOne = jest.fn().mockResolvedValue(playerWithItems);
    const result: ItemInterface[] = [
      {
        id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
        name: 'test1',
        description: 'sss1',
        createdAt: new Date('2020-11-19T14:10:53.230Z'),
        updatedAt: new Date('2020-11-19T14:10:54.230Z'),
      },
      {
        id: 'aec48745-54da-4b35-8a94-dadfc65a423f',
        name: 'test2',
        description: 'sss2',
        createdAt: new Date('2020-11-19T14:10:53.230Z'),
        updatedAt: new Date('2020-11-19T14:10:54.230Z'),
      },
    ];

    await expect(
      service.getPlayerItemsById('1fb21309-0526-4ee9-a13e-f7aff4f0a8a6'),
    ).resolves.toEqual(result);
  });

  it('should delete', async () => {
    const result = { deleted: true };
    await expect(
      service.deletePlayer('1fb21309-0526-4ee9-a13e-f7aff4f0a8a6'),
    ).resolves.toEqual(result);
  });

  it('should create player', async () => {
    const newPlayer: CreatePlayerDto = {
      name: 'test1',
      description: 'sss1',
    };
    const result: PlayerInterface = {
      id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
      name: 'test1',
      description: 'sss1',
      createdAt: new Date('2020-11-19T14:10:53.230Z'),
      updatedAt: new Date('2020-11-19T14:10:54.230Z'),
    };
    await expect(service.createPlayer(newPlayer)).resolves.toEqual(result);
  });

  it('should create player item', async () => {
    playerRepository.findOne = jest.fn().mockResolvedValue(playerArray[0]);

    const newItem: CreateItemDto = {
      name: 'test1',
      description: 'sss1',
    };
    const result: ItemInterface = {
      id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
      name: 'test1',
      description: 'sss1',
      createdAt: new Date('2020-11-19T14:10:53.230Z'),
      updatedAt: new Date('2020-11-19T14:10:54.230Z'),
    };

    await expect(
      service.createPlayerItem('bed03c63-62af-4100-b7d0-9ecc4fbb00bc', newItem),
    ).resolves.toEqual(result);
  });
});
