/* eslint-disable camelcase */
import { Schema, model } from 'mongoose';
import {
  TCompany,
  TCompanyAddress,
  TCompanyData,
  TDirectorData,
  TDirectorRole,
  TMasterData,
} from './company.interface';

const companyAddressSchema = new Schema<TCompanyAddress>({
  streetAddress: { type: String, required: true },
  streetAddress2: { type: String, required: true },
  streetAddress3: String,
  streetAddress4: String,
  addressType: { type: String, required: true },
  locality: String,
  district: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  officeType: String,
  activeStatus: String,
  establishmentDate: String,
});

const directorRoleSchema = new Schema<TDirectorRole>({
  userName: { type: String, required: true },
  companyId: { type: String, required: true },
  middleName: String,
  firstName: { type: String, required: true },
  cessationDate: String,
  educationalQualification: String,
  birthPlace: String,
  drivingLicenseNumber: String,
  mobileNumber: String,
  directorDeathDate: String,
  fathersFirstName: String,
  membershipNumber: String,
  roleLICValue: String,
  contributionForm: String,
  bodyCorpOutsideIndiaName: String,
  profitSharingPercentage: String,
  nationality: String,
  gender: String,
  roleEffectiveDate: String,
  occupationType: String,
  bodyCorporateType: String,
  din: String,
  isDisqualified: String,
  ucin: String,
  role: String,
  bodyCorpInsideIndiaName: String,
  kmpFlag: String,
  othersEducationalQualification: String,
  companyName: String,
  cin: String,
  opcFlag: String,
  fathersLastName: String,
  dob: String,
  approverId: String,
  fathersMiddleName: String,
  pan: String,
  monetaryContributionValue: String,
  oidFlag: String,
  authorizationStatus: String,
  passportNumber: String,
  residentOfIndia: String,
  userId: String,
  directorFlag: String,
  emailAddress: String,
  shareholdingPercentage: String,
  personType: String,
  areaOfOccupation: String,
  lastName: String,
  citizenOfIndia: String,
  occupation: String,
  opcType: String,
  otherOccupation: String,
  designation: String,
  signatoryAssociationStatus: String,
  currentDesignationDate: String,
});

const companyDataSchema = new Schema<TCompanyData>({
  CIN: { type: String },
  company: { type: String },
  companyType: { type: String },
  companyOrigin: { type: String },
  registrationNumber: { type: String },
  dateOfIncorporation: { type: String },
  emailAddress: { type: String },
  whetherListedOrNot: { type: String },
  companyCategory: { type: String },
  companySubcategory: { type: String },
  classOfCompany: { type: String },
  authorisedCapital: { type: String },
  paidUpCapital: { type: String },
  numberOfMembers: { type: String },
  dateOfLastAGM: { type: String },
  strikeOff_amalgamated_transferredDate: { type: String },
  llpStatus: { type: String },
  statusUnderCIRP: { type: String },
  numberOfPartners: { type: String },
  numberOfDesignatedPartners: { type: String },
  previousFirm_companyDetails: { type: String },
  totalObligationOfContribution: { type: String },
  mainDivision: { type: String },
  mainDivisionDescription: { type: String },
  statementDate: { type: String },
  BSDefaulter2Yrs: { type: String },
  BSDefaulter3Yrs: { type: String },
  ARDefaulter2Yrs: { type: String },
  ARDefaulter3Yrs: { type: String },
  suspendedAtStockExchange: { type: String },
  MCAMDSCompanyAddress: [companyAddressSchema],
  rocName: { type: String },
  shareCapitalFlag: { type: String },
  maximumNumberOfMembers: { type: String },
  subscribedCapital: { type: String },
  rdName: { type: String },
  rdRegion: { type: String },
  balanceSheetDate: { type: String },
  inc22Aflag: { type: String },
});

const directorDataSchema = new Schema<TDirectorData>({
  DIN: {
    type: String,
    required: true,
  },
  PAN: {
    type: String,
    required: true,
  },
  dateOfAppointment: {
    type: String,
    required: true,
  },
  DirectorDisqualified: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  MiddleName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  MCAUserRole: [directorRoleSchema],
  contactAddress: [companyAddressSchema],
});

const masterDataSchema = new Schema<TMasterData>({
  companyData: companyDataSchema,
  directorData: [directorDataSchema],
});

const companySchema = new Schema<TCompany>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  masterData: masterDataSchema,
  md_data: {
    type: Boolean,
    required: true,
  },
});

export const CompanyModel = model<TCompany>('filesure_db', companySchema, 'filesure_db');
