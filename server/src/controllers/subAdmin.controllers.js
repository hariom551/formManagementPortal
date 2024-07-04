import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {pool} from '../db/database.js';
import path from 'path';

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



const voterList = asyncHandler(async (req, res) => {
    const { WBId } = req.body;

    if (!WBId) {
        return res.status(400).json({ error: 'WBId parameter is required' });
    }

    try {
        const results = await queryDatabase(
            `SELECT RegNo, PacketNo, EFName, HFName, ELName, HLName, RType, ERFName, HRFName, 
            ERLName, HRLName, CasteId, caste.ECaste, Qualification, Occupation, Age, 
            DATE_FORMAT(DOB, '%d/%m/%Y') as DOB, Sex, MNo, MNo2, AadharNo, VIdNo, GCYear, 
            AreaId, TehId, CounId, VSId, WBId, ChkBlkId, HNo, Landmark, Image, IdProof, Degree 
            FROM voterlist 
            LEFT JOIN caste ON CasteId = caste.ID 
            WHERE WBId = ?`, 
            [WBId]
        );

        // const publicFolderPath = 'C:\\Hariom Nathani\\Swapnil goverment project\\Swapnil-Project-main\\server\\public';

    
        // const constructFileUrl = (fileName, folder) => {
        //     return fileName ? path.join(publicFolderPath, folder, fileName) : null;
        // };

        // const formattedResults = results.map(voter => ({
        //     ...voter,
        //     ImageUrl: constructFileUrl(voter.Image, 'photo'),
        //     DegreeUrl: constructFileUrl(voter.Degree, 'Degree'),
        //     IdProofUrl: constructFileUrl(voter.IdProof, 'IdProof')
        // }));

        return res.json(results);
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).json({ error: 'A database error occurred.' });
    }
});


export {voterList}