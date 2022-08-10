import { useEffect } from "react"

import jwt_decode from 'jwt-decode'
import { useState } from "react"
import programmerIcon from '../../assets/programmer.png'

import originalLogo from '../../assets/original.png'
import greenLogo from '../../assets/verde.png'
import pinkLogo from '../../assets/rosa.png'
import blueLogo from '../../assets/azul.png'

const logosUrls = {
    "/": originalLogo,
    "/calendar": greenLogo,
    "/food": greenLogo,
    "/clock": blueLogo,
    "/profile": pinkLogo,
    "/trend": pinkLogo,  
}

const ProfileName = ({name, color}) => {
    const pathName = window.location.pathname

    if(pathName === '/food') return <div className="text-lg text-white">Com fome, <b className={`text-${color}`}>{name}</b>?</div>

    return  <div className="text-lg text-white">Olá, <b className={`text-${color}`}>{name}</b>!</div>
}

const Header = ({color = 'gmct-green'}) => {
    const [name, setName] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        setName(decoded.name)
    }, [])
    return <div className="flex justify-between">
    <div className="flex gap-3 items-center">
        <img className={`rounded-full h-16 w-13 border-4 border-${color}`} src={programmerIcon}/>
        <ProfileName name={name} color={color} />
    </div>
    <img className="h-24" src={logosUrls[window.location.pathname]} />
    </div>
}

export default Header