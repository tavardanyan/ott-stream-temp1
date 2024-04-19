import axios from "axios";
import { LoginForm } from "../components/login.form";
import { Modal } from "../components/modal";
import { useNavigate } from 'react-router-dom';
import { mainConfig } from "../config";

export function Login() {
    const navigate = useNavigate();

    const login = (data) => {
        axios.post(`${mainConfig.backUrl}/v1/auth/login`, data, {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
          }).then(res => {
            alert('Login success')
            window.localStorage.setItem('token', res.data.tokens.access.token)
          }).then(() => navigate('/dashboard')).catch(err => {
            alert('Invalid login or password!!!')
          })
    }

    return <Modal>
        <div className="G-container">
            <LoginForm cb={login} />
        </div>
    </Modal>
}