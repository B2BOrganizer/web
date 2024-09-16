import {Button, FieldProps, useFieldValue} from "react-admin";
import * as React from "react";

interface PreviewFieldProps extends FieldProps {
    onPreview: (previews: any[]) => void;
}

export const PreviewField = (props: PreviewFieldProps) => {
    const value = useFieldValue(props);

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        props.onPreview(value);
    };

    return (
        <Button label="Preview" type="button" onClick={handleClick} />
    );
}