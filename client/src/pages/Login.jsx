import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { setToken } from '../store/authSlice'

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await resp.json();

            console.log(res_data);

            if (resp.ok) {
                //Store token at localstorage
                dispatch(setToken(res_data.token))

                toast.success("Login Successfully!")
                setUser({
                    email: "",
                    password: ""
                })
                navigate("/")
            }
            else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("Login", error);
        }
    }

    return <>

        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">

                        <div className="registration-image">
                            <img
                                src="/assets/images/login.png"
                                alt="A boy is trying to do login"
                                width="500" height="500" />
                        </div>

                        <div className="registration-form">
                            <h1 className='main-heading mb-3'>Login Form</h1>
                            <br />

                            <form onSubmit={handleSubmit} >
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name='email' id='email' placeholder='Enter your email' required autoComplete='off'
                                        value={user.email} onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name='password' id='password' placeholder='Enter your password' required autoComplete='off'
                                        value={user.password} onChange={handleInput} />
                                </div>

                                <br />
                                <button type='submit' className='btn btn-submit'>Login Now</button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
}

export default Login