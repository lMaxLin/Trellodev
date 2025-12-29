import { Injectable , NotFoundException } from '@nestjs/common'
import { Comment } from '../models/comment.model'

@Injectable()
export class CommentsService {
    create(userId: number, dto: { text: string; card_id?: number }) {
        return Comment.query().insert({text: dto.text, card_id: dto.card_id, user_id: userId});
    }
    async findOne(id: number){
        const c = await Comment.query().findById(id);
        if (!c) throw new  NotFoundException('Comment not found')
    }
    async update(id: number, dto: { text?: string}){
        return Comment.query().patchAndFetchById(id, dto)
    }
    async remove(id: number){
        return Comment.query().deleteById(id)
    }
    async findByCard(cardId: number ){
        return Comment.query().where('card_id', cardId)
    }

}

