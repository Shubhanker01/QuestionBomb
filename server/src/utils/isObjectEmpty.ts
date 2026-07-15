export function isObjectEmpty(obj: object) {
    return (
        obj && Object.keys(obj).length == 0 && obj.constructor === Object
    )
}