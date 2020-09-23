import { User } from './../entity/User';
export class CreateAddressDto {
    fullname: string
    address1?: string
    address2?: string
    postcode: string
    city: string
    phone: string

}