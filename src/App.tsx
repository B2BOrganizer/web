import {Admin, Resource,} from "react-admin";
import {dataProvider} from "./dataProvider";
import authProvider from './authProvider';
import {ManagedDocumentEdit, ManagedDocumentsList} from "./managedDocuments";
import {CreateMailMonthlyReport, MailMonthlyReports} from "./mailMonthlyReports";

export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="managed-documents" list={ManagedDocumentsList} edit={ManagedDocumentEdit} />
      <Resource name="mail-monthly-reports" list={MailMonthlyReports} create={CreateMailMonthlyReport} />
    </Admin>
);
