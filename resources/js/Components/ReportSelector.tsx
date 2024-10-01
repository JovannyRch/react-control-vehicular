import { useState, useEffect } from "react";
import Button from "./Button";
import { BiSearch } from "react-icons/bi";

interface ReportSelectorProps {
    fetchData: ({ month, year }: { month: string; year: string }) => void;
}

const ReportSelector = ({ fetchData }: ReportSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const months = [
        { value: "01", name: "Enero" },
        { value: "02", name: "Febrero" },
        { value: "03", name: "Marzo" },
        { value: "04", name: "Abril" },
        { value: "05", name: "Mayo" },
        { value: "06", name: "Junio" },
        { value: "07", name: "Julio" },
        { value: "08", name: "Agosto" },
        { value: "09", name: "Septiembre" },
        { value: "10", name: "Octubre" },
        { value: "11", name: "Noviembre" },
        { value: "12", name: "Diciembre" },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        new Array(10),
        (val, index) => currentYear - index
    );

    useEffect(() => {
        if (month && year) {
            // Llamar a la función fetchData para obtener los registros
            fetchData({ month, year });
        }
    }, [month, year, fetchData]);

    if (!isOpen) {
        return (
            <Button style="green" onClick={() => setIsOpen(true)}>
                Buscar
                <BiSearch />
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-3 p-4">
            <div className="mb-4">
                <select
                    id="month"
                    className="block w-full mt-1 border border-gray-300 rounded-md min-w-[200px] "
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    <option value="">Mes</option>
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <select
                    id="year"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md min-w-[120px] "
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value="">Año</option>
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ReportSelector;
