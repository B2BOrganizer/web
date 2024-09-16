import {Admin, Resource,} from "react-admin";
import {dataProvider} from "./dataProvider";
import authProvider from './authProvider';
import {ManagedDocumentEdit, ManagedDocumentShow, ManagedDocumentsList} from "./managedDocuments";
import {CreateMailMonthlyReport, MailMonthlyReports} from "./mailMonthlyReports";
import {Templates} from "./templates";
import {
    CreatePredefinedMailMonthlyReport,
    PredefinedMailMonthlyReportEdit,
    PredefinedMailMonthlyReports,
} from "./predefinedMailMonthlyReports";
import {
    CreateRequiredDocument,
    EditRequiredDocument,
    RequiredDocuments
} from "./requiredDocuments";
import {
    ManagedDocumentsReportCreate,
    ManagedDocumentsReports,
    ManagedDocumentsReportShow
} from "./managedDocumentsReports";

export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="managed-documents" list={ManagedDocumentsList} edit={ManagedDocumentEdit} show={ManagedDocumentShow} />
      <Resource name="mail-monthly-reports" list={MailMonthlyReports} create={CreateMailMonthlyReport} />
      <Resource name="predefined-mail-monthly-reports" list={PredefinedMailMonthlyReports} create={CreatePredefinedMailMonthlyReport} edit={PredefinedMailMonthlyReportEdit} />
      <Resource name="templates" list={Templates} />
      <Resource name="required-documents" list={RequiredDocuments} create={CreateRequiredDocument} edit={EditRequiredDocument} />
      <Resource name="managed-documents-reports" list={ManagedDocumentsReports} create={ManagedDocumentsReportCreate} show={ManagedDocumentsReportShow} />
    </Admin>
);
