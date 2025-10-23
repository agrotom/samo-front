export type SaveFuncType<T> = (data: T) => void

export const defaultSaveFunc = () => { return; }

export default interface SavingProperties<T> {
    loadedData: T;
    onSave?: SaveFuncType<T>;
}