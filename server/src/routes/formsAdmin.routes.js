import { Router } from "express"
import { AddIncomForm, SearchVMobNo, incomFormDetails } from "../controllers/formsAdmin.controllers.js"



const formsAdminRouter = Router()


formsAdminRouter.route("/addIncomForm").post(AddIncomForm)
formsAdminRouter.route("/incomFormDetails").get(incomFormDetails)
formsAdminRouter.route("/searchVMobNo").post(SearchVMobNo)



export default formsAdminRouter;