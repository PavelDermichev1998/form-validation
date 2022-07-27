import React, {useEffect, useState} from 'react';
import style from './Form.module.scss'


const useValidation = (value: any, validations: any) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthErr, setMinLengthErr] = useState(false)
    const [maxLengthErr, setMaxLengthErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const valid in validations) {
            switch (valid) {
                case 'minLength':
                    value.length < validations[valid] ? setMinLengthErr(true) : setMinLengthErr(false)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
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
        if (isEmpty || maxLengthErr || minLengthErr || emailErr) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthErr, minLengthErr, emailErr])

    return {
        isEmpty,
        minLengthErr,
        maxLengthErr,
        emailErr,
        inputValid
    }
}

const useInput = (initialValue: any, validations: any) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)


    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const onBlur = (e: any) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const Form = () => {

    const name = useInput('', {isEmpty: true, minLength: 3, maxLength: 8})
    const email = useInput('', {isEmpty: true, minLength: 7, isEmail: true})

    return (
        <form action="" className={style.form_container}>
            <input type="text"
                   name='name'
                   value={name.value}
                   onChange={e => name.onChange(e)}
                   onBlur={e => name.onBlur(e)}
                   placeholder='Имя Фамилия'/>
            {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
            {(name.isDirty && name.minLengthErr) && <div style={{color: 'red'}}>Некорректная длина 3</div>}
            {(name.isDirty && name.maxLengthErr) && <div style={{color: 'red'}}>Некорректная длина 8</div>}
            <input type="email"
                   name='email'
                   value={email.value}
                   onChange={e => email.onChange(e)}
                   onBlur={e => email.onBlur(e)}
                   placeholder='Email'/>
            {(email.isDirty && email.emailErr) && <div style={{color: 'red'}}>Поле не валидно</div>}
            {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
            {(email.isDirty && email.minLengthErr) && <div style={{color: 'red'}}>Некорректная длина</div>}
            <input type="tel"
                   name='telNumber'
                   placeholder='Номер телефона'/>
            <input type="date"
                   name='date'
                   placeholder='Дата рождения'/>
            <div>
                <textarea
                    name='message'
                    placeholder='Сообщение'/>
            </div>
            <button disabled={!email.inputValid || !name.inputValid}>Отправить</button>
        </form>
    );
}
