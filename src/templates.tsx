import {
    ChipField,
    Datagrid,
    List,
    TextField,
    ReferenceArrayField,
    ArrayField,
    SingleFieldList
} from 'react-admin';
import { Stack } from '@mui/material';

// const PostPanel = () => {
//     const record = useRecordContext();
//
//     return (
//         <List>
//             <Datagrid>
//                 <TextField source="id" />
//             </Datagrid>
//         </List>
//         <div dangerouslySetInnerHTML={{ __html: record?.variables }} />
    // );
// };
export const Templates = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ChipField source="code" />
            <TextField source="name" />
            <ChipField source="templateType" />
            <TextField source="path" />
            <TextField source="contentType" />
            <ArrayField source="variables">
                <SingleFieldList linkType={false}>
                    <ChipField source="name" size="small" />
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);