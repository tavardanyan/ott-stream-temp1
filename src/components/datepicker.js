import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DatePickerComponent(props) {
    const { cb, date } = props
    const [selectedDate, setSelectedDate] = useState(date);

    const change = (date) => {
        setSelectedDate(date)
        cb(date)
    }

    return (
        <DatePicker 
            className='G-date'
            selected={selectedDate} 
            onChange={date => change(date)} />
    );
}