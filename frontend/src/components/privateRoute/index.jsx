import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

import clockLogo from '../../assets/clock.svg'
import foodLogo from '../../assets/food.svg'
import calendarLogo from '../../assets/calendar.svg'
import HomeLogo from '../../assets/home.svg'
import profileLogo from '../../assets/profile.svg'
import leaveLogo from '../../assets/leave.svg'
import trendLogo from '../../assets/trend.svg'
import { Link } from 'react-router-dom'
import Header from "../header"

const SelectedItem = () => {
    return <div style={{ width: '90px', height: '50px', top: '-5px', borderRadius: '0 10px 10px 0' }} className="z-0 bg-gmct-sideMenuSelected absolute top-0 left-0"></div>
}

const colors = {
    "/": 'gmct-green',
    "/calendar": 'gmct-green',
    "/food": 'gmct-green',
    "/clock": 'gmct-lightBlue',
    "/profile": 'gmct-pink',
    "/trend": 'gmct-pink',  
}

const PrivateRoute = ({ children }) => {
    const { checkAuthentication } = useAuth()

    useEffect(() => {
        checkAuthentication()
    }, [])

    const leave = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return(
    <div style={{ gridTemplateColumns: '80px 1fr' }} className="grid w-full h-full">
        <div className="w-full h-full bg-gmct-blue flex flex-col justify-between items-center py-5">
            <div className="flex flex-col gap-5 w-full justify-center">
                <Link to='/' className="relative h-12 w-full flex justify-center" >
                    <img src={HomeLogo} className="absolute z-10" />
                    {window.location.pathname === '/' && <SelectedItem />}
                </Link>
                <Link to='/calendar' className="relative h-12 w-full flex justify-center">
                    <img src={calendarLogo} className="absolute z-10" />
                    {window.location.pathname === '/calendar' && <SelectedItem />}
                </Link>
                <Link to='/food' className="relative h-12 w-full flex justify-center">
                    <img src={foodLogo} className="absolute z-10" />
                    {window.location.pathname === '/food' && <SelectedItem />}
                </Link>
                <Link to='/clock' className="relative h-12 w-full flex justify-center">
                    <img src={clockLogo} className="absolute z-10" />
                    {window.location.pathname === '/clock' && <SelectedItem />}
                </Link>
                <Link to='/profile' className="relative h-12 w-full flex justify-center">
                    <img src={profileLogo} className="absolute z-10" />
                    {window.location.pathname === '/profile' && <SelectedItem />}
                </Link>
                <Link to='/trend' className="relative h-12 w-full flex justify-center">
                    <img src={trendLogo} className="absolute z-10" />
                    {window.location.pathname === '/trend' && <SelectedItem />}
                </Link>
            </div>
            <button onClick={() => leave()}>
                <img src={leaveLogo} />
            </button>
        </div>
        <div className="p-6">
            <Header color={colors[window.location.pathname ]} />
            {children}
        </div>
    </div>)
}

export default PrivateRoute