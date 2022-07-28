import React, {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue: string, validations: any) => {

    const [value, setValue] = useState<string>(initialValue)
    const [isDirty, setDirty] = useState<boolean>(false)
    const valid = useValidation(value, validations)

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (validations.isUpperCase) {
            setValue(e.target.value.toUpperCase())
        } else {
            setValue(e.target.value)
        }
    }

    const onBlur = () => {
        setDirty(true)
    }

    const onFocusForPhone = () => {
        if (value) {
            setValue(value)
        } else {
            setValue('+7')
        }
    }

    const onKeyPressForName = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (value.includes(' ') && e.charCode === 32) {
            e.preventDefault()
        }

        if (!(e.charCode >= 97 && e.charCode <= 122) && !(e.charCode >= 65 && e.charCode <= 90) && e.charCode !== 32) {
            e.preventDefault()
        }
    }

    const onInputForPhone = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        let inputNumbersValue = input.value.replace(/\D/g, '')
        let formattedInputValue = '+7 '
        const selectionStart = input.selectionStart

        if (!inputNumbersValue) {
            return (input.value = '')
        }

        if (input.value.length !== selectionStart) {
            return
        }

        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }

        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }

        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }

        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }

        input.value = formattedInputValue
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        onKeyPressForName,
        onInputForPhone,
        onFocusForPhone,
        ...valid
    }
}