import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/createAddress.dto';
import { Address } from './entity/Address';
import { User } from './entity/User';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(User) private userRepository: Repository<User>) {

    }

    async insertAddress(userId: number, addressDto: CreateAddressDto): Promise<Address> {
        const user = await this.userRepository.findOne(userId)

        const address = this.addressRepository.create()
        address.fullname = addressDto.fullname
        address.address1 = addressDto.address1
        address.address2 = addressDto.address2
        address.city = addressDto.city
        address.postcode = addressDto.postcode
        address.user = user
        const result = await this.addressRepository.save(address)
        return result
    }

    async updateAddress(addressId: number, createAddressDto: CreateAddressDto): Promise<Address> {
        const address = await this.addressRepository.findOne(addressId)
        const newAddress = Object.assign(address, createAddressDto[0])

        return await this.addressRepository.save(newAddress)
    }

    async deleteAddress(addressId: number): Promise<boolean> {
        const result = await this.addressRepository.delete(addressId)

        return (result.affected > 0) ? true : false
    }
}
