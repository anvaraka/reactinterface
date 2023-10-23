import React from 'react'

const Navigation = () => {

    const navArr = ["About", "Contacts", "Home"]
    const navArrEmpty = navArr.length === 0
    if (navArrEmpty) return;
    return (<ul>
        {navArr.map((el) => (<li>{el}</li>))}
    </ul>)

}

export default Navigation
