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
    EditButton,
    Edit,
    ListButton,
    ShowButton, ChipField,
    SelectField,
    SelectInput, DeleteWithConfirmButton
} from 'react-admin';
import * as React from "react";

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

export const CreateRequiredDocument = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" validate={[required()]} />
                <SelectInput source="interval" validate={[required()]} choices={[
                    { id: 'MONTHLY', name: 'Monthly' },
                ]} />
            </SimpleForm>
        </Create>
    )
}

const RequiredDocumentEditActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

export const EditRequiredDocument = () => (
    <Edit actions={<RequiredDocumentEditActions />}>
        <SimpleForm>
            <TextInput disabled source="id"  />
            <TextInput source="name" validate={[required()]} />
            <SelectInput source="interval" validate={[required()]} choices={[
                { id: 'MONTHLY', name: 'Monthly' },
            ]} />
        </SimpleForm>
    </Edit>
);

export const RequiredDocuments = () => (
    <List actions={<ListActions />}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="name" />
            <SelectField source="interval" choices={[
                { id: 'MONTHLY', name: 'Monthly' },
            ]} />
            <>
                <EditButton />
                <DeleteWithConfirmButton />
            </>
        </Datagrid>
    </List>
);