import { Profile } from './entity/Profile';
import { UpdateUserDto } from './dto/updateUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from './dto/createUser.dto';
import { Gender } from './entity/Gender';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, 
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>) {

    }

    private async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({ email: email });
    }

    async getUserData(id: number): Promise<User> {
        return await this.userRepository.findOne({ id: id})
    }

    async createUser(data: CreateUserDto): Promise<User> {
        if (data.email && data.password) {
            const userInDb = await this.findUserByEmail(data.email)
            if (!userInDb) {
                const encryptedPassword = await this.encryptPassword(data.password)
                const user = this.userRepository.create()
                user.email = data.email
                user.password = encryptedPassword
                
                const profile = this.profileRepository.create()
                profile.firstname = data.firstname
                profile.lastname = data.lastname
                user.profile = profile
                
                return await this.userRepository.save(user)
            } else {
                throw new HttpException('The email already exist in our System', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        } else {
            throw new HttpException('Params error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateProfile(id: number, data: UpdateUserDto) {
        const userInDb = await this.userRepository.findOne({ id: id})
        if (userInDb){
            userInDb.profile.firstname = data.firstname || userInDb.profile.firstname
            userInDb.profile.lastname = data.lastname || userInDb.profile.lastname
            userInDb.profile.phone = data.phone || userInDb.profile.phone
            userInDb.profile.date_of_birth = data.date_of_birth || userInDb.profile.date_of_birth
            if (data.genderId){
                const gender: Gender | undefined = await this.genderRepository.findOne(data.genderId)
                userInDb.profile.gender = gender || userInDb.profile.gender
            }

            return await this.userRepository.save(userInDb)
        }

        throw new HttpException('Profile update problem', HttpStatus.INTERNAL_SERVER_ERROR)

    }
}
