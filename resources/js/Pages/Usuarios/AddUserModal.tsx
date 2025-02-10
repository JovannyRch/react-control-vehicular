import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { FormEvent, useEffect } from "react";

interface Props {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
}

const AddUserModal = ({ isOpen, onClose, user }: Props) => {
    const { data, setData, post, errors, put } = useForm({
        name: "",
        email: "",
        password: "",
        role: "FUEL",
    });

    const isEditMode = !!user;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditMode) {
            put(route("admin.users.update", user!.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            post(route("admin.users.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setData({
                    name: user.name,
                    email: user.email,
                    password: user.passsword_copy ?? "",
                    role: user.role,
                });
            } else {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    role: "FUEL",
                });
            }
        }
    }, [isOpen, user, isEditMode]);

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-4">
                <h2 className="mb-4 text-xl font-semibold text-white">
                    {isEditMode ? "Editar" : "Agregar"} usuario usuario
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center w-full gap-2">
                        <div className="w-2/3">
                            <InputLabel
                                htmlFor="name"
                                value="Nombre del usuario"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-2/3">
                            <InputLabel
                                htmlFor="email"
                                value="Correo electrónico"
                            />
                            <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex flex-col w-2/3 gap-2">
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <TextInput
                                id="password"
                                name="password"
                                type="text"
                                value={data.password}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col w-2/3 gap-2">
                            <InputLabel htmlFor="role" value="Rol" />
                            <select
                                id="role"
                                name="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="block w-full mt-1"
                            >
                                <option value="FUEL">Combustible</option>
                                <option value="MAINT">Mantenimiento</option>
                                <option value="ACCESORIOS">Accesorios</option>
                                <option value="PLANTILLA">Plantilla</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Button type="submit" className="btn btn-primary">
                                {isEditMode
                                    ? "Guardar cambios"
                                    : "Registrar usuario"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddUserModal;
