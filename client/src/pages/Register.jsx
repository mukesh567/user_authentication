import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setToken } from '../store/authSlice'


const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
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
            const resp = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await resp.json();
            if (resp.ok) {
                //Store token at localstorage
                dispatch(setToken(res_data.token))
                localStorage.setItem("User", JSON.stringify(res_data.message));
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                })
                toast.success("Registration Successfully!")
                navigate("/")
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("Register", error);
        }
    }



    return <>

        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">

                        <div className="registration-image">
                            <img
                                src="/assets/images/register.png"
                                alt="A boy is trying to do registration"
                                width="500" height="500" />
                        </div>

                        <div className="registration-form">
                            <h1 className='main-heading '>Registration Form</h1>
                            <br />

                            <form onSubmit={handleSubmit} >
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name='username' id='username' placeholder='Enter your username' required autoComplete='off'
                                        value={user.username} onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name='email' id='email' placeholder='Enter your email' required autoComplete='off'
                                        value={user.email} onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" name='phone' id='phone' placeholder='Enter your phone' required autoComplete='off'
                                        value={user.phone} onChange={handleInput} />
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name='password' id='password' placeholder='Enter your password' required autoComplete='off'
                                        value={user.password} onChange={handleInput} />
                                </div>

                                <br />
                                <button type='submit' className='btn btn-submit'>Register Now</button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
}

export default Register