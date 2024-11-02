import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";

// import Axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
import "./Authentification.css"


const Authentication = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [registerMode, setRegisterMode] = useState(false)

    const navigate = useNavigate();

    const submit = () => {

        let nrError = "";

        if (registerMode) {

            if (username.length < 5) {
                toast.error('Username must have at least 5 characters!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                nrError += 'username_err ';
            }

        }
        if (email.length < 1 || !/^[a-zA-Z0-9_.+-]+@gmail\.com$/.test(email)) {
            toast.error('Invalid email!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            nrError += ' email_err ';
        }

        if (password.length < 6) {
            toast.error('Password must have at least 6 characters!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            nrError += ' password_err ';
        }

        if (nrError.length) {
            throw new Error('You have errors: ' + nrError)
        }

        if (registerMode) {
            // Axios.post('http://localhost:8080/users', {
            //     username: username,
            //     email: email,
            //     password: password,
            //     isAdmin: false
            // }).then((res) => {
            //     localStorage.setItem('account', JSON.stringify({
            //         id: res.data.id,
            //         username: username,
            //         email: email,
            //         isAdmin: false
            //     }))
            //     localStorage.setItem('passions', 'Culture,Sports,Concerts')
            //     navigate("/homepage");
            // }).catch(() => toast.error('This email is already used!', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "colored",
            // }))

            localStorage.setItem('account', JSON.stringify({
                id: 1,
                username: 'mihneacatana',
                email: 'mihneacatana@gmail.com',
                isAdmin: true
            }))
            navigate("/homepage");

        } else {
            // Axios.post('http://localhost:8080/users/login', {
            //     email: email,
            //     password: password,
            // }).then((res) => {
            //     localStorage.setItem('account', JSON.stringify({
            //         id: res.data.id,
            //         username: res.data.username,
            //         email: email,
            //         isAdmin: false
            //     }))
            //     localStorage.setItem('passions', 'Culture,Sports,Concerts')
            //
            //     navigate("/homepage");
            // }).catch((err) => {
            //     console.error(err)
            //     toast.error('Invalid credentials!', {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: true,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: false,
            //         progress: undefined,
            //         theme: "colored",
            //     })
            // })
            localStorage.setItem('account', JSON.stringify({
                id: 1,
                username: 'mihneacatana',
                email: 'mihneacatana@gmail.com',
                isAdmin: true
            }))
            navigate("/homepage");
        }
    }

    return <>
        <div className={'auth_container'}>

            <div className={'auth_card'}>
                {registerMode ?
                    <>
                        <div className={'auth_title'}>Register</div>
                        <InputText className={'auth_inputs'} placeholder={'Username'} value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>

                    </>
                    : <div className={'auth_title'}>Login</div>

                }
                <InputText className={'auth_inputs'} placeholder={'Email'} value={email} style={{width:'200px'}}
                           onChange={(e) => setEmail(e.target.value)}/>
                <Password className={'auth_inputs auth_password'} placeholder={'Password'} feedback={false}
                          value={password}
                          style={{width:'197px'}}
                          onChange={(e) => setPassword(e.target.value)}
                          />
                <Button className={'auth_submit'} onClick={submit} label={registerMode ? 'Register' : 'Login'}/>
                <Button className={'auth_changeMode'} label={registerMode ? "Already have an account?" : "Register now"}
                        onClick={() => {
                            registerMode ? setRegisterMode(false) : setRegisterMode(true)
                        }} link/>
            </div>
        </div>
        <ToastContainer/>
    </>
}

export default Authentication