import { useState } from 'react';

const useVoterDetailsValidation = (voterDetails) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!voterDetails.EFName) {
            newErrors.EFName = 'Please provide a first name.';
        }
        if (!voterDetails.RType) {
            newErrors.RType = 'Please select a relation.';
        }
        if (!voterDetails.ERFName) {
            newErrors.ERFName = 'Please provide a relative\'s first name.';
        }
        if (!voterDetails.CasteId) {
            newErrors.CasteId = 'Please select a caste.';
        }
        if (!voterDetails.Qualification) {
            newErrors.Qualification = 'Please select a qualification.';
        }
        if (!voterDetails.Occupation) {
            newErrors.Occupation = 'Please select an occupation.';
        }
        if (!voterDetails.Age || isNaN(voterDetails.Age) || voterDetails.Age <= 0) {
            newErrors.Age = 'Please provide a valid age.';
        }
        if (!voterDetails.DOB) {
            newErrors.DOB = 'Please provide a date of birth.';
        }
        if (!voterDetails.Sex) {
            newErrors.Sex = 'Please select a gender.';
        }
        if (!voterDetails.MNo || !/^\d{10}$/.test(voterDetails.MNo)) {
            newErrors.MNo = 'Please provide a valid mobile number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validate };
};

export default useVoterDetailsValidation;
