import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AnimatedPage from "../components/animations/AnimatedPage"
import { useAuthContext } from "../contexts/AuthContext"

const LoginPage = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    

    const { login } = useAuthContext()
	const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
		try {
            
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/home')

		} catch (err) {
            toast.error(err.message)
		}
    }

    return (
        <>
            <AnimatedPage>
                <section className="bg-GLblack grid place-items-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="flex items-center mb-6 text-4xl laptop:text-6xl font-body text-GLwhite">
                            <Link to="/">GROOVELIST</Link>
                        </div>
                        <div className="w-full bg-GLblack rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-body leading-tight tracking-tight text-GLwhite md:text-2xl">
                                    Log In
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-2 text-sm font-body text-GLwhite">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="...@email.com" required ref={emailRef} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-body text-GLwhite">Password</label>
                                        <input type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required ref={passwordRef} />
                                    </div>
                                
                                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-body rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                                    <p className="text-sm text-GLwhite">
                                        No account? <Link className="font-body text-primary-600 hover:underline" to="/signup">Sign up</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedPage>
        </>
    )
}

export default LoginPage