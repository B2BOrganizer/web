import {
    BooleanField,
    Button,
    Datagrid,
    DateField,
    DateInput,
    DeleteWithConfirmButton,
    Edit,
    EditButton,
    FilterButton,
    List,
    NumberField,
    NumberInput,
    Pagination,
    ReferenceArrayInput,
    ReferenceField,
    ReferenceInput,
    required,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar
} from 'react-admin';

export const ManagedDocumentEdit = () => {
    const transform = data => ({
        ...data,
        requiredDocumentSelectionType: 'MANUAL'
    });

    return (
        <Edit transform={transform}>
            <SimpleForm>
                <TextInput name="id" disabled label="Id" source="id"  />
                <TextInput name="fileName" disabled label="File name" source="managedFile.fileName" />
                <ReferenceField label="Subject" reference="mail-messages" source="mailMessageId">
                    <TextInput name="subject" disabled source="subject" />
                </ReferenceField>
                <DateInput name="sent" disabled label="Sent" source="sent" validate={required()} />
                <DateInput name="received" disabled label="Received" source="received" validate={required()} />
                <NumberInput name="assignedToYear" label="Year" source="assignedToYear" validate={required()} />
                <NumberInput name="assignedToMonth" label="Month" source="assignedToMonth" validate={required()} />
                <TextInput name="comment" label="Comment" source="comment" />
                <ReferenceInput source="requiredDocumentId" reference="required-documents" />
            </SimpleForm>
        </Edit>
    )
}

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <Button  />
    </TopToolbar>
);

const postFilters = [
    <NumberInput name="assignedToYear" label="Year" source="assignedToYear" />,
    <NumberInput name="assignedToMonth" label="Month" source="assignedToMonth" />,
];

const ManagedDocumentsPagination = () => <Pagination rowsPerPageOptions={[25, 50, 100]} />;

export const ManagedDocumentsList = () => (
    <List actions={<ListActions />} filters={postFilters}  pagination={<ManagedDocumentsPagination />} perPage={100}>
        <Datagrid>
            <TextField source="managedFile.fileName" label="File name" />
            <ReferenceField label="Subject" reference="mail-messages" source="mailMessageId">
                <TextField source="subject" />
            </ReferenceField>
            <DateField source="sent" />
            <DateField source="received" />
            <NumberField label="Year" source="assignedToYear" />
            <NumberField label="Month" source="assignedToMonth" />
            <BooleanField source="commented" />
            <ReferenceField source="requiredDocumentId" reference="required-documents" />
            <>
                <EditButton />
                <DeleteWithConfirmButton  />
            </>
        </Datagrid>
    </List>
);