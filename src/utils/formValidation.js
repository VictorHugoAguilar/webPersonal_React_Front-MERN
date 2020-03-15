export function minLenghtValidation(inputData, minLength) {
    const { value } = inputData;
    removeClassErrorSuccess(inputData);

    if (value.length >= minLength) {
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add('error');
        return false;
    }
}

export function emailValidation(inputData) {
    // eslint-disable-next-line
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const { value } = inputData;
    removeClassErrorSuccess(inputData);
    const resultValidation = emailValid.test(value);
    if (resultValidation) {
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add('error');
        return false;
    }
}

function removeClassErrorSuccess(inputData) {
    inputData.classList.remove('success');
    inputData.classList.remove('error');
}


export function emailValidate(inputData) {
    // eslint-disable-next-line
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const resultValidation = emailValid.test(inputData);
    if (resultValidation) {
        return true;
    } else {
        return false;
    }
}