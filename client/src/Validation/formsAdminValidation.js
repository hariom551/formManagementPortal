// referenceDetailsValidation.js
export const validateFormsAdmin = (field, value) => {
    let error = '';
    switch (field) {
        case 'PacketNo':
        case 'VHName':
        case 'VEAddress':
        case 'VHAddress':
        case 'NoOfForms':

            if (!value) {
                return 'This is required';
            }
            break;

        case 'VMob1':
        case 'CMob1':
            if (!value) {
                return 'This is required';
            }
            if (value && !/^[0-9]+$/.test(value)) {
                error = 'Mobile number must be digits';
            } 
            else if (value && value.length != 10) {
                error = 'Mobile number must be 10 digits';
            }

            break;
        case 'VEName':
        case 'CEName':
        case 'CHName':

            if (!value) {
                error = 'Name is required';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Only alphabets are allowed';
            }
            break;

           

        default:
            return null;
    }
    return error;
};
