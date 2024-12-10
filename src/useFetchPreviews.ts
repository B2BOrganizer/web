import {useDataProvider} from 'react-admin';

export const useFetchPreviews = () => {
    const dataProvider = useDataProvider();

    return async (id: string | number): Promise<{ src: string }[]> => {
        if (!id) return [];
        try {
            const response = await dataProvider.getOne('managed-documents-previews', {id});
            return response.data.previews.map((item: string) => ({
                src: `data:${item}`
            }));
        } catch (error) {
            console.error("Error fetching previews:", error);
            return [];
        }
    };
};