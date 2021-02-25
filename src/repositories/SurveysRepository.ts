import { EntityRepository, Repository } from "typeorm";
import { Surveys } from "../models/Surveys";
//import { Repository } from "typeorm";

@EntityRepository(Surveys)
class SurveysRepository extends Repository<Surveys> {

}

export { SurveysRepository }