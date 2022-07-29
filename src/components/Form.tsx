import React, {useState} from 'react';
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

    const [responseMessage, setResponseMessage] = useState<string>('')
    const [requestStatus, setRequestStatus] = useState<boolean>(false)

    const sendFormData = async () => {
        setRequestStatus(true)
        let formData = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            formDate: formDate.value,
            message: message.value,
        };

        try {

            let response = await fetch('https://test-valid-form-back.herokuapp.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });

            let result = await response.json();

            setResponseMessage(result.message)

            name.setValue('')
            email.setValue('')
            phone.setValue('')
            formDate.setValue('')
            message.setValue('')
            name.setDirty(false)
            email.setDirty(false)
            phone.setDirty(false)
            formDate.setDirty(false)
            message.setDirty(false)
        } catch (err: any) {
            setResponseMessage(err.message)
        } finally {
            setRequestStatus(false)
        }

    }

    return (
        <div className={style.form_container}>
            <form>
                <input type="text"
                       name='name'
                       value={name.value}
                       onChange={e => name.onChange(e)}
                       onBlur={name.onBlur}
                       onKeyPress={e => name.onKeyPressForName(e)}
                       placeholder='Enter your name and surname here'/>
                {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>Required field</div>}
                {(name.isDirty && name.minLengthForNameErr) && <div style={{color: 'red'}}>Field must be 2 words, the minimum length of each word is 3 characters</div>}
                {(name.isDirty && name.maxLengthForNameErr) && <div style={{color: 'red'}}>Field must be 2 words, the maximum length of each word is 30 characters</div>}

                <input type="email"
                       name='email'
                       value={email.value}
                       onChange={e => email.onChange(e)}
                       onBlur={email.onBlur}
                       placeholder='Email'/>
                {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Required field</div>}
                {(email.isDirty && email.emailErr) && <div style={{color: 'red'}}>The field is not valid for the email</div>}

                <input type="tel"
                       name='phone'
                       onInput={e => phone.onInputForPhone(e)}
                       value={phone.value}
                       onChange={e => phone.onChange(e)}
                       onBlur={phone.onBlur}
                       onFocus={phone.onFocusForPhone}
                       placeholder='Phone number'/>
                {(phone.isDirty && phone.isEmptyPhoneErr) && <div style={{color: 'red'}}>Required field</div>}

                <input type="text"
                       name='date'
                       value={formDate.value}
                       onChange={e => formDate.onChange(e)}
                       onBlur={formDate.onBlurForDate}
                       onFocus={(e) => (e.target.type = "date")}
                       placeholder='Date of Birth'/>
                {(formDate.isDirty && formDate.isEmptyForDateErr) &&
                <div style={{color: 'red'}}>The field is filled incorrectly</div>}

                <div>
                <textarea
                    name='message'
                    value={message.value}
                    onChange={e => message.onChange(e)}
                    onBlur={message.onBlur}
                    placeholder='Your message...'/>
                </div>
                {(message.isDirty && message.isEmpty) && <div style={{color: 'red'}}>Required field</div>}
                {(message.isDirty && message.minLengthErr) && <div style={{color: 'red'}}>The minimum length of each word is 10 characters</div>}
                {(message.isDirty && message.maxLengthErr) && <div style={{color: 'red'}}>The maximum length of each word is 300 characters</div>}
            </form>
            <button
                onClick={sendFormData}
                disabled={!email.inputValid
                || !name.inputValid
                || !phone.inputValid
                || !formDate.inputValid
                || !message.inputValid
                || requestStatus
                }>
                SEND
            </button>
            <div>{responseMessage}</div>
        </div>
    );
}

