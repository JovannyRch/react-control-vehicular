import Button from "@/Components/Button";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Vehiculo } from "@/types/Vehiculo";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import VehicleAutocomplete from "./VehicleAutocomplete";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Textarea } from "@headlessui/react";
import ReactImageUploader from "@/Components/ReactImageUploader";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

interface MantenimientosCreateProps extends PageProps {
    vehiculos: Vehiculo[];
}

const MantenimientosCreate = ({ auth }: MantenimientosCreateProps) => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehiculo | null>(
        null
    );

    const { data, setData, errors, post } = useForm<{
        imagenes: File[];
        fecha: string;
        kilometraje: string;
        ubicacion: string;
        requerimientos: string;
        vehiculo_id: string;
    }>({
        vehiculo_id: "",
        fecha: "",
        kilometraje: "",
        ubicacion: "",
        requerimientos: "",
        imagenes: [],
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedVehicle) {
            alert("Selecciona un vehículo");
            return;
        }

        post(route("solicitudes-mantenimiento.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData("fecha", "");
                setData("kilometraje", "");
                setData("ubicacion", "");
                setData("requerimientos", "");
                setData("imagenes", []);
            },
        });
    };

    useUpdateEffect(() => {
        if (selectedVehicle) {
            setData("vehiculo_id", selectedVehicle.id);
        }
    }, [selectedVehicle]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Solicitud de mantenimiento" />
            <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <MainColorContainer className="overflow-hidden shadow-sm sm:rounded-lg min-h-[500px]  p-4 px-8 w-full">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <Typography.Title className="mb-5 text-2xl font-semibold">
                                Crear solicitud de mantenimiento
                            </Typography.Title>

                            <div className="max-w-[600px] w-full">
                                <div className="mt-4">
                                    <VehicleAutocomplete
                                        onSelect={setSelectedVehicle}
                                    />

                                    {selectedVehicle && (
                                        <div className="gap-4 p-4 mt-4 border border-gray-200 rounded-lg ">
                                            <Typography.Subtitle>
                                                Información del vehículo
                                            </Typography.Subtitle>
                                            <div className="grid grid-cols-2">
                                                <Typography.Paragraph>
                                                    Marca:{" "}
                                                    {selectedVehicle.marca}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    Modelo:{" "}
                                                    {selectedVehicle.modelo}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    CIV: {selectedVehicle.civ}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    # Económico:{" "}
                                                    {
                                                        selectedVehicle.numero_economico
                                                    }
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    Placa:{" "}
                                                    {selectedVehicle.placa}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    Plantilla:{" "}
                                                    {selectedVehicle.plantilla}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    # Motor:{" "}
                                                    {selectedVehicle.no_motor}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    # Serie:{" "}
                                                    {selectedVehicle.no_serie}
                                                </Typography.Paragraph>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Fecha"
                                    />

                                    <TextInput
                                        type="date"
                                        name="date"
                                        value={data.fecha}
                                        className="block w-full mt-1"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("fecha", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.fecha}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="kilometraje"
                                        value="Kilometraje"
                                    />

                                    <TextInput
                                        type="text"
                                        name="kilometraje"
                                        value={data.kilometraje}
                                        className="block w-full mt-1"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "kilometraje",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.kilometraje}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="ubicacion"
                                        value="Ubicación"
                                    />

                                    <TextInput
                                        type="text"
                                        name="ubicacion"
                                        value={data.ubicacion}
                                        className="block w-full mt-1"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("ubicacion", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.ubicacion}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="requerimiento"
                                        value="Requerimientos y/o servicios"
                                    />

                                    <Textarea
                                        name="requerimiento"
                                        rows={3}
                                        value={data.requerimientos}
                                        className="block w-full mt-1"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "requerimientos",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.requerimientos}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <ReactImageUploader
                                        images={data.imagenes}
                                        setImages={(images) => {
                                            setData("imagenes", images);
                                        }}
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button type="submit" className="ms-4">
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </form>
                        {/*  <img
                            src={`/storage/solicitudes_mantenimiento/pJRBAhEpWq25LfOY41RqUAyC3cuBKSXC37C4zKIH.jpg`}
                            className="object-cover w-24 h-24"
                        /> */}
                    </MainColorContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MantenimientosCreate;
