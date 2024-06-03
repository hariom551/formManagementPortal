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







export {searchSurname, searchCaste, searchAreaVill, allAreaDetails}