import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Vehiculo } from "@/types/Vehiculo";
import { Estados, Plantillas } from "@/types/const";
import { Typography } from "@/Components/Typography";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import BreadcrumbItem from "@/Components/BreadcrumbItem";

interface VehiculosProps extends PageProps {
    vehiculos: Vehiculo[];
    plantilla: string;
    estado: string;
    vehiculo: Vehiculo;
    mode: "create" | "edit";
}

export default function Create({
    auth,
    plantilla,
    mode,
    vehiculo,
}: VehiculosProps) {
    const { data, setData, post, processing, errors, reset, put } = useForm({
        numero_economico: mode === "edit" ? vehiculo.numero_economico : "",
        marca: mode === "edit" ? vehiculo.marca : "",
        tipo: mode === "edit" ? vehiculo.tipo : "",
        modelo: mode === "edit" ? vehiculo.modelo : "",
        placa: mode === "edit" ? vehiculo.placa : "",
        no_serie: mode === "edit" ? vehiculo.no_serie : "",
        no_motor: mode === "edit" ? vehiculo.no_motor : "",
        area_asignacion: mode === "edit" ? vehiculo.area_asignacion : "",
        resguardante: mode === "edit" ? vehiculo.resguardante : "",
        detalle: mode === "edit" ? vehiculo.detalle : "",
        plantilla: mode === "edit" ? vehiculo.plantilla : plantilla,
        estado: mode === "edit" ? vehiculo.estado : "vigente",
        civ: mode === "edit" ? vehiculo.civ : "",
    });

    const [success, setSuccess] = useState("");

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === "create") {
            post(route("vehiculos.store"), {
                onSuccess: () => {
                    reset();
                    setSuccess("Vehículo creado exitosamente");
                },
            });
        } else {
            put(route("vehiculos.update", vehiculo.id), {
                onSuccess: () => {
                    setSuccess("Vehículo actualizado exitosamente");
                },
            });
        }
    };

    useUpdateEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        }
    }, [success]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <BreadcrumbItem displayArrow={false}>
                                <a
                                    href={route("vehiculos.index")}
                                    className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-blue-600 "
                                >
                                    Vehículos
                                </a>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <>{plantilla}</>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <>
                                    {
                                        {
                                            create: "Nuevo ",
                                            edit: "Editar ",
                                        }[mode]
                                    }
                                    vehículo
                                    {plantilla && ` ${plantilla}`}
                                </>
                            </BreadcrumbItem>
                        </ol>
                    </nav>
                </h2>
            }
        >
            <Head title="Vehículos" />

            {success && (
                <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center h-16 bg-green-500">
                    <Typography.Paragraph className="text-white">
                        {success}
                    </Typography.Paragraph>
                </div>
            )}

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-center overflow-hidden bg-[#141E30] shadow-sm sm:rounded-lg">
                        <div className="justify-center w-full px-6 py-4 mt-6 overflow-hidden bg-[#141E30] sm:rounded-lg md:max-w-[900px]">
                            <form
                                onSubmit={submit}
                                className="grid gap-4 md:grid-cols-2 sm:grid-cols-1"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="plantilla"
                                        value="Plantilla"
                                    />
                                    <select
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={(e) =>
                                            setData("plantilla", e.target.value)
                                        }
                                    >
                                        {Plantillas.map((plantilla, index) => (
                                            <option
                                                key={index}
                                                value={plantilla.value}
                                                selected={
                                                    plantilla.value ===
                                                    data.plantilla
                                                }
                                            >
                                                {plantilla.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {data.plantilla === "propia" && (
                                    <div>
                                        <InputLabel
                                            htmlFor="estado"
                                            value="Estado"
                                        />
                                        <select
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={(e) =>
                                                setData(
                                                    "estado",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {Estados.map((estado, index) => (
                                                <option
                                                    key={index}
                                                    value={estado.value}
                                                    selected={
                                                        estado.value ===
                                                        data.estado
                                                    }
                                                >
                                                    {estado.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="">
                                    <InputLabel htmlFor="civ" value="CIV" />
                                    <TextInput
                                        id="civ"
                                        type="text"
                                        name="civ"
                                        value={data.civ ?? ""}
                                        className="block w-full mt-1"
                                        autoComplete="civ"
                                        onChange={(e) =>
                                            setData(
                                                "civ",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.civ}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel
                                        htmlFor="numero_economico"
                                        value="Número económico"
                                    />
                                    <TextInput
                                        id="numero_economico"
                                        type="text"
                                        name="numero_economico"
                                        value={data.numero_economico}
                                        className="block w-full mt-1"
                                        autoComplete="numero_economico"
                                        onChange={(e) =>
                                            setData(
                                                "numero_economico",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.numero_economico}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel htmlFor="marca" value="Marca" />
                                    <TextInput
                                        id="marca"
                                        type="text"
                                        name="marca"
                                        value={data.marca}
                                        className="block w-full mt-1"
                                        autoComplete="marca"
                                        list="marcas"
                                        onChange={(e) =>
                                            setData(
                                                "marca",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.marca}
                                        className="mt-2"
                                    />
                                    <datalist id="marcas">
                                        <option>CHEVROLET</option>
                                        <option>KTM</option>
                                        <option>YAMAHA</option>
                                        <option>DODGE</option>
                                        <option>JET BIKE</option>
                                        <option>TOYOTA</option>
                                        <option>NISSAN</option>
                                        <option>KIA</option>
                                        <option>YAMAHA</option>
                                        <option>SUZUKI</option>
                                        <option>RENAULT</option>
                                        <option>HYUNDAI</option>
                                        <option>HONDA</option>
                                        <option>FORD</option>
                                        <option>RAM</option>
                                        <option>AUDI</option>
                                        <option>BMW</option>
                                        <option>VOLKSWAGEN</option>
                                    </datalist>
                                </div>

                                <div className="">
                                    <InputLabel htmlFor="tipo" value="Tipo" />
                                    <TextInput
                                        id="tipo"
                                        type="text"
                                        name="tipo"
                                        value={data.tipo}
                                        className="block w-full mt-1"
                                        autoComplete="tipo"
                                        onChange={(e) =>
                                            setData(
                                                "tipo",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tipo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel
                                        htmlFor="modelo"
                                        value="Modelo"
                                    />
                                    <TextInput
                                        id="modelo"
                                        type="text"
                                        name="modelo"
                                        value={data.modelo}
                                        className="block w-full mt-1"
                                        autoComplete="modelo"
                                        onChange={(e) =>
                                            setData(
                                                "modelo",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.modelo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel htmlFor="placa" value="Placa" />
                                    <TextInput
                                        id="placa"
                                        type="text"
                                        name="placa"
                                        value={data.placa}
                                        className="block w-full mt-1"
                                        autoComplete="placa"
                                        onChange={(e) =>
                                            setData(
                                                "placa",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.placa}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel
                                        htmlFor="no_serie"
                                        value="No. Serie"
                                    />
                                    <TextInput
                                        id="no_serie"
                                        type="text"
                                        name="no_serie"
                                        value={data.no_serie}
                                        className="block w-full mt-1"
                                        autoComplete="no_serie"
                                        onChange={(e) =>
                                            setData(
                                                "no_serie",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.no_serie}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel
                                        htmlFor="no_motor"
                                        value="No. Motor"
                                    />
                                    <TextInput
                                        id="no_motor"
                                        type="text"
                                        name="no_motor"
                                        value={data.no_motor}
                                        className="block w-full mt-1"
                                        autoComplete="no_motor"
                                        onChange={(e) =>
                                            setData(
                                                "no_motor",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.no_motor}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel
                                        htmlFor="area_asignacion"
                                        value="Área de asignación"
                                    />
                                    <TextInput
                                        id="area_asignacion"
                                        type="text"
                                        name="area_asignacion"
                                        value={data.area_asignacion}
                                        className="block w-full mt-1"
                                        autoComplete="area_asignacion"
                                        onChange={(e) =>
                                            setData(
                                                "area_asignacion",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.area_asignacion}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="">
                                    <InputLabel
                                        htmlFor="resguardante"
                                        value="Resguardante"
                                    />
                                    <TextInput
                                        id="resguardante"
                                        type="text"
                                        name="resguardante"
                                        value={data.resguardante}
                                        className="block w-full mt-1"
                                        autoComplete="resguardante"
                                        onChange={(e) =>
                                            setData(
                                                "resguardante",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.resguardante}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Detalle text area */}
                                <div className="">
                                    <InputLabel
                                        htmlFor="detalle"
                                        value="Detalle"
                                    />
                                    <textarea
                                        id="detalle"
                                        name="detalle"
                                        value={data.detalle}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={(e) =>
                                            setData(
                                                "detalle",
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        rows={5}
                                    />
                                    <InputError
                                        message={errors.detalle}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-center col-span-2 ">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        {
                                            {
                                                create: "Crear",
                                                edit: "Guardar cambios",
                                            }[mode]
                                        }
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
