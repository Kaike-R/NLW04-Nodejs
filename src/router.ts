import { Router } from "express";
import { HelloController } from "./controllers/HelloController";
import { SurveysController } from "./controllers/SurveysController";
import {UserController} from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const helloController = new HelloController();
const surveysController = new SurveysController();

router.get("/hello",helloController.create);
router.get("/teste",helloController.teste);
router.post("/post",helloController.post);
router.post("/users",userController.create);
router.post("/surveys", surveysController.create);


export{router};