import { BaseModel } from '../objection/base.model';
import { User } from './user.model';
import { Card } from './card.model';

export class Comment extends BaseModel {
    static tableName = 'comments';

    text!: string;
    card_id!: number;
    user_id!: number;

    static relationMappings = {
        user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: User,
            join: { from: 'comments.user_id', to: 'users.id' },
        },
        card: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: Card,
            join: { from: 'comments.card_id', to: 'cards.id' },
        },
    };
}
