import { Router } from "express"
import { DeleteVoter, sendSMS, wardwiseVoterContact } from "../controllers/qualityStaff.controller.js";


const QualityStaffRouter = Router()

QualityStaffRouter.route("/wardwiseVoterContact").post(wardwiseVoterContact)
QualityStaffRouter.route("/sendSMS").post(sendSMS)
QualityStaffRouter.route("/DeleteVoter").post(DeleteVoter)

export default QualityStaffRouter;