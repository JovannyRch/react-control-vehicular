import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import { useEffect, useState } from "react";
import Button from "@/Components/Button";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import { UserRoles } from "@/types/const";
import axios from "axios";
import { BiEdit, BiSearch, BiShow, BiTrash } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import RoundedIconButton from "@/Components/RoundedIconButton";

import { PiPlus } from "react-icons/pi";
import AddUserModal from "./AddUserModal";

interface VehiculosProps extends PageProps {
    pagination: any;
    users: User[];
}

export default function Usuarios({ auth, pagination }: VehiculosProps) {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<null | any>(null);

    const { delete: deleteFunction } = useForm({});

    useEffect(() => {
        if (auth.user.role !== "ADMIN") {
            router.replace(route("vehiculos.index"));
        }

        form.setData("search", document.location.search.split("=")[1]);
    }, []);

    const [csvFile, setCsvFile] = useState<File | null>(null);

    const { data, setData } = useForm({
        plantilla: "2019",
        estado: "vigente",
    });

    const form = useForm({
        search: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile) return;
        const formData = new FormData();
        formData.append("csv_file", csvFile);
        formData.append("plantilla", data.plantilla);
        formData.append("estado", data.estado);

        axios
            .post("/upload-vehicles", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                router.reload();
                setIsUploadModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            });
    };

    const tableHeaders = [
        {
            label: "name",
            key: "name",
        },
        {
            label: "Correo",
            key: "email",
        },
        {
            label: "Role",
            key: "role",
        },
        {
            label: "Acciones",
            key: "action",
        },
    ];

    const handleDeleteUser = (user: User) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            deleteFunction(route("admin.users.destroy", user.id), {
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    /*  const handleSearch: FormEventHandler = (e) => {
        e.preventDefault();

        router.visit(
            route("admin.vehiculos", {
                search: form.data.search,
            })
        );
    }; */

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a
                                    href={route("vehiculos.index")}
                                    className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-blue-600 "
                                >
                                    Usuarios
                                </a>
                            </li>
                        </ol>
                    </nav>
                </h2>
            }
        >
            <Head title="Vehículos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4">
                            <Typography.Title className="text-2xl font-semibold ">
                                Lista de usuarios
                            </Typography.Title>

                            <div className="flex items-center justify-between my-8">
                                <div className="flex items-center flex-1 gap-2">
                                    <div className="flex items-center h-full ">
                                        {form.data.search && (
                                            <Button
                                                onClick={() =>
                                                    router.visit(
                                                        route("admin.vehiculos")
                                                    )
                                                }
                                            >
                                                Limpiar busqueda
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() =>
                                            setIsAddUserModalOpen(true)
                                        }
                                    >
                                        Agregar usuario
                                        <PiPlus />
                                    </Button>

                                    {/*   <Button
                                        onClick={() =>
                                            confirm(
                                                "¿Estás seguro de eliminar todos los registros?"
                                            ) && handleDestroyAll()
                                        }
                                    >
                                        Eliminar todos los registros
                                        <BiTrash />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsUploadModalOpen(true)
                                        }
                                    >
                                        Cargar desde CSV
                                        <AiOutlineUpload />
                                    </Button> */}
                                </div>
                            </div>

                            <div className="relative pb-12 mt-8 overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                                    <thead className="text-xs text-gray-700 uppercase bg-[#141E30] ">
                                        <tr>
                                            {tableHeaders.map(
                                                (header, index) => (
                                                    <th
                                                        key={index}
                                                        className="font-semibold text-gray-400"
                                                    >
                                                        {header.label}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagination.data.map(
                                            (user: User, index: number) => {
                                                return (
                                                    <tr
                                                        key={user.id}
                                                        className="border-b border-gray-200 hover:bg-[#475569] text-gray-200 "
                                                    >
                                                        <td className="font-bold text-white text-md min-h-10">
                                                            {user.name ?? "-"}
                                                        </td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {UserRoles.get(
                                                                user.role
                                                            )}
                                                        </td>

                                                        <td>
                                                            <div className="flex gap-2">
                                                                <RoundedIconButton
                                                                    tooltip="Editar"
                                                                    name="edit"
                                                                    onClick={() => {
                                                                        setSelectedUser(
                                                                            user
                                                                        );
                                                                        setIsAddUserModalOpen(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <BiEdit />
                                                                </RoundedIconButton>

                                                                <RoundedIconButton
                                                                    tooltip="Eliminar"
                                                                    name="delete"
                                                                    onClick={() =>
                                                                        handleDeleteUser(
                                                                            user
                                                                        )
                                                                    }
                                                                >
                                                                    <BiTrash />
                                                                </RoundedIconButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                                <Pagination pagination={pagination} />
                            </div>
                        </div>
                    </MainColorContainer>
                </div>
            </div>
            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                user={selectedUser}
            />
        </AuthenticatedLayout>
    );
}
