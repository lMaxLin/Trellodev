import { BaseModel } from '../objection/base.model';
import { Column } from './column.model';
import { Card } from './card.model';
import { Comment } from './comment.model';

export class User extends BaseModel {
    static tableName = 'users';

    email!: string;
    password!: string;
    name?: string;

    static relationMappings = {
        columns: {
            relation: BaseModel.HasManyRelation,
            modelClass: Column,
            join: { from: 'users.id', to: 'columns.user_id' },
        },
        cards: {
            relation: BaseModel.HasManyRelation,
            modelClass: Card,
            join: { from: 'users.id', to: 'cards.user_id' },
        },
        comments: {
            relation: BaseModel.HasManyRelation,
            modelClass: Comment,
            join: { from: 'users.id', to: 'comments.user_id' },
        },
    };
}
