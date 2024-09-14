export const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(value);
};

//YYYY-MM-DD
export const formatOnlyDateValue = (date: string): string => {
    const [year = "-", month = "-", day = "-"] = date.split("-");
    return `${day}/${month}/${year}`;
};
