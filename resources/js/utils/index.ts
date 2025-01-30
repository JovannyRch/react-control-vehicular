import { CargaCombustible } from "@/types/CargaCombustible";

export const getKm = (carga: CargaCombustible) => {
    if (carga.odometro_final === null || isNaN(carga.odometro_final)) {
        return "-";
    }

    if (carga.odometro_inicial === null || isNaN(carga.odometro_inicial)) {
        return "-";
    }

    return `${Number(carga.odometro_final - carga.odometro_inicial)} km`;
};

export const getRendimiento = (carga: CargaCombustible) => {
    if (carga.odometro_final === null || isNaN(carga.odometro_final)) {
        return "";
    }

    if (carga.odometro_inicial === null || isNaN(carga.odometro_inicial)) {
        return "";
    }

    if (carga.litros === null || isNaN(carga.litros)) {
        return "";
    }

    if (carga.litros === 0) {
        return "";
    }

    return `${(
        Number(carga.odometro_final - carga.odometro_inicial) / carga.litros
    ).toFixed(2)} km/l`;
};

export const safeReduceSum = (a: number, b: string | number) => {
    if (isNaN(Number(b))) {
        return a;
    }

    return a + Number(b);
};
