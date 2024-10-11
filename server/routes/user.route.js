import {Router} from 'express'
import {register, login, getAllUsers, editUserDetail, deleteUser, getSingleUser, logout} from '../controllers/user.controller.js';

const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.get('/all-users', getAllUsers);
router.put('/edit-users/:userId', editUserDetail);
router.delete('/delete-users/:userId', deleteUser);
router.get('/get-single-user/:userId', getSingleUser);
router.get('/logout', logout);

export default router;