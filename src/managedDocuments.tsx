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
    ReferenceField,
    required,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar
} from 'react-admin';
import {Document, pdfjs} from "react-pdf";
import * as React from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

export const ManagedDocumentEdit = () => (
    <Edit>
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
        </SimpleForm>
    </Edit>
);

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
            <>
                <EditButton />
                <DeleteWithConfirmButton  />
            </>
        </Datagrid>
    </List>
);