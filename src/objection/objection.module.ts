import { Global, Module, OnModuleInit } from '@nestjs/common';
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../../knexfile';

@Global()
@Module({
    providers: [],
    exports: [],
})

export class ObjectionModule implements OnModuleInit {
    onModuleInit() {
        const db = knex(knexConfig);
        Model.knex(db);
        console.log('✅ Objection.js connected to database');
    }
}