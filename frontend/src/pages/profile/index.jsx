import { useEffect } from "react"
import Input from "../../components/input"
import { api } from "../../services/api"
import jwt_decode from 'jwt-decode'
import { useState } from "react"

import { toast} from 'react-toastify'

const Profile = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        courseInitial: '',
        username: ''
    })

    const decoded = jwt_decode(localStorage.getItem('token'))
    const updateUser = async (event) => {
        event.preventDefault()
        const { name, email, username, } = event.target

        try {
            const {data} = await api.put(`user/${decoded.id}`, {
                name: name.value,
                email: email.value,
                username: username.value
            })
            toast.success('Sucesso ao atualizar o usuário!')
        } catch ({response}) {
            
            toast.error(response.data.msg)
        }
    }

    const getMyUser = async () => {

            
        const {data} = await api.get(`user/${decoded.id}`)
        setFormData(data.user)
    }

    useEffect(() => {
        getMyUser()
    }, [])

    return <div>
    <div className="flex gap-3">
        <div className="text-2xl text-white">Atualizando o <b className="text-gmct-pink">usuário</b>!</div>
    </div>
    <form onSubmit={updateUser} className="grid gap-3 my-5" >
        <Input type="text"  value={formData.name} onChange={(event) => setFormData({...formData, name: event.target.value})} name="name" placeholder="Nome" />
        <Input type="username" value={formData.username} onChange={(event) => setFormData({...formData, username: event.target.value})} name="username" placeholder="Usuário" />
        <Input type="text" value={formData.email} onChange={(event) => setFormData({...formData, email: event.target.value})} name="email" placeholder="E-mail" />
        <button className="h-12 bg-gmct-pink font-bold text-white uppercase rounded" type="submit">Atualizar</button>
    </form>
    </div>
}

export default Profile