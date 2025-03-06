import { Vehiculo } from "@/types/Vehiculo";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

const transformToOption = (item: Vehiculo) => {
    return {
        label: [
            item.marca,
            item.modelo,

            item.civ,
            item.numero_economico,
            item.placa,
            item.no_serie,
            item.no_motor,
        ]
            .filter(Boolean)
            .join(" - "),
        value: String(item.id),
    };
};

interface Props {
    onSelect: (item: Vehiculo) => void;
}

const VehicleAutocomplete = ({ onSelect }: Props) => {
    const [vehicles, setVehicles] = useState<Vehiculo[]>([]);

    useEffect(() => {
        axios.get(`/api/search-vehicle-plantilla-2023`).then(({ data }) => {
            setVehicles(data);
        });
    }, []);

    return (
        <div>
            <Select
                options={vehicles.map(transformToOption)}
                onChange={(selected) => {
                    const vehicle = vehicles.find(
                        (item) => String(item.id) === selected?.value
                    );
                    if (vehicle) {
                        onSelect(vehicle);
                    }
                }}
            />
        </div>
    );
};

export default VehicleAutocomplete;
