import { useState } from "react"

export function LoginForm(props) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    return <div className="G-login-form">
        <div>
            <input 
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Email..." />
        </div>
        <div>
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..." />
        </div>
        <div>
            <button onClick={() => props.cb({ email: login, password })}>Login</button>
        </div>
    </div>
}