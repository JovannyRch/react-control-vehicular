export const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    return `${dateObj.getDate() + 1}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(value);
};

export const formatOnlyDateValue = (date: string): string => {
    const [year = "-", month = "-", day = "-"] = date.split("-");
    return `${day} ${getMonthName(Number(month))} ${year}`;
};

export const generateDate = (date: string): string => {
    const [year = "-", month = "-", day = "-"] = date.split("-");
    return `${year}-${month}-${day}`;
};

export const formatNumber = (
    value: number | null,
    prefix: string = ""
): string => {
    if (value === null) {
        return "-";
    }

    return `${new Intl.NumberFormat("es-MX").format(
        value
    )} ${prefix}`.trimEnd();
};

export const getMonthName = (month: number): string => {
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    return months[month - 1];
};

export const getCurrentDateOfMexico = (): string => {
    const date = new Date();
    date.setHours(date.getHours() - 6);
    return date.toISOString().split("T")[0];
};

export const addElipsis = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
};
