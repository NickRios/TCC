import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename,
        });

        return res.json(user);

    } catch(err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
