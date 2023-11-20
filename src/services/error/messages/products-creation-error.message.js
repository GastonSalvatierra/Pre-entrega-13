export const generateProductErrorInfo = (user) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
        Lista de propiedades requeridas:
            ----> content recibido: ${user};
    `;
};