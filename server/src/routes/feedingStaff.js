import { Router } from "express"
import { AddVoter, allAreaDetails, searchAreaVill, searchCaste, searchSurname } from "../controllers/feedingStaff.controllers.js";

const feedingStaffRouter = Router()

feedingStaffRouter.post('/searchSurname', searchSurname);
feedingStaffRouter.post('/searchCaste', searchCaste);
feedingStaffRouter.post('/searchAreaVill', searchAreaVill);
feedingStaffRouter.post('/allAreaDetails', allAreaDetails);
feedingStaffRouter.post('/addVoter', AddVoter); // Multer middleware added here

export default feedingStaffRouter;
