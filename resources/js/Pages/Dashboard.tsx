import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import Button from "@/Components/Button";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Button
                                style="green"
                                className="flex items-center gap-2"
                                onClick={() =>
                                    router.visit(
                                        "/vehiculos?plantilla=propia&estado=vigente"
                                    )
                                }
                            >
                                Carga de combustible
                                <BsFillFuelPumpDieselFill className="inline-block mr-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
