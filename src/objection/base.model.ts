import { Model } from 'objection';

export class BaseModel extends Model {
    id!: number;
    createdAt!: string;
    updatedAt?: string;
}