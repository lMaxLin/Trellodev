import { Controller, Post, Body, Req, UseGuards, Param, Get, Patch, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createOwnerGuard } from '../common/guards/owner.guard.factory';
import { Comment } from '../models/comment.model'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

class CreateCommentDto {
    @ApiProperty()
    @IsString() text!: string
    @ApiProperty()
    @IsNumber() card_id!: number;
}
class UpdateCommentDto {
    @ApiPropertyOptional()
    @IsOptional() @IsString() text?: string;
}

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
    constructor(private svc: CommentsService) {}
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create Comment'})
    @ApiResponse({ status: 201, description: 'Comment created' })
    create(@Body() dto: CreateCommentDto, @Req() req: any){
        return this.svc.create(req.user.userId, dto)
    }

    @Get(':id')
    @ApiOperation({summary: 'Get Comment'})
    findOne(@Param('id') id: string){
        return this.svc.findOne(Number(id));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, createOwnerGuard(Comment, 'id','user_id'))
    @ApiOperation({summary: 'Update Comment'})
    update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
        return this.svc.update(Number(id), dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, createOwnerGuard(Comment, 'id', 'user_id'))
    @ApiOperation({summary: 'Delete Comment'})
    remove(@Param('id') id: string) {
        return this.svc.remove(Number(id));
    }
}