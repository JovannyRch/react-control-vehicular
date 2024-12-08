import { PropsWithChildren, ReactNode, useMemo } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, router } from "@inertiajs/react";
import { User } from "@/types";
import { Dropdown as NestedDropdown } from "react-nested-dropdown";
import "react-nested-dropdown/dist/styles.css";

import { RiPoliceCarLine } from "react-icons/ri";
import { BsFuelPump, BsTools } from "react-icons/bs";
import { BiLogOut, BiSolidCarMechanic } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { Typography } from "@/Components/Typography";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const items = [
        {
            label: "2019",
            onSelect: () => {
                router.visit("/vehiculos?plantilla=2019");
            },
        },
        {
            label: "2023",
            onSelect: () => {
                router.visit("/vehiculos?plantilla=2023");
            },
        },
        {
            label: "Propia",
            items: [
                {
                    label: "Vigente",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=vigente"
                        ),
                },
                {
                    label: "Baja",
                    onSelect: () =>
                        router.visit("/vehiculos?plantilla=propia&estado=baja"),
                },
                {
                    label: "Tramite de baja",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=tramite_de_baja"
                        ),
                },
                {
                    label: "Problemas legales",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=problemas_legales"
                        ),
                },
                {
                    label: "Comodato",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=comodato"
                        ),
                },
            ],
        },
        {
            label: "2024",
            onSelect: () => router.visit("/vehiculos?plantilla=2024"),
        },
    ];

    const cargaItems = [
        {
            label: "2019",
            onSelect: () => {
                router.visit("/vehiculos?plantilla=2019&loadFuel=true");
            },
        },
        {
            label: "2023",
            onSelect: () => {
                router.visit("/vehiculos?plantilla=2023&loadFuel=true");
            },
        },
        {
            label: "Propia",
            items: [
                {
                    label: "Vigente",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=vigente&loadFuel=true"
                        ),
                },
            ],
        },
        {
            label: "2024",
            onSelect: () =>
                router.visit("/vehiculos?plantilla=2024&loadFuel=true"),
        },
        {
            label: "Listar todas",
            onSelect: () => router.visit("/vehiculos?loadFuel=true"),
        },
    ];

    const mantenimientoItems = [
        {
            label: "Propia",
            items: [
                {
                    label: "Vigente",
                    onSelect: () =>
                        router.visit(
                            "/vehiculos?plantilla=propia&estado=vigente&maintenance=true"
                        ),
                },
            ],
        },
        {
            label: "2024",
            onSelect: () =>
                router.visit("/vehiculos?plantilla=2024&maintenance=true"),
        },
    ];

    const navItems = [
        {
            icon: <RxDashboard className="w-5 h-5" />,
            label: "Inicio",
            href: route("dashboard"),
            hide: false,
        },
        {
            icon: <RiPoliceCarLine className="w-5 h-5" />,
            label: "Vehiculos",
            href: route("vehiculos.index"),
            items,
            hide: false,
        },
        {
            icon: <BsFuelPump className="w-5 h-5" />,
            label: "Combustible",
            href: route("vehiculos.index", { loadFuel: "true" }),
            items: cargaItems,
            hide: user.role !== "ADMIN" && user.role !== "FUEL",
        },
        {
            icon: <BiSolidCarMechanic className="w-5 h-5" />,
            label: "Mantenimiento",
            href: route("vehiculos.index", { maintenance: "true" }),
            items: mantenimientoItems,
            hide: user.role !== "ADMIN" && user.role !== "MAINT",
        },
        {
            icon: <BsTools className="w-5 h-5" />,
            label: "Accesorios",
            href: route("vehiculos.index", { tools: "true" }),
            hide: user.role !== "ADMIN" && user.role !== "MAINT",
        },
    ];
    return (
        <div className="min-h-screen bg-slate-600">
            <main className="relative">
                <aside
                    id="app-sidebar"
                    className="absolute top-0 left-0 z-40 h-screen transition-transform -translate-x-full w-52 sm:translate-x-0 position bg-[#141E30]"
                    aria-label="Sidebar"
                >
                    <div className="w-[300px] bg-transparent">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-[#141E30] w-52 ">
                            <div className="mb-8 ">
                                <Link href="/">
                                    <ApplicationLogo className="w-[180px] text-gray-500 fill-current" />
                                </Link>
                            </div>
                        </div>
                        <ul className="pl-2 space-y-2 font-medium">
                            {navItems.map((item, index) =>
                                item.hide ? null : item.items ? (
                                    <li key={index}>
                                        <NestedDropdown
                                            items={item.items}
                                            containerWidth={140}
                                        >
                                            {({ onClick }) => (
                                                <div
                                                    onClick={onClick}
                                                    className="pl-1 cursor-pointer "
                                                >
                                                    <Typography.Title className="flex items-center gap-2">
                                                        <span className="flex items-center h-8">
                                                            {item.icon}
                                                        </span>
                                                        <span className="text-sm">
                                                            {item.label}
                                                        </span>
                                                    </Typography.Title>
                                                </div>
                                            )}
                                        </NestedDropdown>
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <NavLink
                                            href={item.href}
                                            active={route().current(item.href)}
                                            className="w-[100px]"
                                        >
                                            <Typography.Title className="flex items-center gap-2 text-sm">
                                                <span className="flex items-center h-8">
                                                    {item.icon}
                                                </span>
                                                <span className="text-md">
                                                    {item.label}
                                                </span>
                                            </Typography.Title>
                                        </NavLink>
                                    </li>
                                )
                            )}
                            <li className="flex justify-center w-48">
                                <div className="border-t border-gray-200 w-44"></div>
                            </li>
                            <li>
                                <NavLink
                                    href={route("logout")}
                                    active={false}
                                    method="post"
                                >
                                    <Typography.Title className="flex items-center gap-2 text-sm">
                                        <span className="flex items-center h-8">
                                            <BiLogOut className="w-5 h-5" />
                                        </span>
                                        <span className="text-md ">
                                            Cerrar sesión
                                        </span>
                                    </Typography.Title>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div
                    className="absolute flex-1 z-0  left-[210px]  "
                    style={{
                        width: "calc(100vw - 210px)",
                    }}
                >
                    {header && (
                        <header className="bg-[#141E30] shadow">
                            <div className="flex gap-8 px-4 py-6 mx-auto text-white max-w-7xl sm:px-6 lg:px-8">
                                <div className="flex-1 text-white">
                                    {header}
                                </div>
                                <div>{user.username}</div>
                            </div>
                        </header>
                    )}
                    <div
                        className="overflow-y-auto"
                        style={{ height: "calc(100vh - 100px)" }}
                    >
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
