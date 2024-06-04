import { Router } from "express"
import { AddVoter, allAreaDetails, searchAreaVill, searchCaste, searchSurname } from "../controllers/feedingStaff.controllers.js";


const feedingStaffRouter = Router()

feedingStaffRouter.route('/searchSurname').post(searchSurname);
feedingStaffRouter.route('/searchCaste').post(searchCaste);
feedingStaffRouter.route('/searchAreaVill').post(searchAreaVill);
feedingStaffRouter.route('/allAreaDetails').post(allAreaDetails);
feedingStaffRouter.route('/addVoter').post(AddVoter);



export default feedingStaffRouter;