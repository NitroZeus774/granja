
"use client";
import LoginForm from 'gr/components/loginform';
import { useEffect } from 'react';
import Swal from "sweetalert2"
export default function LoginPage() {
    useEffect(() => {
        const rol = sessionStorage.getItem("rol");
        const user = sessionStorage.getItem("user");
        if (rol !== null) {
            Swal.fire("hola " + user + ", ya has iniciado sesión como " + rol);
            if (rol === "Administrador") {
                window.location.replace("/Dashboard");
            }
            else if (rol === "Veterinario") {
                window.location.replace("/Dashboard/Veterinaria");
            }
            else if (rol === "Cliente") {
                window.location.replace("/Dashboard/Cliente");
            }
        }
    }) 
    

    return <LoginForm />;
}
