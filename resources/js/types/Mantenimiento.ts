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
    solicitud_mantenimiento_id?: number;
    odometro?: number;
    observaciones?: string;
}

export const mantenimientoStatus = [
    { value: "proceso", label: "En proceso" },
    { value: "afectado", label: "Afectado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "finalizado", label: "Finalizado" },
    { value: "no_atendido", label: "No atendido" },
    { value: "atendido", label: "Atendido" },
    { value: "en_taller", label: "En taller" },
];

export const mantenimientoStatusMap: Record<string, string> = {
    proceso: "En proceso",
    afectado: "Afectado",
    cancelado: "Cancelado",
    finalizado: "Finalizado",
    no_atendido: "No atendido",
    atendido: "Atendido",
    en_taller: "En taller",
};
