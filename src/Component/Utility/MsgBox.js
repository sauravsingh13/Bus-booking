import React from 'react';

export const MsgBox = (props) => (

    <div className=''>
        <div className={props.className}>
            <strong>{props.type}!</strong> { props.msg }.
        </div>
    </div>
)
