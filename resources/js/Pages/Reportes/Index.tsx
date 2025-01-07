import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useMemo } from "react";
import { Vehiculo } from "@/types/Vehiculo";
import Button from "@/Components/Button";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { AiFillEye, AiOutlineDownload } from "react-icons/ai";
import { BiPlus, BiSearch, BiSolidCarMechanic } from "react-icons/bi";
import { FaEdit, FaToolbox, FaTools } from "react-icons/fa";
import MainColorContainer from "@/Components/MainColorContainer";
import { Typography } from "@/Components/Typography";
import RoundedIconButton from "@/Components/RoundedIconButton";
import useDebounce from "@/hooks/useDebounce";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import BreadcrumbItem from "@/Components/BreadcrumbItem";

export default function Index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <BreadcrumbItem displayArrow={false}>
                            <>Reportes</>
                        </BreadcrumbItem>
                    </ol>
                </nav>
            }
        >
            <Head title="Reportes" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <MainColorContainer className="p-6 mt-6 mb-8 bg-[#141E30] shadow-sm sm:rounded-lg ">
                    <Typography.Title className="block mb-3 text-xl font-medium ">
                        Reportes
                    </Typography.Title>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <a
                                href={route("reportes.mantenimientosPorAnio")}
                                target="_blank"
                                className=" p-4 text-center  text-white rounded-lg flex gap-4 items-center bg-[#1E293B] hover:bg-[#2C3E50]"
                            >
                                Mantenimientos por año
                                <FaTools />
                            </a>
                        </div>
                        <div>
                            <a
                                href={route("reportes.accesoriosPorAnio")}
                                target="_blank"
                                className=" p-4 text-center  text-white rounded-lg flex gap-4 items-center bg-[#1E293B] hover:bg-[#2C3E50]"
                            >
                                Accesorios
                                <FaToolbox />
                            </a>
                        </div>
                        <div>
                            <a
                                href={route("reportes.gastosCombustible")}
                                target="_blank"
                                className=" p-4 text-center  text-white rounded-lg flex gap-4 items-center bg-[#1E293B] hover:bg-[#2C3E50]"
                            >
                                Gastos más elevados de combustible
                                <BsFillFuelPumpDieselFill />
                            </a>
                        </div>
                        <div>
                            <a
                                href={route("reportes.vehiculosPorMarca")}
                                target="_blank"
                                className=" p-4 text-center  text-white rounded-lg flex gap-4 items-center bg-[#1E293B] hover:bg-[#2C3E50]"
                            >
                                Vehículos por marca
                                <BiSolidCarMechanic />
                            </a>
                        </div>
                    </div>
                </MainColorContainer>
            </div>
        </AuthenticatedLayout>
    );
}
