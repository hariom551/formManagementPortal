import { Router } from "express"
import { searchCaste, searchSurname } from "../controllers/feedingStaff.controllers.js";


const feedingStaffRouter = Router()

feedingStaffRouter.route('/searchSurname').post(searchSurname);
feedingStaffRouter.route('/searchCaste').post(searchCaste);



export default feedingStaffRouter;