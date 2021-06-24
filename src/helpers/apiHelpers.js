import { config } from '../config';

const createArrayQueryParam = (object, objectEntity) => {
    let finalOutput = '';

    if(object[objectEntity] && object[objectEntity].length){
        object[objectEntity].forEach(entity => {
            finalOutput += (`${entity},`);
        })
    }

    if(finalOutput) finalOutput = finalOutput.slice(0, -1);

    const queryArray = finalOutput ? `${objectEntity}=${finalOutput}&` : '';

    return queryArray;
}

export const createArrayFormData = (data, items, fieldName) => {
    items.forEach((item, i) => {
        data.append(`${fieldName}[${i}]`, item);
    });
}