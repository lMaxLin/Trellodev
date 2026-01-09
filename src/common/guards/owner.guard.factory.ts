import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { ModelClass } from 'objection';
import { NotFoundException } from '@nestjs/common'

export function createOwnerGuard(modelClass: ModelClass<any>, idParam = 'id', ownerField = 'user_id'){
    @Injectable()
    class OwnerGuard implements CanActivate{
        async canActivate(context: ExecutionContext) {
            const req = context.switchToHttp().getRequest();
            const user = req.user;
            if (!user?.userId) {
                throw new ForbiddenException('Unauthorized')
            }

            const id = Number(req.params[idParam]);
            if (Number.isNaN(id)) throw new ForbiddenException('Resource id missing')

            const record = await modelClass.query().findById(id);
            if (!record) {
                throw new NotFoundException ('Resource not found')
            }

            if (record[ownerField] !== user.userId) throw new ForbiddenException('Forbidden');

            return true
        }
    }
    return OwnerGuard;
}