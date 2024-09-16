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
    DeleteButton,
} from 'react-admin';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import {useState} from "react";

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

const postFilters = [
    <NumberInput label="Year" source="year" />,
    <NumberInput label="Month" source="month" />,
];

const CreateToolbar = () => {
    return (
        <Toolbar>
            <SaveButton alwaysEnable />
        </Toolbar>
    )
}

export const CreateMailMonthlyReport = () => {
    const transform = data => ({
        ...data,
       templateCode: 'MONTHLY_DOCUMENTS_REPORT'
    });

    const { predefinedMailMonthlyReportId } = useLocation().state || undefined;

    const { data: predefinedMailMonthlyReport } = useGetOne('predefined-mail-monthly-reports', { id: predefinedMailMonthlyReportId }, { enabled: !!predefinedMailMonthlyReportId } );

    return (
        <Create transform={transform}>
            <SimpleForm toolbar={<CreateToolbar />}>
                <TextInput name="sendTo" source="sendTo" type="email" validate={[required()]} defaultValue={predefinedMailMonthlyReport?.sendTo} />
                <TextInput name="copyTo" source="copyTo" type="email" defaultValue={predefinedMailMonthlyReport?.copyTo} />
                <TextInput name="subject" source="subject" validate={[required()]} defaultValue={predefinedMailMonthlyReport?.subjectParsed} />
                <NumberInput name="month" source="month" validate={[required()]} defaultValue={moment().subtract(1, 'months').month() + 1}  />
                <NumberInput name="year" source="year" validate={[required()]} defaultValue={moment().subtract(1, 'months').year()} />
            </SimpleForm>
        </Create>
    )
}

export const MailMonthlyReports = () => {
    return (
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
    )
}