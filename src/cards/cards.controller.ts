import { Controller, Post, Body, Req, UseGuards, Param, Get, Patch, Delete } from '@nestjs/common'
import { CardsService } from './cards.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { createOwnerGuard } from '../common/guards/owner.guard.factory';
import { Card } from '../models/card.model';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

class CreateCardDto {
    @ApiProperty({ example: 'Task title' })
    @IsString() title!: string;
    @ApiPropertyOptional({ example: 'Task description' })
    @IsOptional() @IsString() description?: string;
    @ApiProperty()
    @IsNumber() column_id!: number;
    @ApiPropertyOptional()
    @IsOptional() @IsNumber() position?: number;
}

class UpdateCardDto {
    @ApiPropertyOptional({ example: 'New title' })
    @IsOptional() @IsString() title!: string;
    @ApiPropertyOptional({ example: 'New description' })
    @IsOptional() @IsString() description?: string;
    @ApiPropertyOptional()
    @IsOptional() @IsNumber() position?: number;
}

@ApiTags('Cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
    constructor(private svc: CardsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create Card'})
    @ApiResponse({ status: 201, description: 'Card created' })
    create(@Body() dto: CreateCardDto, @Req() req: any) {
        return this.svc.create(req.user.userId, dto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Card' })
    findOne(@Param('id') id: string){
        return this.svc.findOne(Number(id))
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, createOwnerGuard(Card, 'id', 'user_id'))
    @ApiOperation({ summary: 'Update Card'})
    update(@Param('id') id: string, @Body() dto: UpdateCardDto){
        return this.svc.update(Number(id), dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, createOwnerGuard(Card, 'id', 'user_id'))
    @ApiOperation({ summary: 'Delete Card'})
    remove(@Param('id') id: string){
        return this.svc.remove(Number(id))
    }
}