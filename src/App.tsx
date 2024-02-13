import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser, Layout,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import authProvider from './authProvider';
import {ManagedDocumentEdit, ManagedDocumentsList} from "./managedDocuments";

export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="managed-documents" list={ManagedDocumentsList} edit={ManagedDocumentEdit} />
    </Admin>
);
