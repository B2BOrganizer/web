import {
    BooleanField,
    Button,
    Datagrid,
    DateField,
    DateInput,
    DeleteWithConfirmButton,
    Edit,
    EditButton, FilterButton,
    List,
    ListButton,
    NumberField,
    NumberInput,
    Pagination,
    PrevNextButtons,
    ReferenceField,
    ReferenceInput,
    required, SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar, useEditContext, useShowContext
} from 'react-admin';
import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PreviewLightbox from "./PreviewLightbox";
import PreviewButton from "./PreviewButton";

const ManagedDocumentShowActions = () => (
    <TopToolbar>
        <PrevNextButtons linkType="show" />
        <ListButton />
        <EditButton />
    </TopToolbar>
);

const ManagedDocumentShowLayout = () => {
    const { record } = useShowContext();

    return (
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="managedFile.fileName" />
            <ReferenceField reference="mail-messages" source="mailMessageId">
                <TextField source="subject" />
            </ReferenceField>
            <DateField source="sent" />
            <DateField source="received" />
            <NumberField source="assignedToYear" />
            <NumberField source="assignedToMonth" />
            <TextField source="comment" />
            <ReferenceField source="requiredDocumentId" reference="required-documents" />
            <PreviewLightbox id={record.id} />
        </SimpleShowLayout>
    )
}

export const ManagedDocumentShow = () => {

    return (
        <Show actions={<ManagedDocumentShowActions />}>
            <ManagedDocumentShowLayout />
        </Show>
    )
}

const ManagedDocumentEditForm = () => {
    const { record } = useEditContext();

    return (
        <SimpleForm>
            <TextInput disabled source="id"  />
            <TextInput disabled source="managedFile.fileName" />
            <ReferenceInput reference="mail-messages" source="mailMessageId">
                <SelectInput disabled optionText="subject" />
            </ReferenceInput>
            <DateInput disabled source="sent" validate={required()} />
            <DateInput disabled source="received" validate={required()} />
            <NumberInput source="assignedToYear" validate={required()} />
            <NumberInput source="assignedToMonth" validate={required()} />
            <TextInput source="comment" />
            <ReferenceInput source="requiredDocumentId" reference="required-documents" />
            <PreviewLightbox id={record.id} />
        </SimpleForm>
    )
}

export const ManagedDocumentEdit = () => {
    const transform = data => ({
        ...data,
        requiredDocumentSelectionType: 'MANUAL'
    });

    return (
        <Edit redirect={false} transform={transform} actions={
            <TopToolbar>
                <PrevNextButtons />
                <ShowButton />
                <ListButton />
            </TopToolbar>
        }>
            <ManagedDocumentEditForm />
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



export const ManagedDocumentsList = () => {
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
            <List actions={<ListActions />} filters={postFilters}  pagination={<ManagedDocumentsPagination />} perPage={100}>
                <Datagrid>
                    <TextField source="managedFile.fileName" label="File name" />
                    <ReferenceField label="Subject" reference="mail-messages" source="mailMessageId">
                        <TextField source="subject" />
                    </ReferenceField>
                    <DateField source="received" />
                    <NumberField label="Year" source="assignedToYear" />
                    <NumberField label="Month" source="assignedToMonth" />
                    <BooleanField source="commented" />
                    <ReferenceField label="Required" source="requiredDocumentId" reference="required-documents" />
                    <>
                        <PreviewButton source="managedDocumentPreviews" onPreview={handlePreview} />
                        <ShowButton />
                        <EditButton />
                        <DeleteWithConfirmButton  />
                    </>
                </Datagrid>
            </List>
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