export const Plantillas = [
    {
        label: "2019",
        value: "2019",
    },
    {
        label: "2023",
        value: "2023",
    },
    {
        label: "Propia",
        value: "propia",
    },
    {
        label: "2024",
        value: "2024",
    },
];

export const Estados = [
    {
        label: "Vigente",
        value: "vigente",
    },
    {
        label: "Baja",
        value: "baja",
    },
    {
        label: "Trámite de baja",
        value: "tramite_de_baja",
    },
    {
        label: "Problemas legales",
        value: "problemas_legales",
    },
    {
        label: "Comodato",
        value: "comodato",
    },
];

export const UserRoles: Map<string, string> = new Map([
    ["ADMIN", "Administrador"],
    ["FUEL", "Combustible"],
    ["MAINT", "Mantenimiento"],
    ["ACCESORIOS", "Accesorios"],
    ["PLANTILLA", "Plantilla"],
]);
