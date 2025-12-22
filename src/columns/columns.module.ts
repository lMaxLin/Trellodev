import { Module } from '@nestjs/common'
import { ColumnService } from './columns.service';
import { ColumnsController } from './columns.controller';

@Module({
    providers: [ ColumnService ],
    controllers: [ ColumnsController],
})

export class ColumnsModule {}