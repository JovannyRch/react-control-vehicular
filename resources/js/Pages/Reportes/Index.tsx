import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useMemo } from "react";
import { Vehiculo } from "@/types/Vehiculo";
import Button from "@/Components/Button";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { AiFillEye, AiOutlineDownload } from "react-icons/ai";
import { BiPlus, BiSearch, BiSolidCarMechanic } from "react-icons/bi";
import { FaEdit, FaTools } from "react-icons/fa";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import RoundedIconButton from "@/Components/RoundedIconButton";
import useDebounce from "@/hooks/useDebounce";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

export default function Index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Reportes
                </h2>
            }
        >
            <Head title="Reportes" />

            {/* Add grid for reports */}
            <div>
                <MainColorContainer className="p-6 mt-6 mb-8 bg-[#141E30] shadow-sm sm:rounded-lg ">
                    <Typography.Title className="block mb-3 text-xl font-medium ">
                        Reportes
                    </Typography.Title>
                    <div className="grid grid-cols-12 gap-6">
                        <div className=" sm:col-span-6 md:col-span-6">
                            <Button
                                /* onClick={() => router.push("/reportes/mantenimientos-por-ano")} */
                                className="w-full"
                            >
                                Mantenimientos por año
                                <FaTools />
                            </Button>
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <Button
                                /*   onClick={() => router.push("/reportes/gastos-mas-elevados-combustible")} */
                                className="w-full"
                            >
                                Gastos más elevados de combustible
                                <BsFillFuelPumpDieselFill />
                            </Button>
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <Button
                                /*   onClick={() => router.push("/reportes/cuantos-vehiculos-por-marca")} */
                                className="w-full"
                            >
                                Vehículos hay por marca
                                <BiSolidCarMechanic />
                            </Button>
                        </div>
                    </div>
                </MainColorContainer>
            </div>
        </AuthenticatedLayout>
    );
}
