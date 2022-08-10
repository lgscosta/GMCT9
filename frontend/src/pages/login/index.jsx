import { Link } from "react-router-dom";
import logo from '../../assets/original.png'
import Input from "../../components/input";
import { api } from "../../services/api";
import { toast } from 'react-toastify'

const Login = () => {

    const login = async (event) => {
        if (event) event.preventDefault();
        const { email, password } = event.target

        try {
            const { data } = await api.post('/login', {
                email: email.value,
                password: password.value
            })
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        } catch ({ response }) {
            const { data} = response
            toast.error(data.msg)
        }
    }
    return (
        <div className="grid grid-cols-2 h-full p-3 justify-center items-center">
        <div>
            <form onSubmit={login} className="grid gap-3" >
                <Input type="text" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="password" />
                <button className="h-12 bg-gmct-green font-bold text-white uppercase rounded" type="submit">Entrar</button>
            </form>
            <div className="h-px w-full bg-gradient-to-r from-gmct-pink via-gmct-green to-gmct-lightBlue my-4 rounded" />
            <Link to='/signin' className="text-base p-2 rounded hover:bg-opacity-20 text-gmct-green hover:bg-white  uppercase text-center flex justify-center">Criar usuário</Link>
        </div>
        <div>
        <img src={logo} /> 
        </div>
        </div>)
}

export default Login