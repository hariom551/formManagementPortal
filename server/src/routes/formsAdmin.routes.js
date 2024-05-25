import { Router } from "express"
import { AddOutForm,
     AddIncomForm, incomFormDetails, SearchVMobNo, 
     OutFormDetails} from "../controllers/formsAdmin.controllers.js"



const formsAdminRouter = Router()


formsAdminRouter.route("/addOutForm").post(AddOutForm)
formsAdminRouter.route("/outFormDetails").get(OutFormDetails)
formsAdminRouter.route("/addIncomForm").post(AddIncomForm)
formsAdminRouter.route("/incomFormDetails").get(incomFormDetails)
formsAdminRouter.route("/searchVMobNo").post(SearchVMobNo)



export default formsAdminRouter;