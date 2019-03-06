import React from 'react'
import './AdminNavigation.css'

const adminNavigation = (props) => (
    <input type='button' onClick={props.clicked} className="AdminNavigationButton" value={props.children}  />
)

export default adminNavigation;