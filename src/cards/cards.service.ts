import { Injectable, NotFoundException } from "@nestjs/common"
import { Card } from "../models/card.model"

@Injectable()
export class CardsService{
    create(userId: number, dto: { title: string; description?: string; column_id: number; position?: number }) {
        return Card.query().insert({
            title: dto.title,
            description: dto.description,
            column_id: dto.column_id,
            user_id: userId,
            position: dto.position ?? 0,
        })
    }
        async findOne( id: number){
            const c = await Card.query().findById(id);
            if (!c) throw new NotFoundException('Card not found')
            return c;
        }
        async update(id: number, dto: Partial<{ title: string, description: string, position: number }>){
            return Card.query().patchAndFetchById(id,dto)
        }

        async remove(id: number){
            return Card.query().deleteById(id);
        }
        async findByColumn(columnId: number){
            return Card.query().where('column_id', columnId)
        }
}