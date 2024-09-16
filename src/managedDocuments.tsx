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
    ListButton,
    NumberField,
    NumberInput,
    Pagination,
    PrevNextButtons,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar,
    useEditContext,
    useShowContext
} from 'react-admin';
import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {PreviewField} from "./PreviewField";

const ManagedDocumentShowActions = () => (
    <TopToolbar>
        <PrevNextButtons linkType="show" />
        <ListButton />
    </TopToolbar>
);

const ManagedDocumentShowLayout = () => {
    const [previewOpen, setPreviewOpen] = React.useState(false);

    const { record } = useShowContext();

    const slides = record.managedFilePreviews?.map(item => ({
        src: `data:image/jpeg;base64,${item.contentInBase64}`
    }));

    return (
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="fileName" />
            <TextField source="subject" />
            <DateField source="sent" />
            <DateField source="received" />
            <NumberField source="assignedToYear" />
            <NumberField source="assignedToMonth" />
            <TextField source="comment" />
            <ReferenceField source="requiredDocumentId" reference="required-documents" />
            <Button type="button" onClick={() => {setPreviewOpen(true)}}>Preview</Button>

            <Lightbox
                open={previewOpen}
                close={() => setPreviewOpen(false)}
                slides={slides}
            />
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

    const [previewOpen, setPreviewOpen] = React.useState(false);

    const slides = record.managedFilePreviews?.map(item => ({
        src: `data:image/jpeg;base64,${item.contentInBase64}`
    }));

    return (
        <SimpleForm>
            <TextInput disabled label="Id" source="id"  />
            <TextInput disabled label="File name" source="managedFile.fileName" />
            <ReferenceInput reference="mail-messages" source="mailMessageId">
                <SelectInput disabled optionText="subject" />
            </ReferenceInput>
            <DateInput disabled label="Sent" source="sent" validate={required()} />
            <DateInput disabled label="Received" source="received" validate={required()} />
            <NumberInput label="Year" source="assignedToYear" validate={required()} />
            <NumberInput label="Month" source="assignedToMonth" validate={required()} />
            <TextInput label="Comment" source="comment" />
            <ReferenceInput source="requiredDocumentId" reference="required-documents" />
            <Button label="Preview" type="button" onClick={() => {setPreviewOpen(true)}} />

            <Lightbox
                open={previewOpen}
                close={() => setPreviewOpen(false)}
                slides={slides}
            />
        </SimpleForm>
    )
}

export const ManagedDocumentEdit = () => {
    const transform = data => ({
        ...data,
        requiredDocumentSelectionType: 'MANUAL'
    });

    return (
        <Edit transform={transform} actions={
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
    const [slides, setSlides] = React.useState([]);

    const handlePreview = (previews) => {
        const newSlides = previews.map(item => ({
            src: `data:image/jpeg;base64,${item.contentInBase64}`
        }));
        setSlides(newSlides);
        setPreviewOpen(true);
    };

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
                        <PreviewField source="managedFilePreviews" onPreview={handlePreview} />
                        <>
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
                />
        </>

    )
}