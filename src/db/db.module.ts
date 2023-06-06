
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './schema/token.schema';
import { UserSchema } from './schema/user.schema';

const USER_MODULES = MongooseModule.forFeature([
    {
        name: 'USER_MODULE',
        schema: UserSchema,
        collection: 'users'
    }
])
const TOKEN_MODULES = MongooseModule.forFeature([
    {
        name: 'TOKEN_MODULE',
        schema: TokenSchema,
        collection: 'tokens'
    }
])
@Global()

@Module({
    // imports: [MongooseModule.forRoot('mongodb://admin:123456@localhost:27017/admin?authSource=admin'),


    imports: [MongooseModule.forRoot('mongodb+srv://fk7admin:nSJUhtLmb50NJ8nV@cluster0.de6oskr.mongodb.net/test'),
    USER_MODULES,TOKEN_MODULES
    ], exports: [USER_MODULES,TOKEN_MODULES]

})
export class DbModule { }
