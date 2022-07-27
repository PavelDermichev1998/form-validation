import React from 'react';
import style from './App.module.scss';
import {Form} from "./components/Form";

export const App = () => {
    return (
        <div className={style.app}>
            <Form/>
        </div>
    );
}

