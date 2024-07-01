import { Router } from "express"
import { AddVoter, allAreaDetails, searchAreaVill, searchCaste, searchSurname, getPerseemanDetails, ChakNoBlock  } from "../controllers/feedingStaff.controllers.js";

const feedingStaffRouter = Router()

feedingStaffRouter.post('/searchSurname', searchSurname);
feedingStaffRouter.post('/searchCaste', searchCaste);
feedingStaffRouter.post('/searchAreaVill', searchAreaVill);
feedingStaffRouter.post('/allAreaDetails', allAreaDetails);
feedingStaffRouter.post('/addVoter', AddVoter); 
feedingStaffRouter.post('/getPerseemanDetails', getPerseemanDetails); 

export default feedingStaffRouter;
