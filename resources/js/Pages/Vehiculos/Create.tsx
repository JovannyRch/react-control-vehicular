import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Vehiculo } from "@/types/Vehiculo";

interface VehiculosProps extends PageProps {
    vehiculos: Vehiculo[];
    plantilla: string;
    estado: string;
    vehiculo: Vehiculo;
    mode: "create" | "edit";
}

const Estados = [
    {
        label: "Vigente",
        value: "vigente",
    },
    {
        label: "Baja",
        value: "baja",
    },
    {
        label: "Trámite de baja",
        value: "tramite_de_baja",
    },
    {
        label: "Problemas legales",
        value: "problemas_legales",
    },
    {
        label: "Comodato",
        value: "comodato",
    },
];

const Plantillas = [
    {
        label: "2019",
        value: "2019",
    },
    {
        label: "2023",
        value: "2023",
    },
    {
        label: "Propia",
        value: "propia",
    },
    {
        label: "2024",
        value: "2024",
    },
];

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === "create") {
            post(route("vehiculos.store"), {
                onFinish: () => reset(),
            });
        } else {
            put(route("vehiculos.update", vehiculo.id), {
                onFinish: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    {
                        {
                            create: "Crear vehículo",
                            edit: "Editar vehículo",
                        }[mode]
                    }
                </h2>
            }
        >
            <Head title="Vehículos" />

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
                                        className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="estado"
                                            value="Estado"
                                        />
                                        <select
                                            className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

                                <div className="mt-4">
                                    <InputLabel htmlFor="civ" value="CIV" />
                                    <TextInput
                                        id="civ"
                                        type="text"
                                        name="civ"
                                        value={data.civ ?? ""}
                                        className="block w-full mt-1"
                                        autoComplete="civ"
                                        onChange={(e) =>
                                            setData("civ", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.civ}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.numero_economico}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="marca" value="Marca" />
                                    <TextInput
                                        id="marca"
                                        type="text"
                                        name="marca"
                                        value={data.marca}
                                        className="block w-full mt-1"
                                        autoComplete="marca"
                                        onChange={(e) =>
                                            setData("marca", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.marca}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="tipo" value="Tipo" />
                                    <TextInput
                                        id="tipo"
                                        type="text"
                                        name="tipo"
                                        value={data.tipo}
                                        className="block w-full mt-1"
                                        autoComplete="tipo"
                                        onChange={(e) =>
                                            setData("tipo", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.tipo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                            setData("modelo", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.modelo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="placa" value="Placa" />
                                    <TextInput
                                        id="placa"
                                        type="text"
                                        name="placa"
                                        value={data.placa}
                                        className="block w-full mt-1"
                                        autoComplete="placa"
                                        onChange={(e) =>
                                            setData("placa", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.placa}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                            setData("no_serie", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.no_serie}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                            setData("no_motor", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.no_motor}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.area_asignacion}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
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
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.resguardante}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Detalle text area */}
                                <div className="mt-4">
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
                                            setData("detalle", e.target.value)
                                        }
                                        rows={5}
                                    />
                                    <InputError
                                        message={errors.detalle}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-center col-span-2 mt-4">
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
