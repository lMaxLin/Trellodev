import { Injectable , NotFoundException } from '@nestjs/common'
import { Column } from '../models/column.model'

@Injectable()
export class ColumnService {
    create(userId: number, dto: { title: string; position?: number }){
        return Column.query().insert({ title: dto.title, position: dto.position?? 0, user_id: userId });
    }
    async findOne(id: number) {
        const c = await Column.query().findById(id);
        if (!c) throw new NotFoundException("Column not found");
        return c;
    }
    async update(id: number, dto: { title?: string, position?: number }) {
        return Column.query().patchAndFetchById(id, dto);
    }
    async remove(id: number ){
        return Column.query().deleteById(id);
    }

    async findByUser(userId: number) {
        return Column.query().where('user_id', userId)
    }
}