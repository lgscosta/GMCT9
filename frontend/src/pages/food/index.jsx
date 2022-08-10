import { useEffect } from "react"
import { useState } from "react"
import { api } from "../../services/api"

import NightIcon from "../../components/nightIcon"
import SunIcon from '../../components/sunIcon'

const Food = () => {
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
        getMenu()
    }, [])
    return <div>
        <h3 className="text-3xl font-bold text-white">RU <span className="text-gmct-green">Hoje</span>:</h3>

        <div className="flex gap-6 w-full my-5">
            <div className="bg-gmct-blue w-full p-4 rounded-lg">
            <div className="flex justify-between">
                    <h2 className="text-2xl font-normal mb-4 text-white">
                    Cardápio <br />
                    Almoço
                </h2>
                    <SunIcon className="fill-gmct-green" />
                </div>
                <div className="flex flex-col text-white">
                    <strong className="text-gmct-green">Salada</strong>
                    {menu.dayMenu.salada.length > 0 ? menu.dayMenu.salada : 'Nenhuma salada informada'}
                    <strong className="text-gmct-green">Prato Principal</strong>
                    {menu.dayMenu.pratoPrincipal.length > 0 ? menu.dayMenu.pratoPrincipal : 'Nenhum prato principal informado'}
                    <strong className="text-gmct-green">Opção</strong>
                    {menu.dayMenu.opcao.length > 0 ? menu.dayMenu.opcao : 'Nenhuma opção informada'}
                    <strong className="text-gmct-green">Acompanhamento</strong>
                    {menu.dayMenu.acompanhamento.length > 0 ? menu.dayMenu.acompanhamento : 'Nenhum acompanhamento informado'}
                    <strong className="text-gmct-green">Guarnição</strong>
                    {menu.dayMenu.guarnicao.length > 0 ? menu.dayMenu.guarnicao : 'Nenhuma guarnição informada'}
                    <strong className="text-gmct-green">Sobremesa</strong>
                    {menu.dayMenu.sobremesa.length > 0 ? menu.dayMenu.sobremesa : 'Nenhuma sobremesa informada'}
                </div>
            </div>
            <div className="bg-gmct-blue w-full p-4 rounded-lg">
            <div className="flex justify-between">
                    <h2 className="text-2xl font-normal mb-4 text-white">
                    Cardápio <br />
                    Janta
                </h2>
                    <NightIcon className="fill-gmct-green" />
                </div>
                <div className="flex flex-col text-white">
                    <strong className="text-gmct-green">Salada</strong>
                    {menu.nightMenu.salada.length > 0 ? menu.nightMenu.salada : 'Nenhuma salada informada'}
                    <strong className="text-gmct-green">Prato Principal</strong>
                    {menu.nightMenu.pratoPrincipal.length > 0 ? menu.nightMenu.pratoPrincipal : 'Nenhum prato principal informado'}
                    <strong className="text-gmct-green">Opção</strong>
                    {menu.nightMenu.opcao.length > 0 ? menu.nightMenu.opcao : 'Nenhuma opção informada'}
                    <strong className="text-gmct-green">Acompanhamento</strong>
                    {menu.nightMenu.acompanhamento.length > 0 ? menu.nightMenu.acompanhamento : 'Nenhum acompanhamento informado'}
                    <strong className="text-gmct-green">Guarnição</strong>
                    {menu.nightMenu.guarnicao.length > 0 ? menu.nightMenu.guarnicao : 'Nenhuma guarnição informada'}
                    <strong className="text-gmct-green">Sobremesa</strong>
                    {menu.nightMenu.sobremesa.length > 0 ? menu.nightMenu.sobremesa : 'Nenhuma sobremesa informada'}
                </div>
            </div>
        </div>
    </div>
}


export default Food