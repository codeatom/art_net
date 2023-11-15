import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import UserService from '../../services/UserService';
import './LoginPage.css';


const STATUS = {
    LOGIN: "LOGIN",
    SIGN_UP: "SIGN_UP",
    RESET_PW: "RESET_PW"
}

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [status, setStatus] = useState(STATUS.LOGIN);
    const [errMsg, setErrMsg] = useState("");


    const singUP = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                let userData = {
                    "userId": user.uid,
                    "userName": "",
                    "firstName": firstName,
                    "lastName": lastName,
                    "userEmail": user.email,
                    "userImage": ""
                }

                UserService.createUser(userData).then(response => {
                    const user = response.data;
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.reload();
                });
            })
            .catch((error) => {
                setErrMsg(error.message);
            });
    }

    const singIN = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const userId = userCredential.user.uid;

            UserService.getUserByUserId(userId).then(response => {
                const existingUser = response.data;
                localStorage.setItem("user", JSON.stringify(existingUser));
                window.location.reload();
            });
        })
            .catch((error) => {
                setErrMsg(error.message);
            });
    }

    const resetPassword = async () => {
        await sendPasswordResetEmail(auth, email).then(() => {
            alert("Use the link sent to your email to reset your password and login again")
            showLogin();
        })
            .catch((error) => {
                setErrMsg(error.message);
            });
    }

    const showLogin = () => {
        setErrMsg("");
        setStatus(STATUS.LOGIN);
    }

    const showSignUp = () => {
        setErrMsg("");
        setStatus(STATUS.SIGN_UP);
    }

    const showResetPW = () => {
        setErrMsg("");
        setStatus(STATUS.RESET_PW);
    }


    return (
        <div class="container auth-div">
            {
                status == STATUS.LOGIN ?

                    <div container='sign-up-panel'>
                        <div className='login-header'>
                            Login
                        </div>
                        <div className='user-data'>
                            <div className='label-text'>Email</div>
                            <input onChange={(e) => setEmail(e.target.value)} type='text' className='text-input' placeholder='your-email@mail.com ' />
                        </div>
                        <div className='user-data'>
                            <div className='label-text'>Password</div>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' className='text-input' placeholder='your password ' />
                        </div>
                        <div className='user-data'>
                            <button onClick={singIN} className='btn btn-primary auth-button'>Sing In</button>
                        </div>
                        <div>
                            Forgot password?
                            <button onClick={showResetPW} className='btn btn-link'>Reset password</button>
                        </div>
                        <div>
                            Don't Have account?
                            <button onClick={showSignUp} className='btn btn-link'>Sign Up</button>
                        </div>
                        <div>
                            {errMsg}
                        </div>
                    </div>

                    : status == STATUS.SIGN_UP ?

                        <div container='login-panel'>
                            <div className='login-header'>
                                Create Accout
                            </div>
                            <div className='user-data'>
                                <div className='label-text'>First Name</div>
                                <input type='text' className='text-input' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className='user-data'>
                                <div className='label-text'>Last Name</div>
                                <input type='text' className='text-input' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className='user-data'>
                                <div className='label-text'>Email</div>
                                <input type='text' className='text-input' placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='user-data'>
                                <div className='label-text'>Password</div>
                                <input type='password' className='text-input' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <button className='btn btn-primary auth-button' onClick={singUP}>Sign Up</button>
                                <div className='info-div'>Already have an account?</div>
                                <button onClick={showLogin} className='btn btn-link'>Sign In</button>
                            </div>
                            <div>
                                {errMsg}
                            </div>
                        </div>

                        :

                        <div container='login-panel'>
                            <div className='login-header'>
                                Reset Password
                            </div>
                            <div className='user-data'>
                                <div className='label-text'>Email</div>
                                <input type='text' className='text-input' placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <button className='btn btn-primary auth-button' onClick={resetPassword}>Send</button>
                                <div>
                                    <button onClick={showLogin} className='btn btn-link'>back to login page</button>
                                </div>
                            </div>
                            <div>
                                {errMsg}
                            </div>
                        </div>
            }
        </div>
    );
}

export default LoginPage;