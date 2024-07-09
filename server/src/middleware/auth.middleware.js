import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {pool} from '../db/database.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


        const user = await getUserFromDatabase(decodedToken.userid);

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
        // return res.status(200).json(new ApiResponse(200, user, "auth verify kr rha"));

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

function queryDatabase(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);   
            }
        });
    });
}


const getUserFromDatabase = async (userId) => {
    const user = await queryDatabase('SELECT * FROM usersadminformsdata WHERE userid = ?', [userId]);
    // console.log(user);
    return user; 
};
