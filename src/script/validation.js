export function enebaleValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(`${validationConfig.formElement}`));

    formList.forEach( formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        })

        setInputEventListeners(formElement, Array.from(formElement.querySelectorAll(`${validationConfig.inputElement}`)), validationConfig);
    });
}

function setInputEventListeners(formElement, inputList, validationConfig) {
    const buttonElement = formElement.querySelector(`${validationConfig.submitButtonElement}`);

    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

function checkInputValidity(formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.popup__${inputElement.name}_error`);

    inputElement.classList.add(`${validationConfig.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${validationConfig.errorClass}`)
}

function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.popup__${inputElement.name}_error`);

    inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
    errorElement.classList.remove(`${validationConfig.errorClass}`);
    errorElement.textContent = '';
}

export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputElement}`));
    const buttonElement = formElement.querySelector(`${validationConfig.submitButtonElement}`);

    buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
    inputList.forEach( inputElement => {
        const errorElement = formElement.querySelector(`.popup__${inputElement.name}_error`);
        inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
        errorElement.textContent = '';
    })
}

function hasInvalidValidation(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState (inputList, buttonElement, validationConfig) {
    if (hasInvalidValidation(inputList)) {
        buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
    } else {
        buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
    }
}


































// function checkInputValidity(formElement, inputElement, validationConfig) {
//     if (!inputElement.validity.valid) {
//         showErrorMessage(formElement, inputElement, validationConfig, inputElement.validationMessage);
//     } else {
//         hideErrorMessage(formElement, inputElement, validationConfig);
//     }
// }

// function showErrorMessage(formElement, inputElement, validationConfig, errorMessage) {
//     const errorElement = formElement.querySelector(`.${inputElement.name}__error`);

//     inputElement.classList.add(`${validationConfig.inputErrorClass}`);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(`${validationConfig.errorClass}`);
// }

// function hideErrorMessage(formElement, inputElement, validationConfig) {
//     const errorElement = formElement.querySelector(`.${inputElement.name}__error`);

//     inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
//     errorElement.textContent = '';
//     errorElement.classList.remove(`${validationConfig.errorClass}`);
// }

// function hasInvalidInput(inputList) {
//     return inputList.some(inputElement => {
//         return !inputElement.validity.valid;
//     })
// }

// function toggleButtonState(inputElement, buttonElement, validationConfig) {
//     if (hasInvalidInput(inputElement)) {
//         buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
//     } else 
//     buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
// }

// function clearValidation(formElement, validationConfig) {
//     Array.from(formElement.querySelectorAll(`${validationConfig.inputElement}`)).forEach(inputElement => {
//         inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
//     })
//     Array.from(formElement.querySelectorAll(`${validationConfig.popupErrorElement}`)).forEach(errorElement => {
//         errorElement.classList.remove(`${validationConfig.errorClass}`);
//     })
//     formElement.querySelector(`${validationConfig.submitButtonElement}`).classList.add(`${validationConfig.inactiveButtonClass}`);
// }

// function setEvetenListeners(formElement, validationConfig) {
//     const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputElement}`));
//     const buttonElement = formElement.querySelector(`${validationConfig.submitButtonElement}`);

//     clearValidation(formElement, validationConfig);
//     inputList.forEach(inputElement => {
//         inputElement.addEventListener('input', () => {
//             checkInputValidity(formElement, inputElement,validationConfig);
//             toggleButtonState(inputList, buttonElement);
//         })
//     })
// }

// export function enebaleValidation(validationConfig) {
//     const formList = Array.from(document.querySelectorAll(`${validationConfig.formElement}`));

//     formList.forEach(formElement => {
//         setEvetenListeners(formElement, validationConfig);
//         formElement.addEventListener('submit', (formElement) => {
//             formElement.preventDefault();
//         })
//     })
// }
