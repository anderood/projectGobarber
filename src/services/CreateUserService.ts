import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User>{
        const usersRepository = getRepository(User);

        const ckeckUserExists = await usersRepository.findOne({
            where: { email },
        });

        if(ckeckUserExists){
            throw new Error('Email Address already used.')
        }

        const user = usersRepository.create({ name, email, password});

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;