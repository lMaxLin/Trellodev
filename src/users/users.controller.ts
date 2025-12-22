import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private svc: UsersService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    get(@Param('id') id: string) {
        return this.svc.findById(Number(id));
    }

    @Get(':id/columns')
    @ApiOperation({ summary: 'Get user columns' })
    getColumns(@Param('id') id: string) {
        return this.svc.findColumns(Number(id));
    }
}