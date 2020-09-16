import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {

    async loggin(email, password): Promise<string>{
        return  `Loggued with Email: ${email} and Password: ${password}`;
    }

    async register(): Promise<string>{
        return "Registered"
    }

    async forgotPassword(): Promise<string>{
        return "Forgot Password"
    }
}
