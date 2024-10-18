export interface Mantenimiento {
    id: string;
    vehiculo_id: number;
    fecha_elaboracion: string;
    folio: string;
    fecha_ingreso: string;
    fecha_salida: string;
    taller_asignacion: string;
    servicio_solicitado: string;
    servicio_realizado: string;
    importe: string;
    folio_fiscal: string;
    folio_afectacion: string;
    estado: string;
}

export const mantenimientoStatus = [
    { value: "proceso", label: "En proceso" },
    { value: "afectado", label: "Afectado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "finalizado", label: "Finalizado" },
];

export const mantenimientoStatusMap: Record<string, string> = {
    proceso: "En proceso",
    afectado: "Afectado",
    cancelado: "Cancelado",
    finalizado: "Finalizado",
};
