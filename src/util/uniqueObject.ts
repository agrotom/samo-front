export default interface UniqueObject {
    id: number;
}

export function reserveID(array: UniqueObject[]): number {
    var sortedCopy = [ ...array ].sort((a, b) => a.id - b.id);

    if (sortedCopy.length > 0) {
        return sortedCopy[sortedCopy.length - 1].id + 1;
    }

    return 0;
}