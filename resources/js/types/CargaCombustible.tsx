export interface CargaCombustible {
    id: number;
    vehiculo_id: number;
    litros: number;
    importe: number;
    fecha: string;
    created_at: string;
    updated_at: string;
    odometro_inicial: number | null;
    odometro_final: number | null;
    folio: string | null;
}
