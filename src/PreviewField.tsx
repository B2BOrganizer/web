import {Button, FieldProps, useDataProvider, useRecordContext} from "react-admin";
import * as React from "react";

interface PreviewFieldProps extends FieldProps {
    onPreview: (previews: any[]) => void;
}

const usePreviewClick = (record: any, dataProvider: any, onPreview: (previews: any[]) => void) => {
    return React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (record) {
            dataProvider.getOne('managed-documents-previews', { id: record.id })
                .then(response => onPreview(response.data.previews));
        }
    }, [record, dataProvider, onPreview]);
};



export const PreviewField: React.FC<PreviewFieldProps> = (props) => {
    const record = useRecordContext(props);
    const dataProvider = useDataProvider();

    const handleClick = usePreviewClick(record, dataProvider, props.onPreview);

    return (
        <Button label="Preview" type="button" onClick={handleClick} />
    );
};
