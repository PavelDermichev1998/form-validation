import React from 'react';
import style from './Form.module.scss'
import {useInput} from "./hooks/useInput";


export const Form = () => {

    const name = useInput('', {
        isUpperCase: true,
        isEmpty: true,
        minLengthForName: 3,
        maxLengthForName: 30,
        isKir: true,
    })

    const email = useInput('', {
        isUpperCase: false,
        isEmpty: true,
        isEmail: true,
    })

    const phone = useInput('', {
        isUpperCase: false,
        isEmptyPhone: true,
    })

    const formDate = useInput('', {
        isUpperCase: false,
        isEmptyForDate: true,
    })

    const message = useInput('', {
        isUpperCase: false,
        isEmpty: true,
        minLength: 10,
        maxLength: 300,
    })

    return (
        <form action="" className={style.form_container}>
            <input type="text"
                   name='name'
                   value={name.value}
                   onChange={e => name.onChange(e)}
                   onBlur={name.onBlur}
                   onKeyPress={e => name.onKeyPressForName(e)}
                   placeholder='Enter your name and surname here'/>
            {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
            {(name.isDirty && name.minLengthForNameErr) && <div style={{color: 'red'}}>min 3</div>}
            {(name.isDirty && name.maxLengthForNameErr) && <div style={{color: 'red'}}>max 30</div>}

            <input type="email"
                   name='email'
                   value={email.value}
                   onChange={e => email.onChange(e)}
                   onBlur={email.onBlur}
                   placeholder='Email'/>
            {(email.isDirty && email.emailErr) && <div style={{color: 'red'}}>Поле не валидно</div>}
            {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}

            <input type="tel"
                   name='phone'
                   onInput={e => phone.onInputForPhone(e)}
                   value={phone.value}
                   onChange={e => phone.onChange(e)}
                   onBlur={phone.onBlur}
                   onFocus={phone.onFocusForPhone}
                   placeholder='Номер телефона'/>
            {(phone.isDirty && phone.isEmptyPhoneErr) && <div style={{color: 'red'}}>Обязательно для заполнения</div>}

            <input type="date"
                   name='date'
                   value={formDate.value}
                   onChange={e => formDate.onChange(e)}
                   onBlur={formDate.onBlur}
                   placeholder='Дата рождения'/>
            {(formDate.isDirty && formDate.isEmptyForDateErr) && <div style={{color: 'red'}}>Поле не заполнено полностью</div>}

            <div>
                <textarea
                    name='message'
                    value={message.value}
                    onChange={e => message.onChange(e)}
                    onBlur={message.onBlur}
                    placeholder='Сообщение...'/>
            </div>
            {(message.isDirty && message.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
            {(message.isDirty && message.minLengthErr) && <div style={{color: 'red'}}>min 10</div>}
            {(message.isDirty && message.maxLengthErr) && <div style={{color: 'red'}}>max 300</div>}

            <button disabled={!email.inputValid || !name.inputValid }>Отправить</button>
        </form>
    );
}

