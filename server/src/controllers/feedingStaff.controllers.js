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




export {searchSurname, searchCaste}