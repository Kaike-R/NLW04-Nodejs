
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { SurveysController } from "./SurveysController";
import  SendMailService  from "../services/SendMailService";
import {resolve} from "path";

class SendEmailController {
    
    async execute(request: Request,response: Response){
        const {email, survey_id} = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const npsPath = resolve(__dirname, "..","views","emails","npsMail.hbs");

        const userAlereadyExists = await usersRepository.findOne({email});

        if (!userAlereadyExists) {

            return response.status(400).json({
                error: "User does not Exists",
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({
            id : survey_id
        })

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error: "User does not Exists",
            });
        }
        

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlereadyExists.id,
            survey_id
        });

        

        const variable = {
            name: userAlereadyExists.name,
            title : surveyAlreadyExists.title,
            description : surveyAlreadyExists.description,
            user_id:userAlereadyExists.id,
            link: process.env.URL_MAIL
        }

        await surveysUsersRepository.save(surveyUser);

        

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id : userAlereadyExists.id},{value:null}],
            relations: ["user","survey"]
        })

        if (surveyUserAlreadyExists) {
            await SendMailService.execute(email,surveyAlreadyExists.title,variable,npsPath);
            return response.json(surveyUserAlreadyExists);
        }
        await SendMailService.execute(email, surveyAlreadyExists.title, variable ,npsPath);

        return response.json(surveyUser);

    }
}

export { SendEmailController }