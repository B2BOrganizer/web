import {
    ChipField,
    Create,
    CreateButton,
    Datagrid,
    DateField,
    EmailField,
    FilterButton,
    List,
    NumberField,
    NumberInput,
    required,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar,
    useGetOne,
    SaveButton,
    Toolbar,
    DeleteButton, SelectField, SelectInput,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    SingleFieldList, Pagination, BooleanField, DeleteWithConfirmButton, ShowButton, ListButton,
} from 'react-admin';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import {useState} from "react";
import * as React from "react";

// const ListActions = () => (
//     <TopToolbar>
//         <FilterButton />
//         <CreateButton />
//     </TopToolbar>
// );

// const postFilters = [
//     <NumberInput name="assignedToYear" label="Year" source="assignedToYear" />,
//     <NumberInput name="assignedToMonth" label="Month" source="assignedToMonth" />,
// ];

// const CreateToolbar = () => {
//     return (
//         <Toolbar>
//             <SaveButton alwaysEnable />
//         </Toolbar>
//     )
// }

const ManagedDocumentsReportShowActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

export const ManagedDocumentsReportShow = () => {
    const ManagedDocumentsReportItemsPagination = () => <Pagination rowsPerPageOptions={[25, 50, 100]} />;

    return (
        <Show actions={<ManagedDocumentsReportShowActions />}>
            <SimpleShowLayout>
                <TextField source="id" />
                <SelectField source="interval" choices={[
                    { id: 'MONTHLY', name: 'Monthly' },
                ]} />
                <NumberField source="month" />
                <NumberField source="year" />
                <ReferenceManyField label="Documents" reference="managed-documents-report-items" target="managedDocumentsReportId" pagination={<ManagedDocumentsReportItemsPagination />}>
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="requiredDocumentName" />
                        <BooleanField source="requiredDocumentFound" />
                        <DateField source="managedDocumentReceived" />
                        <TextField source="managedDocumentFileName" />
                    </Datagrid>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    )
}

export const ManagedDocumentsReportCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <SelectInput source="interval" choices={[
                    { id: 'MONTHLY', name: 'Monthly' },
                ]} />
                <NumberInput name="month" source="month" validate={[required()]} defaultValue={moment().month() + 1}  />
                <NumberInput name="year" source="year" validate={[required()]} defaultValue={moment().year()} />
            </SimpleForm>
        </Create>
    )
}

export const ManagedDocumentsReports = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="id" />
                <SelectField source="interval" choices={[
                    { id: 'MONTHLY', name: 'Monthly' },
                ]} />
                <NumberField source="month" />
                <NumberField source="year" />
                <>
                    <DeleteWithConfirmButton />
                </>
            </Datagrid>
        </List>
    )
}