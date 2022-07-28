import {useEffect, useState} from "react";

export const useValidation = (value: string, validations: any) => {

    const [isEmpty, setEmpty] = useState<boolean>(false)
    const [isEmptyPhoneErr, setIsEmptyPhoneErr] = useState<boolean>(false)
    const [isEmptyForDateErr, setIsEmptyForDateErr] = useState<boolean>(false)

    const [minLengthErr, setMinLengthErr] = useState<boolean>(false)
    const [maxLengthErr, setMaxLengthErr] = useState<boolean>(false)
    const [minLengthForNameErr, setMinLengthForNameErr] = useState<boolean>(false)
    const [maxLengthForNameErr, setMaxLengthForNameErr] = useState<boolean>(false)

    const [emailErr, setEmailErr] = useState<boolean>(false)

    const [inputValid, setInputValid] = useState<boolean>(false)

    useEffect(() => {
        for (const valid in validations) {
            switch (valid) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'isEmptyPhone':
                    value.length !== 18 ? setIsEmptyPhoneErr(true) : setIsEmptyPhoneErr(false)
                    break
                case 'isEmptyForDate':
                    value.length !== 10 ? setIsEmptyForDateErr(true) : setIsEmptyForDateErr(false)
                    break
                case 'minLengthForName':
                    if (value) {
                        const nameArr = value.split(' ')
                        let firstname = nameArr[0]
                        let surname = nameArr[1]

                        if (!surname) {
                            setMinLengthForNameErr(true)
                        }

                        if (firstname && surname) {
                            firstname.length < validations[valid] || surname.length < validations[valid]
                                ? setMinLengthForNameErr(true)
                                : setMinLengthForNameErr(false)
                        }
                    }
                    break
                case 'maxLengthForName':
                    if (value) {
                        const nameArr = value.split(' ')
                        let firstname = nameArr[0]
                        let surname = nameArr[1]

                        if (!surname) {
                            setMinLengthForNameErr(true)
                        }

                        if (firstname && surname) {
                            firstname.length > validations[valid] || surname.length > validations[valid]
                                ? setMaxLengthForNameErr(true)
                                : setMaxLengthForNameErr(false)
                        }
                    }
                    break
                case 'minLength':
                    value.length < validations[valid] ? setMinLengthErr(true) : setMinLengthErr(false)
                    break
                case 'maxLength':
                    value.length > validations[valid] ? setMaxLengthErr(true) : setMaxLengthErr(false)
                    break
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailErr(false) : setEmailErr(true)
                    break
            }
        }
    }, [value])

    useEffect(() => {
        if (!isEmpty
            && !isEmptyPhoneErr
            && !isEmptyForDateErr
            && !minLengthForNameErr
            && !maxLengthForNameErr
            && !minLengthErr
            && !maxLengthErr
            && !emailErr
           ) {
            setInputValid(true)
        } else {
            setInputValid(false)
        }
    }, [isEmpty, maxLengthErr, minLengthErr, emailErr, minLengthForNameErr, maxLengthForNameErr, isEmptyPhoneErr, isEmptyForDateErr])

    return {
        isEmpty,
        minLengthErr,
        maxLengthErr,
        emailErr,
        isEmptyPhoneErr,
        isEmptyForDateErr,
        inputValid,
        minLengthForNameErr,
        maxLengthForNameErr
    }
}