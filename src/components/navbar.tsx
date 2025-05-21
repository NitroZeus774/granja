"use client";
import { useState, MouseEvent } from "react";

interface Element {
    id_nav: number;
    obj: React.ReactNode;
}

interface NavbarProps {
    nav: string[];
    title: string;
    left_title: string;
    elements: Element[];
    orientation?: "top" | "left";
    logout_button?: {
        render: boolean;
        on_click?: () => void;
    };
}

export default function Navbar({ nav, title, left_title = "", elements, orientation = "top", logout_button = { render: false, on_click }}: NavbarProps){
    const [active, setActive] = useState(nav[0]);
    const [gindex, setGindex] = useState(1);
    const logout = () => {
        console.log("Logout")
    }
    const handleClick = (e: MouseEvent<HTMLLIElement>) => {
        const text = e.currentTarget.textContent;
        if (text) {
            setActive(text);
            setGindex(nav.indexOf(text) + 1);
        }
    };

    return (
        <div className={`flex ${orientation === "top" ? "flex-col" : "min-h-screen"}`}>
            
            <div className={`${orientation === "top" ? "text-black border-b border-gray-200" : "flex flex-row flex-1"}`}>

                {orientation === "top" && (
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-[rgb(0,255,220)] text-black rounded-lg hover:bg-opacity-80 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Menú lateral */}
                <div className={`relative ${orientation === "top" ? "w-full" : " top-0 sticky left-0 z-11 w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col backdrop-blur-sm"}`}>

                    {orientation === "left" && (
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="text-3xl font-bold tracking-tight">{left_title}</h4>
                        </div>
                    )}

                    <ul className={`flex ${orientation === "top" ? "flex-row justify-center space-x-0 p-0" : "flex-col space-y-1 p-4 flex-grow sticky top-0 z-10"}`}>
                        {nav.map((element, index) => (
                            <li
                                key={index}
                                onClick={handleClick}
                                className={`relative px-6 py-3 transition-all duration-300 cursor-pointer font-medium
                            ${element === active ? (orientation === "top" ? "text-black before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-4/5 before:h-1 before:bg-[rgb(0,255,220)] before:clip-path-polygon" : "bg-[rgba(0,255,220,0.1)] border-l-4 border-[rgb(0,255,220)]") : "hover:bg-gray-100 dark:hover:bg-gray-700"}
                            flex items-center justify-center space-x-2 group`}
                            >
                                <span className="relative z-10">
                                    {element}
                                    {orientation === "top" && element === active && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[rgb(0,255,220)]"></span>
                                    )}
                                </span>

                                {orientation === "left" && element === active && (
                                    <span className="w-2 h-2 bg-[rgb(0,255,220)] rounded-full"></span>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Botón de logout en versión left */}
                    {orientation === "left" && logout_button.render && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 sticky b-0 z-10">
                            <button
                                onClick={logout_button.on_click}
                                className="w-full px-4 py-2 bg-[rgb(0,255,220)] text-black rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Contenido principal */}
                <div className={`${orientation === "left" ? "flex-1 p-6" : "p-8"}`}>
                    {orientation === "left" && (
                        <div className="relative p-4 mb-6 text-center border-b border-gray-200 dark:border-gray-700 rounded-lg">
                            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        </div>
                    )}
                    {elements.map((element, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-300 ease-in-out transform
                            ${element.id_nav === gindex ?
                                    "opacity-100 translate-y-0 scale-100 h-auto" :
                                    "opacity-0 translate-y-4 scale-95 h-0 overflow-hidden"}
                            flex justify-center`}
                        >
                            <div className="px-4 py-8 mx-auto">
                                {element.obj}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

