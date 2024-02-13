import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    NumberField,
    TopToolbar,
    ReferenceField,
    ReferenceOneField, EditButton, Edit, SimpleForm, TextInput, NumberInput, required, FilterButton, SearchInput
} from 'react-admin';

export const ManagedDocumentEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput name="id" disabled label="Id" source="id" />
            <TextInput name="fileName" disabled label="File name" source="managedFile.fileName" />
            <ReferenceField label="Subject" reference="mail-messages" source="mailMessageId">
                <TextInput name="subject" disabled source="subject" />
            </ReferenceField>
            <NumberInput name="assignedToYear" label="Year" source="assignedToYear" validate={required()} />
            <NumberInput name="assignedToMonth" label="Month" source="assignedToMonth" validate={required()} />
        </SimpleForm>
    </Edit>
);

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
    </TopToolbar>
);

const postFilters = [
    <NumberInput name="assignedToYear" label="Year" source="assignedToYear" />,
    <NumberInput name="assignedToMonth" label="Month" source="assignedToMonth" />,
];


export const ManagedDocumentsList = () => (
    <List actions={<ListActions/>} filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField label="File name" source="managedFile.fileName" />
            <ReferenceField label="Subject" reference="mail-messages" source="mailMessageId">
                <TextField source="subject" />
            </ReferenceField>
            <DateField source="sent" />
            <DateField source="received" />
            <NumberField label="Year" source="assignedToYear" />
            <NumberField label="Month" source="assignedToMonth" />
            <>
                <EditButton />
            </>
        </Datagrid>
    </List>
);