import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { ModelClass } from 'objection';

export function createOwnerGuard(modelClass: ModelClass<any>, idParam = 'id', ownerField = 'user_id'){
    @Injectable()
    class OwnerGuard implements CanActivate{
        async canActivate(context: ExecutionContext) {
            const req = context.switchToHttp().getRequest();
            const user = req.user as any
            if (!user || !user.userId) return false;

            const id = Number(req.params[idParam]);
            if (!id) throw new ForbiddenException('Resource id missing')

            const record = await modelClass.query().findById(id);
            if (!record) throw new ForbiddenException('Resource not found')

            if (record[ownerField] != user.userId) throw new ForbiddenException('Forbidden');

            return true
        }
    }
    return OwnerGuard;
}