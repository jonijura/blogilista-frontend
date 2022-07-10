import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, notify }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login(username, password)
            console.log('user', user)
            setUser(user)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            notify('wrong username or password', 'error')
        }
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>)
}

export default LoginForm