import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { RoleController } from "./controllers/RoleController";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectController";
import { UserController } from "./controllers/UserController";
import { Authorize } from "./middlewares/Authorize";

const routes =  Router();

routes.post('/auth/login', new AuthController().login);

routes.route('/subject').post(Authorize.authorizeAdmin, new SubjectController().create);

routes.route('/room')
    .post(Authorize.authorizeAdmin, new RoomController().create)
    .get(Authorize.authorize, new RoomController().list);

routes.route('/room/:room_id/create').post( Authorize.authorizeAdmin, new RoomController().createVideo);
routes.route('/room/:room_id/addsubject').post( Authorize.authorizeAdmin, new RoomController().addSubject);

routes.route('/role').post( Authorize.authorizeAdmin, new RoleController().create);

routes.route('/user')
    .post( Authorize.authorizeAdmin, new UserController().create)
    .get( Authorize.authorizeAdmin, new UserController().getUsers);



export default routes;