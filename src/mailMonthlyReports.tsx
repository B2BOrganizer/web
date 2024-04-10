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
    TopToolbar
} from 'react-admin';
import * as React from "react";

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const postFilters = [
    <NumberInput name="assignedToYear" label="Year" source="assignedToYear" />,
    <NumberInput name="assignedToMonth" label="Month" source="assignedToMonth" />,
];


export const CreateMailMonthlyReport = () => {
    const transform = data => ({
        ...data,
       templateCode: 'MONTHLY_DOCUMENTS_REPORT'
    });

    return (
        <Create transform={transform}>
            <SimpleForm>
                <TextInput name="sendTo" source="sendTo" type="email" validate={[required()]} />
                <TextInput name="copyTo" source="copyTo" type="email" />
                <TextInput name="subject" source="subject" validate={[required()]} />
                <NumberInput name="month" source="month" validate={[required()]} />
                <NumberInput name="year" source="year" validate={[required()]} />
            </SimpleForm>
        </Create>
    )
}

export const MailMonthlyReports = () => (
    <List actions={<ListActions />} filters={postFilters} perPage={100}>
        <Datagrid>
            <TextField source="id" />
            <ChipField source="status" />
            <DateField source="created" />
            <DateField source="sent" />
            <EmailField source="sendTo" />
            <TextField source="subject" />
            <NumberField source="month" />
            <NumberField source="year" />
        </Datagrid>
    </List>
);