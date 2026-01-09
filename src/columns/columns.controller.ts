import { Controller, Post, Body, Req, UseGuards, Param, Get, Patch, Delete } from '@nestjs/common';
import { ColumnService } from './columns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createOwnerGuard } from '../common/guards/owner.guard.factory';
import { Column } from '../models/column.model'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Request } from 'express';

class CreateColumnDto {
    @ApiProperty()
    @IsString() title!: string;
    @ApiPropertyOptional()
    @IsOptional() @IsNumber() position?: number;
}
class UpdateColumnDto{
    @ApiPropertyOptional({ example: 'In progress' })
    @IsOptional() @IsString() title?: string;
    @ApiPropertyOptional()
    @IsOptional() @IsNumber() position?: number;
}

@ApiTags('Column')
@ApiBearerAuth()
@Controller('columns')
export class ColumnsController {
    constructor(private svc: ColumnService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create column' })
    create( @Body() dto: CreateColumnDto, @Req() req: Request & { user: { userId: number } }) {
        return this.svc.create(req.user.userId, dto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get column'})
    findOne(@Param('id')id: string) {
        return this.svc.findOne(Number(id))
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, createOwnerGuard(Column, 'id', 'user_id'))
    @ApiOperation({ summary: 'Update column'})
    update(@Param('id') id: string, @Body() dto: UpdateColumnDto) {
        return this.svc.update(Number(id), dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, createOwnerGuard(Column, 'id', 'user_id'))
    @ApiOperation({ summary: 'Delete column'})
    remove(@Param('id') id: string) {
        return this.svc.remove(Number(id));
    }

}