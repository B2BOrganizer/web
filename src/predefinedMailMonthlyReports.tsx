import {
    Datagrid,
    List,
    TextField,
    EmailField,
    Create,
    SimpleForm,
    TextInput,
    required,
    TopToolbar,
    CreateButton,
    useRedirect,
    Button,
    useGetRecordId,
    EditButton,
    Edit,
    ShowButton, useRecordContext
} from 'react-admin';
import {Link} from "react-router-dom";
import clsx from "clsx";
import * as React from "react";

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

export const CreatePredefinedMailMonthlyReport = () => {
    const transform = data => ({
        ...data,
        templateCode: 'MONTHLY_DOCUMENTS_REPORT'
    });

    return (
        <Create transform={transform}>
            <SimpleForm>
                <TextInput label="Send To" name="sendTo" source="sendTo" type="email" validate={[required()]} />
                <TextInput label="Copy To" name="copyTo" source="copyTo" type="email" />
                <TextInput label="Subject" name="subject" source="subject" validate={[required()]} />
            </SimpleForm>
        </Create>
    )
}

const CreateReportButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();

    const handleClick = (e) => {
        e.stopPropagation();
        redirect("create", "mail-monthly-reports", undefined, {}, {"predefinedMailMonthlyReportId": record?.id});
    }

    return (
        <Button
            onClick={handleClick}
            label="Create"
        />
    );
};

export const PredefinedMailMonthlyReportEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="Id" name="id" disabled source="id"  />
            <TextInput label="Send To" name="sendTo" source="sendTo" type="email" validate={[required()]} />
            <TextInput label="Copy To" name="copyTo" source="copyTo" type="email" />
            <TextInput name="subject" source="subject" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export const PredefinedMailMonthlyReports = () => (
    <List actions={<ListActions />}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="sendTo" />
            <EmailField source="copyTo" />
            <TextField source="subject" />
            <>
                <EditButton />
                <CreateReportButton />
            </>
        </Datagrid>
    </List>
);