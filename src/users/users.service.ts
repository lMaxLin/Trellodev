import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from '../models/user.model';

@Injectable()
export class UsersService {
    async findById(id: number) {
        const u = await User.query().findById(id).select('id', 'email', 'name');
        if (!u) throw new NotFoundException('User not found');
        return u;
    }

    async findColumns(id: number) {
        return User.query().findById(id).withGraphFetched('columns');
    }
}