import { request, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middiewares/ensureAuthenticated';

const usersRouter = Router();
const  upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {

        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        delete user.password;

        return response.json(user);
    } catch (error: any) {
        return response.status(400).json({error: error.message});
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response)=> {

    try {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);

    } catch (error: any) {
        return response.status(400).json({error: error.message});
    }
});

export default usersRouter;