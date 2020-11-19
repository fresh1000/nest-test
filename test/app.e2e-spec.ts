import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PlayerModule', () => {
    afterEach(async () => {
      const uncleared = await request(app.getHttpServer()).get('/players');
      await Promise.all(
        uncleared.body.map(async (player) => {
          return request(app.getHttpServer()).delete(`/players/${player.id}`);
        }),
      );
    });

    it('Post player, get all players, get player by id, post player items, get player item, delete', async () => {
      const player = {
        name: 'Test name',
        description: 'Test description',
      };
      const data = await request(app.getHttpServer())
        .post('/players')
        .send(player)
        .expect(201);

      expect(data.body).toEqual({
        ...player,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(String),
      });

      const players = await request(app.getHttpServer())
        .get('/players')
        .expect(200);
      expect(players.body).toEqual(expect.any(Array));
      expect(players.body.length).toBe(1);
      expect(players.body[0]).toEqual({
        ...player,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(String),
      });

      const playerResponse = await request(app.getHttpServer())
        .get(`/players/${data.body.id}`)
        .expect(200);
      expect(playerResponse.body).toEqual(data.body);

      const item = {
        name: 'item name',
        description: 'item description',
      };
      const itemData = await request(app.getHttpServer())
        .post(`/players/${data.body.id}/items`)
        .send(item)
        .expect(201);
      expect(itemData.body).toEqual({
        ...item,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(String),
      });

      const itemResponse = await request(app.getHttpServer())
        .get(`/players/${data.body.id}/items`)
        .expect(200);
      expect(itemResponse.body).toEqual([itemData.body]);

      await request(app.getHttpServer())
        .delete(`/players/${data.body.id}`)
        .expect(200)
        .expect({ deleted: true });
    });
  });
});
