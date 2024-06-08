import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { pool } from '../db/database.js';
import { uploadFiles } from "../middleware/multer.middleware.js";

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
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const results = await queryDatabase(`SELECT ESurname FROM caste WHERE ESurname LIKE ?`, [`%${query}%`]);
        return res.json(results);
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});

const searchCaste = asyncHandler(async (req, res) => {
    const { surname } = req.body;

    if (!surname) {
        return res.status(400).json({ error: 'Surname parameter is required' });
    }

    try {
        const results = await queryDatabase(`SELECT ECaste, Id as CasteId FROM caste WHERE ESurname LIKE ?`, [`%${surname}%`]);
        return res.json(results);
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});

const allAreaDetails = asyncHandler(async (req, res) => {
    const { AreaId } = req.body;

    if (!AreaId) {
        return res.status(400).json({ error: 'AreaId parameter is required' });
    }

    try {
        const results = await queryDatabase(`SELECT C.ECBPanch, C.Id AS ChkBlkId, C.WBId, W.EWardBlock, W.VSId, V.EVidhanSabha, V.counId, cc.ECouncil, cc.TehId, T.EName 
            FROM areavill AS A 
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
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const results = await queryDatabase(`SELECT EAreaVill, Id as AreaId FROM areavill WHERE EAreaVill LIKE ?`, [`%${query}%`]);
        return res.json(results);
    } catch (error) {
        console.error('Database query error', error);
        return res.status(500).send('A database error occurred.');
    }
});

const AddVoter = [
    asyncHandler(async (req, res, next) => {
        try {
            const maxRegNoResult = await queryDatabase(`SELECT MAX(RegNo) AS maxRegNo FROM voterlist`);
            const RegNo = maxRegNoResult && maxRegNoResult.length > 0 && maxRegNoResult[0].maxRegNo !== null ? maxRegNoResult[0].maxRegNo + 1 : 1001;
            req.regNo = RegNo;
            next();
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json(new ApiResponse(500, null, 'Database query error'));
        }
    }),
    uploadFiles,
    asyncHandler(async (req, res) => {
        try {
            if (!req.body.referenceDetails || !req.body.voterDetails || !req.body.addressDetail) {
                return res.status(400).json(new ApiResponse(400, null, 'Missing required fields in the request body'));
            }

            let referenceDetails, voterDetails, addressDetail;
            try {
                referenceDetails = JSON.parse(req.body.referenceDetails);
                voterDetails = JSON.parse(req.body.voterDetails);
                addressDetail = JSON.parse(req.body.addressDetail);
            } catch (e) {
                return res.status(400).json(new ApiResponse(400, null, 'Invalid JSON data in the request body'));
            }

            const voterDocs = {};

            if (req.files['Image']) {
                voterDocs.Image = req.files['Image'][0].filename;
            }
            if (req.files['IdProof']) {
                voterDocs.IdProof = req.files['IdProof'][0].filename; 
            }
            if (req.files['Degree']) {
                voterDocs.Degree = req.files['Degree'][0].filename; 
            }

            const query = `INSERT INTO voterlist (
                RegNo, PacketNo, IncRefId, EFName, HFName,
                ELName, HLName, RType, ERFName, HRFName, 
                ERLName, HRLName, CasteId, Qualification, Occupation, 
                Age, DOB, Sex, MNo, MNo2,
                AadharNo, VIdNo, GCYear, AreaId, TehId, 
                CounId, VSId, WBId, ChkBlkId, HNo,
                Landmark, Image, IdProof, Degree)
                VALUES (?, ?, ?, ?, ?, 
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?)`;

            const values = [
                req.regNo, referenceDetails.PacketNo, referenceDetails.IncRefId, voterDetails.EFName, voterDetails.HFName,
                voterDetails.ELName, voterDetails.HLName, voterDetails.RType, voterDetails.ERFName, voterDetails.HRFName, 
                voterDetails.ERLName, voterDetails.HRLName, voterDetails.CasteId, voterDetails.Qualification, voterDetails.Occupation, 
                voterDetails.Age, voterDetails.DOB, voterDetails.Sex, voterDetails.MNo, voterDetails.MNo2, 
                voterDetails.AadharNo, voterDetails.VIdNo, voterDetails.GCYear, addressDetail.AreaId, addressDetail.TehId, 
                addressDetail.CounId, addressDetail.VSId, addressDetail.WBId, addressDetail.ChkBlkId, addressDetail.HNo, 
                addressDetail.Landmark, voterDocs.Image, voterDocs.IdProof, voterDocs.Degree
            ];

            await queryDatabase(query, values);
            return res.status(201).json(new ApiResponse(201, null, "Voter added successfully"));
        } catch (error) {
            console.error('Database insert error:', error);
            return res.status(500).json(new ApiResponse(500, null, 'Database insert error'));
        }
    })
];

export { searchSurname, searchCaste, searchAreaVill, allAreaDetails, AddVoter };
