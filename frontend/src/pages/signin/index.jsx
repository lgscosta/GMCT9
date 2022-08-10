import Input from "../../components/input";
import logo from '../../assets/original.png'
import { api } from "../../services/api";
import { toast } from 'react-toastify'
import BackIcon from "../../components/backIcon";

const Signin = () => {
    const signinForm = async (event) => {
        event.preventDefault();
        const { name, email, username, password, confirmPassword} = event.target

        if(password.value !== confirmPassword.value) {
           return  toast.warn('A confirmação de senha não bate!!')
        }
        try {
            const {data } = await api.post('/user', {
                "name": name.value,
                "password": password.value,
                "confirmPassword": confirmPassword.value,
                "username": username.value,
                "email": email.value
        })
        toast.success(data.msg)
        window.setTimeout(() => {

            window.location.href = '/login'
        },500)
        } catch (error) {
            toast.error(error.response.data.msg)
            console.log({ error })
        }
        
    }
    return (
        <div className="grid grid-cols-2 h-full p-3 justify-center items-center">
            <div>
            <div className="flex gap-3">
                <BackIcon className="fill-gmct-green" />
                <div className="text-2xl text-white">Criando o <b className="text-gmct-green">usuário</b>!</div>
            </div>
            <form onSubmit={signinForm} className="grid gap-3" >
                <Input type="text" name="name" placeholder="Nome" />
                <Input type="username" name="username" placeholder="Usuário" />
                <Input type="text" name="email" placeholder="E-mail" />
                <Input type="password" name="password" placeholder="password" />
                <Input type="password" name="confirmPassword" placeholder="Confirme a senha" />
                <button className="h-12 bg-gmct-green font-bold text-white uppercase rounded" type="submit">Cadastrar</button>
            </form>
            </div>
            <div>
                <img src={logo} /> 
            </div>
        </div>)
}

export default Signin