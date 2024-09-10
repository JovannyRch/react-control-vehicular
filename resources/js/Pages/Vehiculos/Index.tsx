import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Vehiculos({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Vehículos
                </h2>
            }
        >
            <Head title="Vehículos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Vehiculos
                            {route().params.year && (
                                <span className="text-xs font-normal text-gray-500 ms-1">
                                    {route().params.year}
                                </span>
                            )}
                            {route().params.status && (
                                <span className="text-xs font-normal text-gray-500 ms-1">
                                    {route().params.status}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
