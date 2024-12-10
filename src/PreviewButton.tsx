import {Button, FieldProps, useDataProvider, useRecordContext} from "react-admin";
import * as React from "react";

interface PreviewFieldProps extends FieldProps {
    onPreview: (previews: any[]) => void;
    managedDocumentRecordIdentifier?: string;
}

const PreviewButton: React.FC<PreviewFieldProps> = (props) => {
    const record = useRecordContext(props);
    const dataProvider = useDataProvider();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (record) {
            const recordId = props.managedDocumentRecordIdentifier
                ? record[props.managedDocumentRecordIdentifier]
                : record.id;

            dataProvider.getOne('managed-documents-previews', { id: recordId })
                .then(response => props.onPreview(response.data.previews));
        }
    }

    return (
        <Button label="Preview" type="button" onClick={handleClick} />
    );
};

export default PreviewButton;