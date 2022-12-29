
const Signup = () => {

    return (
        <>
            <section class="bg-GLblack grid place-items-center">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="/" class="flex items-center mb-6 text-4xl laptop:text-6xl font-body text-GLwhite">
                        GROOVELIST
                    </a>
                    <div class="w-full bg-GLblack rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-body leading-tight tracking-tight text-GLwhite md:text-2xl">
                                Create an account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">

                                <div>
                                    <label for="username" class="block mb-2 text-sm font-body text-GLwhite">Your username</label>
                                    <input type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Groover" required/>
                                </div>

                                <div>
                                    <label for="email" class="block mb-2 text-sm font-body text-GLwhite">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required/>
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-body text-GLwhite">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                                </div>
                               
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-body rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p class="text-sm text-GLwhite">
                                    Already have an account? <a href="/login" class="font-body text-primary-600 hover:underline">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup