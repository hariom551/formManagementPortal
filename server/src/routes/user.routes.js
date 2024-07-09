import { Router } from "express"
import { loginUser, hariom, submitDetails, changePassword,checkRole, AddDistrict, GetDistrictDetails, UpdateDistrictDetail, DeleteDistrictDetail } from "../controllers/user.controlers.js"

import { verifyJWT } from "../middleware/auth.middleware.js"
const router = Router()



router.route("/login").post(loginUser)
router.route("/submitdetails").post(submitDetails)
router.route("/hariom").post(  hariom)
router.route("/changePassword").post(changePassword)
router.route("/addDistrict").post(AddDistrict)
router.route("/getDistrictDetails").get(GetDistrictDetails)
router.route("/updateDistrictDetail").post(UpdateDistrictDetail)
router.route("/deleteDistrictDetail").post(DeleteDistrictDetail)
// router.route("/verifyUser").get( verifyJWT)

export default router