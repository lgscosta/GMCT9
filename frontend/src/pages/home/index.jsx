import { useEffect, useState } from "react"
import { api } from "../../services/api"

import nightLogo from '../../assets/night.svg'
import sunLogo from '../../assets/sun.svg'
import { Link } from "react-router-dom"

const Home = () => {
    const [course, setCourse] = useState({})
    const [menu, setMenu] = useState({
        dayMenu: {
            salada: [],
            pratoPrincipal: [],
            opcao: [],
            acompanhamento: [],
            guarnicao: [],
            sobremesa: []
        },
        nightMenu: {
            salada: [],
            pratoPrincipal: [],
            opcao: [],
            acompanhamento: [],
            guarnicao: [],
            sobremesa: []
        }
    })
    const [menuOption, setMenuOption] = useState('day')
    const getMyCourse = async () => {
        try {

            const { data } = await api.get('/mycourse')
            setCourse(data)
        } catch (error) {
            console.log({ error })
        }
    }

    const getMenu = async () => {
        try {

            const { data } = await api.get('/menu')
            console.log({ data })
            setMenu({ dayMenu: data.cardapio.cardapioDiaFormatado, nightMenu: data.cardapio.cardapioNoiteFormatado })
        } catch (error) {
            console.log({ errror })
        }
    }

    useEffect(() => {
        getMyCourse()
        getMenu()
    }, [])
    return <div>
        <h3 className="text-2xl font-bold text-white">Estudante de <span className="text-gmct-green">{course.course}</span></h3>
        <div className="grid grid-cols-4 gap-4 grid-rows-2 my-7">
            <Link to="/" className="bg-gmct-blue hover:bg-gmct-green hover:bg-opacity-10 rounded-lg flex flex-col items-center justify-center text-white">
                Minha
                <strong className="text-7xl text-gmct-green">UFES</strong>
            </Link>
            <Link to="/trend" className="bg-gmct-blue hover:bg-gmct-lightBlue hover:bg-opacity-10 rounded-lg flex flex-col items-center justify-center text-white">
                Meu
                <strong className="text-7xl text-gmct-lightBlue">CURSO</strong>
            </Link>
            <Link to="/profile" className="bg-gmct-blue hover:bg-gmct-pink hover:bg-opacity-10 rounded-lg flex flex-col items-center justify-center text-white">
                Meu
                <strong className="text-7xl text-gmct-pink">PERFIL</strong>
            </Link>
            <div className="row-span-2 bg-gmct-blue rounded-lg p-5">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold text-white">
                    Restaurante <br />
                    Universitário
                </h2>
                    <button onClick={() => setMenuOption(menuOption === 'day' ? 'night' : 'day')}><img src={menuOption === 'day' ? sunLogo : nightLogo} /></button>
                </div>
                {menuOption === 'day' && (
                    <div className="flex flex-col text-white">
                        <strong className="text-gmct-pink">Salada</strong>
                        {menu.dayMenu.salada.length > 0 ? menu.dayMenu.salada : 'Nenhuma salada informada'}
                        <strong className="text-gmct-pink">Prato Principal</strong>
                        {menu.dayMenu.pratoPrincipal.length > 0 ? menu.dayMenu.pratoPrincipal : 'Nenhum prato principal informado'}
                        <strong className="text-gmct-pink">Opção</strong>
                        {menu.dayMenu.opcao.length > 0 ? menu.dayMenu.opcao : 'Nenhuma opção informada'}
                        <strong className="text-gmct-pink">Acompanhamento</strong>
                        {menu.dayMenu.acompanhamento.length > 0 ? menu.dayMenu.acompanhamento : 'Nenhum acompanhamento informado'}
                        <strong className="text-gmct-pink">Guarnição</strong>
                        {menu.dayMenu.guarnicao.length > 0 ? menu.dayMenu.guarnicao : 'Nenhuma guarnição informada'}
                        <strong className="text-gmct-pink">Sobremesa</strong>
                        {menu.dayMenu.sobremesa.length > 0 ? menu.dayMenu.sobremesa : 'Nenhuma sobremesa informada'}
                    </div>)}
                {menuOption === 'night' && (
                    <div className="flex flex-col text-white">
                        <strong className="text-gmct-pink">Salada</strong>
                        {menu.nightMenu.salada.length > 0 ? menu.nightMenu.salada : 'Nenhuma salada informada'}
                        <strong className="text-gmct-pink">Prato Principal</strong>
                        {menu.nightMenu.pratoPrincipal.length > 0 ? menu.nightMenu.pratoPrincipal : 'Nenhum prato principal informado'}
                        <strong className="text-gmct-pink">Opção</strong>
                        {menu.nightMenu.opcao.length > 0 ? menu.nightMenu.opcao : 'Nenhuma opção informada'}
                        <strong className="text-gmct-pink">Acompanhamento</strong>
                        {menu.nightMenu.acompanhamento.length > 0 ? menu.nightMenu.acompanhamento : 'Nenhum acompanhamento informado'}
                        <strong className="text-gmct-pink">Guarnição</strong>
                        {menu.nightMenu.guarnicao.length > 0 ? menu.nightMenu.guarnicao : 'Nenhuma guarnição informada'}
                        <strong className="text-gmct-pink">Sobremesa</strong>
                        {menu.nightMenu.sobremesa.length > 0 ? menu.nightMenu.sobremesa : 'Nenhuma sobremesa informada'}
                    </div>)}
            </div>
            <div className=" col-span-3 bg-gmct-blue rounded-lg flex flex-col p-5 gap-4 justify-center">
                <b className="text-white text-xl">Progressão curricular:</b>
                <div className="h-6 w-full bg-gmct-darkBlue rounded-full relative">
                    <div style={{ width: `${course.percentageDone}%` }} className="h-full absolute top-0 left-0 bg-gmct-lightBlue rounded-full" />
                </div>
            </div>


        </div>
    </div>
}

export default Home