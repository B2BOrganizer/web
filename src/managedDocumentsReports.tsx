import {
    Create,
    Datagrid,
    DateField,
    List,
    NumberField,
    NumberInput,
    required,
    SimpleForm,
    TextField,
    TopToolbar,
    SelectField,
    SelectInput,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    Pagination,
    BooleanField,
    DeleteWithConfirmButton,
    ListButton
} from 'react-admin';
import moment from 'moment';
import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PreviewButton from "./PreviewButton";

const ManagedDocumentsReportShowActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

export const ManagedDocumentsReportShow = () => {
    const ManagedDocumentsReportItemsPagination = () => <Pagination rowsPerPageOptions={[25, 50, 100]} />;

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [slides, setSlides] = React.useState<{ src: string }[]>([]);

    const handlePreview = (previews: any[]) => {
        const newSlides = previews.map(item => ({
            src: `data:${item}`
        }));
        setSlides(newSlides);
        setPreviewOpen(true);
    }

    return (
        <>
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
                            <>
                                <PreviewButton source="managedDocumentPreviews" onPreview={handlePreview} managedDocumentRecordIdentifier="managedDocumentId" />
                            </>
                        </Datagrid>
                    </ReferenceManyField>
                </SimpleShowLayout>
            </Show>
            <Lightbox
                open={previewOpen}
                close={() => setPreviewOpen(false)}
                slides={slides}
                carousel={{
                    finite: true
                }}
            />
        </>
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