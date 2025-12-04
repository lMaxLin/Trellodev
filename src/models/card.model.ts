import { BaseModel } from '../objection/base.model';
import { Column } from './column.model';
import { User } from './user.model';
import { Comment } from './comment.model';

export class Card extends BaseModel {
    static tableName = 'cards';

    id!: number;
    title!: string;
    description?: string;
    position!: number;
    column_id!: number;
    user_id!: number;

    static relationMappings = {
        column: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: Column,
            join: { from: 'cards.column_id', to: 'columns.id' },
        },
        user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: User,
            join: { from: 'cards.user_id', to: 'users.id' },
        },
        comments: {
            relation: BaseModel.HasManyRelation,
            modelClass: Comment,
            join: { from: 'cards.id', to: 'comments.card_id' },
        },
    };
}
