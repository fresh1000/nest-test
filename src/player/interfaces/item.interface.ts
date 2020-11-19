import { Player } from './player.interface';

export interface Item {
  id: string;
  name: string;
  description: string;
  player?: Player;
  createdAt: Date;
  updatedAt: Date;
}
