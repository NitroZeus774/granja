"use client";

import "gr/app/globals.css";
import Navbar from "gr/components/navbar";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"
export default function Dashboard() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [animales, setAnimales] = useState([]);
    const [programacion, setProgramacion] = useState([]);

    const [editandoUsuario, setEditandoUsuario] = useState(null);
    const [usuarioEditado, setUsuarioEditado] = useState({});
    
    useEffect(() => {
        const s = sessionStorage.getItem("rol");
        if (!s) {
            alert("No has iniciado sesion");
            router.replace("/login");
        }
        if (s === "Veterinario") { alert("no tienes acceso a esta pagina"); router.replace("/Dashboard/Veterinaria"); }
        if (s === "Cliente") { alert("no tienes acceso a esta pagina"); router.replace("/Dashboard/Cliente"); }
    }, [])

    const handleEditarUsuario = (usuario) => {
        setEditandoUsuario(usuario.id);
        setUsuarioEditado({ ...usuario });
    };

    const handleEliminarUsuario = (id) => {
        Swal.fire({
            title: "¿Quieres eliminar este usuario?",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`
        }).then( async (result) =>  {

            if (result.isConfirmed) {
                try {
                    const r = await fetch("/api/usuarios/delete", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(id),
                    });
                } catch (e) {
                    console.error("Error al eliminar usuario:", e);
                }
                Swal.fire("Guardado!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Cambios no guardados", "", "info");
            }
        });

    };
    useEffect(() => {
        const fetchProgramacion = async () => {
            try {
                const response = await fetch("/api/programacion");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                setProgramacion(data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };
        fetchProgramacion();
    }, []);
        useEffect(() => {
            const fetchUsuarios = async () => {
                try {
                    const response = await fetch("/api/usuarios");
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos");
                    }
                    const data = await response.json();
                    setUsuarios(data);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                }
            };

        fetchUsuarios();
    }, []);

    useEffect(() => {
        const fetchAnimales = async () => {
            try {
                const response = await fetch("/api/animales");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                setAnimales(data);
            } catch (error) {
                console.error("Error al obtener los animales:", error);
            }
        };

        fetchAnimales();
    }, []);
    const logout = () => {
        
        fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sessionStorage.getItem("id_user")),
        }).then((response) => {
            if (!response.ok) {
                    throw new Error("Error en la solicitud de cierre de sesión");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.message);
                sessionStorage.clear();
                window.location.replace("/login");
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    };
    const guardarUsuario = async (usuarioActualizado) => {
        console.log(usuarioActualizado)
        try {
            const res = await fetch(`/api/usuarios/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioActualizado),
            });
            if (!res.ok) throw new Error("Error al actualizar");

            setUsuarios((prev) =>
                prev.map((u) => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
            );
            setEditandoUsuario(null);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("/api/productos");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                console.log(data);
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };
        fetchProductos();
    }, []);
   
    return (<>

        <Navbar
            nav={["Usuarios", "Productos", "Animales", "Programacion"]}
            orientation="left"
            logout_button={{ render: true, on_click: logout }}
            title="Dashboard"
            left_title={"Administrador"}
            elements={[
                {
                    id_nav: 1, obj:
                        <div className="text-center">

                            <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-[#f4f1ee] text-[#1f1b18] uppercase text-sm tracking-wider">
                                    <tr>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Nombre</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">ID Rol</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Email</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Bloqueado</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {usuarios.map((usuario, index) => (
                                        editandoUsuario === usuario.id ? (
                                            <tr key={usuario.id}>
                                                <td className="px-6 py-4">
                                                    <input type="text" value={usuarioEditado.nombre} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input type="text" value={usuarioEditado.id_rol} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, id_rol: e.target.value })} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input type="email" value={usuarioEditado.correo} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, correo: e.target.value })} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select value={usuarioEditado.bloqueado ? "1" : "0"} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, bloqueado: e.target.value === "1" })}>
                                                        <option value="0">No</option>
                                                        <option value="1">Sí</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button onClick={() => guardarUsuario(usuarioEditado)} className="text-green-600 hover:text-green-800">
                                                        Guardar
                                                    </button>
                                                    <button onClick={() => setEditandoUsuario(null)} className="text-gray-600 hover:text-gray-800">
                                                        Cancelar
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={usuario.id}>
                                                <td className="px-6 py-4">{usuario.nombre}</td>
                                                <td className="px-6 py-4">{usuario.id_rol}</td>
                                                <td className="px-6 py-4">{usuario.correo}</td>
                                                <td className="px-6 py-4">{usuario.bloqueado ? "Sí" : "No"}</td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button onClick={() => handleEditarUsuario(usuario)} className="text-blue-600 hover:text-blue-800">
                                                        <PencilSquareIcon className="w-5 h-5" /> Editar
                                                    </button>
                                                    <button onClick={() => handleEliminarUsuario(usuario.id)} className="text-red-600 hover:text-red-800">
                                                        <TrashIcon className="w-5 h-5" /> Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>

                        </div>
                },
                {
                    id_nav: 2, obj:

                        <div className="text-center">
                            <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-[#f4f1ee] text-[#1f1b18] uppercase text-sm tracking-wider">
                                    <tr>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Nombre</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">ID Ubicación</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Cantidad</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Estado</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Precio unidad</th>
                                        <th className="border-b border-gray-300 px-6 py-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {productos.map((producto, index) => (
                                        <tr
                                            key={index}
                                            className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{producto.id_ubicacion}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{producto.cantidad}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{producto.estado}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{producto.precio_unidad}</td>
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                                <button
                                                    onClick={() => handleEditar(usuario)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleEliminar(usuario)}
                                                    className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                },
                {
                    id_nav: 3, obj: <div className="text-center">
                        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-[#f4f1ee] text-[#1f1b18] uppercase text-sm tracking-wider">
                                <tr>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Tipo</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Peso</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Nombre Comun</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Estado</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">ID ubicacion</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Fecha de registro</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {animales.map((animal, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{animal.tipo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{animal.peso}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{animal.nombre_comun}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{animal.estado}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{animal.id_ubicacion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{animal.fecha_registro}</td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                            <button
                                                onClick={() => handleEditar(usuario)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(usuario)}
                                                className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                },
                {
                    id_nav: 4, obj:
                    <div className="text-center">
                        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-[#f4f1ee] text-[#1f1b18] uppercase text-sm tracking-wider">
                                <tr>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Descripcion</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">ID Usuario</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">ID Animal</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Fecha inicio</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Fecha fin</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Estado</th>
                                    <th className="border-b border-gray-300 px-6 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {programacion.map((program, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{program.descripcion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{program.id_usuario}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{program.id_animal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{program.fecha_inicio}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{program.fecha_fin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{program.estado}</td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                            <button
                                                onClick={() => handleEditar(usuario)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(usuario)}
                                                className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            ]}
        />
        
    </>)
}