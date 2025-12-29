import { Controller, Post, Body, Req, UseGuards, Param, Get, Patch, Delete } from '@nestjs/common'
import { CardsService } from './cards.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { createOwnerGuard } from '../common/guards/owner.guard.factory';
import { Card } from '../models/card.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

class CreateCardDto {
    @IsString() title!: string;
    @IsOptional() @IsString() description?: string;
    @IsNumber() column_id!: number;
    @IsOptional() @IsNumber() position?: number;
}

class UpdateCardDto {
    @IsOptional() @IsString() title!: string;
    @IsOptional() @IsString() description?: string;
    @IsOptional() @IsNumber() position?: number;
}


ApiTags('Cards')
@Controller('cards')
export class CardsController {
    constructor(private svc: CardsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create Card'})
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