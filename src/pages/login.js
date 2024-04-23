import { LoginForm } from "../components/login.form";
import { Modal } from "../components/modal";
import { useNavigate } from 'react-router-dom';
import { mainConfig } from "../config";
import { Request } from "../request";

export function Login() {
    const navigate = useNavigate();

    const login = (data) => {
        Request.post(`${mainConfig.backUrl}/v1/auth/login`, data).then(res => {
            alert('Login success')
            window.localStorage.setItem('token', res.tokens.access.token)
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