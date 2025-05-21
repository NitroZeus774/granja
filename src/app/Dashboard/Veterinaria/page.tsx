"use client";
import Navbar from "gr/components/navbar";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [programacion, setProgramacion] = useState([]);
    const [editandoPrograma, setEditandoPrograma] = useState<number | null>(null);
    const [programaEditado, setProgramaEditado] = useState<any>({});

    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            window.location.replace("/login");
        }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/programacion");
                const data = await response.json();
                console.log(data)
                setProgramacion(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleEditarPrograma = (program: any) => {
        setEditandoPrograma(program.id);
        setProgramaEditado({ ...program });
    };

    const handleGuardarEdicion = async () => {
        try {
            const response = await fetch("/api/programacion/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(programaEditado),
            });
            if (response.ok) {
                alert("Actualización exitosa");
                setEditandoPrograma(null);
                fetchProgramacion();
            } else {
                alert("Error al actualizar");
            }
        } catch (e) {
            alert("Error de red");
            console.error(e);
        }
    };

    const handleCancelarEdicion = () => {
        setEditandoPrograma(null);
        setProgramaEditado({});
    };

    const handleEliminarUsuario = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este programa?")) {
            try {
                const r = await fetch("/api/usuarios/delete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(id),
                });
                fetchProgramacion();
            } catch (e) {
                console.error("Error al eliminar usuario:", e);
            }
        }
    };

    const handleChangeEdit = (field: string, value: string) => {
        setProgramaEditado((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <Navbar
            title="Dashboard"
            left_title="Veterinario"
            orientation="left"
            nav={["programacion", "animales"]}
            logout_button={{
                render: true,
                on_click: () => {
                    sessionStorage.clear();
                    window.location.replace("/login");
                },
            }}
            elements={[
                {
                    id_nav: 1,
                    obj: (
                        <div className="text-center">
                            <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-[#f4f1ee] text-[#1f1b18] uppercase text-sm tracking-wider">
                                    <tr>
                                        <th className="px-4 py-2">Descripción</th>
                                        <th className="px-4 py-2">ID Usuario</th>
                                        <th className="px-4 py-2">ID Animal</th>
                                        <th className="px-4 py-2">Fecha inicio</th>
                                        <th className="px-4 py-2">Fecha fin</th>
                                        <th className="px-4 py-2">Estado</th>
                                        <th className="px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {programacion.map((program, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">
                                                {editandoPrograma === program.id ? (
                                                    <input
                                                        type="text"
                                                        value={programaEditado.descripcion}
                                                        onChange={(e) =>
                                                            handleChangeEdit("descripcion", e.target.value)
                                                        }
                                                    />
                                                ) : (
                                                    program.descripcion
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {editandoPrograma === program.id ? 
                                                    (<input
                                                        type="text"
                                                        value={programaEditado.id_usuario}
                                                        onChange={(e) =>
                                                            handleChangeEdit("id_usuario", e.target.value)
                                                        }
                                                    />)
                                                    : (program.id_usuario)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    editandoPrograma === program.id ?
                                                        (<input
                                                            type="text"
                                                            value={programaEditado.id_animal}
                                                            onChange={(e) =>
                                                                handleChangeEdit("id_animal", e.target.value)
                                                            }
                                                        />)
                                                    :(program.id_animal)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {
                                                    editandoPrograma === program.id ?
                                                        (<input
                                                            type="text"
                                                            value={programaEditado.id_usuario}
                                                            onChange={(e) =>
                                                                handleChangeEdit("id_usuario", e.target.value)
                                                            }
                                                        />)
                                                    : (program.fecha_inicio)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {editandoPrograma === program.id ?
                                                    (<input
                                                        type="text"
                                                        value={programaEditado.fecha_fin}
                                                        onChange={(e) =>
                                                            handleChangeEdit("fecha_fin", e.target.value)
                                                        }
                                                    />) :(program.fecha_fin)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {editandoPrograma === program.id ?
                                                    (<input
                                                        type="text"
                                                        value={programaEditado.fecha_fin}
                                                        onChange={(e) =>
                                                            handleChangeEdit("fecha_fin", e.target.value)
                                                        }
                                                    />) :(program.estado)}
                                            </td>
                                            <td className="border px-4 py-2 space-x-2">
                                                {editandoPrograma === program.id ? (
                                                    <>
                                                        <button
                                                            onClick={handleGuardarEdicion}
                                                            className="text-green-600"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            onClick={handleCancelarEdicion}
                                                            className="text-gray-600"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditarPrograma(program)}
                                                            className="text-blue-600 flex items-center gap-1"
                                                        >
                                                            <PencilSquareIcon className="w-5 h-5" />
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleEliminarUsuario(program.id)}
                                                            className="text-red-600 flex items-center gap-1"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                            Eliminar
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ),
                },
                {
                    id_nav: 2,
                    obj: <div>Holamundo</div>,
                },
            ]}
        />
    );
}
