// src/validation/voterDetailsValidation.js

export const validateVoterDetails = (name, value) => {
    let error = '';

    switch (name) {
        case 'EFName':
        case 'ERFName':
        case 'ERLName':
        case 'ELName':
            if (!value) {
                error = 'This field is required';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Only alphabets are allowed';
            }
            break;
        case 'MNo':
        case 'MNo2':
        case 'VMob1':
            if (value && !/^[0-9]+$/.test(value)) {
                error = 'Mobile number must be digits';
            } else if (value && value.length != 10) {
                error = 'Mobile number must be 10 digits';
            }
            break;

        case 'AadharNo':
            if (value && !/^[0-9]+$/.test(value)) {
                error = 'Aadhar number must be digits';
            }
            else if (value && !/^\d{12}$/.test(value)) {
                error = 'Aadhar number must be 12 digits';
            }
            break;
        case 'RType':
        case 'Qualification':
        case 'Occupation':
        case 'Sex':
        case 'GCYear':
        case 'PacketNo':
            if (!value) {
                error = 'This field is required';
            }
            break;
        default:
            break;
    }

    return error;
};
