import { BaseModel } from '../objection/base.model';
import { User } from './user.model';
import { Card } from './card.model';

export class Column extends BaseModel {
    static tableName = 'columns';

    id!: number;
    title!: string;
    position!: number;
    user_id!: number;

    static relationMappings = {
        user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: User,
            join: { from: 'columns.user_id', to: 'users.id' },
        },
        cards: {
            relation: BaseModel.HasManyRelation,
            modelClass: Card,
            join: { from: 'columns.id', to: 'cards.column_id' },
        },
    };
}
