import { useCallback, useEffect, useState } from "react";

interface InputControllerProperties {
    fetchSource: () => string;
    writeSource: (data: string) => void;
}

export default function useInputController({ fetchSource, writeSource }: InputControllerProperties) {
    const [data, setData] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Загрузка
    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchSource();
            setData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Сохранение
    const writeData = useCallback(async (data: string) => {
        try {
            writeSource(data);
        } catch (err: any) {
            setError(err.message);
        }
    }, []);

    return { data, loading, error, writeData, loadData };
}