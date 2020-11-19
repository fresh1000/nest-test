import { Test, TestingModule } from '@nestjs/testing';
import { CreateItemDto } from './dto/createItem.dto';
import { CreatePlayerDto } from './dto/createPlayer.dto';
import { Item } from './interfaces/item.interface';
import { Player } from './interfaces/player.interface';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

const testPlayer: Player = {
  id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
  name: 'test',
  description: 'sss',
  createdAt: new Date('2020-11-19T14:10:53.230Z'),
  updatedAt: new Date('2020-11-19T14:10:54.230Z'),
};

const testItem: Item = {
  id: 'a566a235-9328-48fe-9b9b-4e3bb3ad1429',
  name: 'test item',
  description: 'sss item',
  createdAt: new Date('2020-11-19T14:10:53.230Z'),
  updatedAt: new Date('2020-11-19T14:10:54.230Z'),
};

describe('PlayerController', () => {
  let controller: PlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([testPlayer]),
            getPlayerById: jest.fn().mockResolvedValue(testPlayer),
            deletePlayer: jest.fn().mockResolvedValue({ deleted: true }),
            createPlayer: jest
              .fn()
              .mockImplementation((player: CreatePlayerDto) =>
                Promise.resolve({ ...testPlayer, ...player }),
              ),
            createPlayerItem: jest.fn().mockResolvedValue(testItem),
            getPlayerItemsById: jest.fn().mockResolvedValue([testItem]),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all', async () => {
    const result: Player[] = [
      {
        id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
        name: 'test',
        description: 'sss',
        createdAt: new Date('2020-11-19T14:10:53.230Z'),
        updatedAt: new Date('2020-11-19T14:10:54.230Z'),
      },
    ];

    await expect(controller.getAll()).resolves.toEqual(result);
  });

  it('should get one player', async () => {
    const result: Player = {
      id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
      name: 'test',
      description: 'sss',
      createdAt: new Date('2020-11-19T14:10:53.230Z'),
      updatedAt: new Date('2020-11-19T14:10:54.230Z'),
    };

    await expect(
      controller.getPlayerById('0ac20183-99e2-489b-ae0d-51b131f279f3'),
    ).resolves.toEqual(result);
  });

  it('should delete player', async () => {
    const result = { deleted: true };
    await expect(
      controller.deletePlayer('0ac20183-99e2-489b-ae0d-51b131f279f3'),
    ).resolves.toEqual(result);
  });

  it('should create player', async () => {
    const newPlayerDto: CreatePlayerDto = {
      name: 'test',
      description: 'sss',
    };
    const result: Player = {
      id: '0ac20183-99e2-489b-ae0d-51b131f279f3',
      name: 'test',
      description: 'sss',
      createdAt: new Date('2020-11-19T14:10:53.230Z'),
      updatedAt: new Date('2020-11-19T14:10:54.230Z'),
    };
    await expect(controller.createPlayer(newPlayerDto)).resolves.toEqual(
      result,
    );
  });

  it('should create player item', async () => {
    const newItemDto: CreateItemDto = {
      name: 'test',
      description: 'sss',
    };
    const result: Item = {
      id: 'a566a235-9328-48fe-9b9b-4e3bb3ad1429',
      name: 'test item',
      description: 'sss item',
      createdAt: new Date('2020-11-19T14:10:53.230Z'),
      updatedAt: new Date('2020-11-19T14:10:54.230Z'),
    };

    await expect(
      controller.createPlayerItem(
        '0ac20183-99e2-489b-ae0d-51b131f279f3',
        newItemDto,
      ),
    ).resolves.toEqual(result);
  });

  it('should get player items', async () => {
    const result: Item[] = [
      {
        id: 'a566a235-9328-48fe-9b9b-4e3bb3ad1429',
        name: 'test item',
        description: 'sss item',
        createdAt: new Date('2020-11-19T14:10:53.230Z'),
        updatedAt: new Date('2020-11-19T14:10:54.230Z'),
      },
    ];

    await expect(
      controller.getPlayerItems('0ac20183-99e2-489b-ae0d-51b131f279f3'),
    ).resolves.toEqual(result);
  });
});
