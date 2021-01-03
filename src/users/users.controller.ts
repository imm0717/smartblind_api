import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './entity/User';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private addressService: AddressService){

    }

    @Get()
    async getUsers(): Promise<User[]>{
        return await this.userService.getUsers()
    }

    //@UseGuards(JwtAuthGuard)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return await this.userService.createUser(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId/profile')
    async getProfile(@Param('userId') userId: number, ){
        return await this.userService.getUserData(userId)
    }

    @Put(':userId/profile')
    async update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto){
        return await this.userService.updateProfile(userId, updateUserDto)
    }

    @Post(':userId/address')
    async addAddress(@Param('userId') userId: number, @Body() addressesDto: CreateAddressDto){
        return await this.addressService.insertAddress(userId, addressesDto)
    }

    @Put(':userId/address/:addressId')
    async updateAddress(@Param('addressId') addressId: number, @Body() addressDto: CreateAddressDto){
        return await this.addressService.updateAddress(addressId, addressDto)
    }

    @Delete(':userId/address/:addressId')
    async deleteAddress(@Param('addressId') addressId: number){
        return await this.addressService.deleteAddress(addressId)
    }


    
}
