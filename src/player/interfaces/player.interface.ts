import { Item } from './item.interface';

export interface Player {
  id: string;
  name: string;
  description: string;
  items?: Item[];
  createdAt: Date;
  updatedAt: Date;
}
