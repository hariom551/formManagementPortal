import jwt from 'jsonwebtoken';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {pool} from '../db/database.js';


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


const searchSurname = asyncHandler(async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required', query });
    }

    try {
        const results = await queryDatabase(`SELECT ESurname FROM caste Where ESurname LIKE ?`, [`%${query}%`]);
        return res.json(results); // Should correctly return the results array
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});

const searchCaste = asyncHandler(async (req, res) => {
    const { surname } = req.body;

    if (!surname) {
        return res.status(400).json({ error: 'surname parameter is required', query });
    }

    try {
        const results = await queryDatabase(`SELECT ECaste, Id as CasteId FROM caste Where ESurname LIKE ?`, [`%${surname}%`]);
        return res.json(results); // Should correctly return the results array
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});


const allAreaDetails = asyncHandler(async (req, res) => {
    const { AreaId } = req.body;

    if (!AreaId) {
        return res.status(400).json({ error: 'areavill parameter is required', AreaId });
    }

    try {
        const results = await queryDatabase(`SELECT C.ECBPanch, C.Id AS ChkBlkId, C.WBId, W.EWardBlock, W.VSId, V.EVidhanSabha, V.counId, cc.ECouncil, cc.TehId, T.EName FROM areavill AS A 
        LEFT JOIN chakblockpanch as C ON A.CBPId = C.Id 
        LEFT JOIN wardblock AS W ON C.WBId= W.Id
        LEFT JOIN vidhansabha AS V ON V.ID = W.VSId
        LEFT JOIN council AS cc ON cc.Id = V.counId
        LEFT JOIN tehsillist AS T ON T.ID = cc.TehId
        WHERE A.Id= ?`, [AreaId]);
        return res.json(results); 
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});


const searchAreaVill = asyncHandler(async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'areavill parameter is required', query });
    }

    try {
        const results = await queryDatabase(`SELECT EAreaVill, Id as AreaId FROM areavill Where EAreaVill LIKE ?`, [`%${query}%`]);
        return res.json(results); // Should correctly return the results array
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});


const AddVoter = asyncHandler(async (req, res) => {
    try {
        // Parsing the JSON data from the request body
        console.log(req.body);
        if (!req.body.referenceDetails || !req.body.voterDetails || !req.body.addressDetail) {
            throw new Error('Missing required fields in the request body');
        }

        const referenceDetails = JSON.parse(req.body.referenceDetails);
        const voterDetails = JSON.parse(req.body.voterDetails);
        const addressDetail = JSON.parse(req.body.addressDetail);

        // Validate the parsed data
        if (!referenceDetails || !voterDetails || !addressDetail) {
            throw new Error('Invalid JSON data in the request body');
        }

        // Processing the uploaded files
        const voterDocs = {};
        if (req.files['Image']) {
            voterDocs.Image = req.files['Image'][0];
        }
        if (req.files['IDProof']) {
            voterDocs.IDProof = req.files['IDProof'][0];
        }
        if (req.files['Degree']) {
            voterDocs.Degree = req.files['Degree'][0];
        }
        if (req.files['VImage']) {
            voterDocs.VImage = req.files['VImage'][0];
        }

        const query = `
            INSERT INTO VoterList (
                PacketNo, IncRefId,
                EFName, HFName, ELName, HLName, RType, ERFName, HRFName, ERLName, HRLName, 
                CasteId, ECaste, Qualification, Occupation, Age, DOB, Sex, MNo, MNo2, 
                AadharNo, VIdNo, GCYear, AreaId, EAreaVill, TehId, EName, CounId, 
                ECouncil, VSId, EVidhanSabha, WBId, EWardBlock, ChkBlkId, ECBPanch, HNo, 
                Landmark, Image, IDProof, Degree, VImage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            referenceDetails.PacketNo, referenceDetails.IncRefId, 
            voterDetails.EFName, voterDetails.HFName, voterDetails.ELName, voterDetails.HLName, voterDetails.RType, 
            voterDetails.ERFName, voterDetails.HRFName, voterDetails.ERLName, voterDetails.HRLName, voterDetails.CasteId, 
            voterDetails.ECaste, voterDetails.Qualification, voterDetails.Occupation, voterDetails.Age, voterDetails.DOB, 
            voterDetails.Sex, voterDetails.MNo, voterDetails.MNo2, voterDetails.AadharNo, voterDetails.VIdNo, 
            voterDetails.GCYear, addressDetail.AreaId, addressDetail.EAreaVill, addressDetail.TehId, addressDetail.EName, 
            addressDetail.CounId, addressDetail.ECouncil, addressDetail.VSId, addressDetail.EVidhanSabha, addressDetail.WBId, 
            addressDetail.EWardBlock, addressDetail.ChkBlkId, addressDetail.ECBPanch, addressDetail.HNo, addressDetail.Landmark, 
            voterDocs.Image ? voterDocs.Image.buffer : null, voterDocs.IDProof ? voterDocs.IDProof.buffer : null, 
            voterDocs.Degree ? voterDocs.Degree.buffer : null, voterDocs.VImage ? voterDocs.VImage.buffer : null
        ];

        await queryDatabase(query, values);

        return res.status(201).json(
            new ApiResponse(201, null, "Voter added successfully")
        );
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message || "Internal Server Error"));
    }
});

 




export {searchSurname, searchCaste, searchAreaVill, allAreaDetails, AddVoter}