export const ValidationPage = (data) => {
    const errors = {}
    if(data.EFName==""){
        errors.EFName="Name is required"
    }
   else if (data.EFName.length<"3") {
        errors.EFName='Name must be greater than 3 words'
    }
    if (/^\d*$/.test(data.AadharNo)) {
        errors.AadharNo=""
    } else {
        errors.AadharNo='Please enter a valid Aadhaar number (digits only).'
    }
    return errors
}