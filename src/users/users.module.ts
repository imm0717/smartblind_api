import { Gender } from './entity/Gender';
import { Address } from './entity/Address';
import { Profile } from './entity/Profile';
import { User } from './entity/User';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';

@Module({
  imports:[TypeOrmModule.forFeature([User, Profile, Address, Gender])],
  providers: [UsersService, AddressService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {} 
