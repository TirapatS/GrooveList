import { Link } from "react-router-dom"
import Logo from '../../../static/favicon.png'

const LargeDeviceNav = () => {
    return (
        <>  
            <aside className="w-20 h--full-screen border-r-2 flex" aria-label="Sidebar">
                <div className="py-4 px-3 bg-GLblack rounded">
                    <ul className="space-y-2">
                        <li>
                            <div className="text-GLwhite font-body text-2xl flex items-center justify-around"><img src={Logo} className="bg-white p-1 rounded" /></div>
                        </li>
                        <li>
                            <Link to="/home" className="flex items-center justify-around p-2 my-3 hover:bg-gray-600 hover:rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f9f9f9" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/explore" className="flex items-center justify-around p-2 my-3 hover:bg-gray-600 hover:rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9f9f9" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/community" className="flex items-center justify-around p-2 my-3 hover:bg-gray-600 hover:rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9f9f9" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/recently-played" className="flex items-center justify-around p-2 my-3 hover:bg-gray-600 hover:rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f9f9f9" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/account" className="flex items-center justify-around p-2 my-3 hover:bg-gray-600 hover:rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9f9f9" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default LargeDeviceNav