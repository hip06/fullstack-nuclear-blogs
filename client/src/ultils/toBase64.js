import { Buffer } from 'buffer'


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export const arrayBufferToBase64 = (arrayBuffer) => {
    if (arrayBuffer === '' || arrayBuffer?.data === [] || typeof arrayBuffer !== 'object' || !arrayBuffer) return false
    return new Buffer(arrayBuffer, 'base64').toString('binary')
}

export function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}