export class ControlModel {
  opusDate: string;
  vUser: string;
  productId: number;
  contractId: number;
  addressEdited: string;
  pcFirstName: string;
  pcMiddleName: string;
  pcLastName: string;
  panStatus: string;
  panCardVerification: string;
  phNoPanLov: string[];
  panCard: string;
  ipPh: string[];
  phNoPanCard: boolean;
  rrbBankAccount: boolean;
  pcDob: string;
  panCardStatus: string; // New property for PAN card verification status
  panCardNotAvailable: boolean; // New property for PAN card availability
  panCardOptions: string; // New property for PAN card options
  panCardNumber: string; // New property for PAN card number
  relatedNameFields: string[]; // New property for related name fields
  partnerTypes: PartnerType[]; // New property for Partner Type dropdown list
  ph_part_id: string; // New property for ph_part_id
  PAN_CARD: string; // New property for PAN_CARD
  PH_NAME: string; // New property for PH_NAME
  ph_dob: string; // New property for ph_dob
  firstName: string; // New property for first name
  middleName: string; // New property for middle name
  surname: string; // New property for surname
  dob: Date; // New property for date of birth
  previousPolicyDetails: string; // New property for previous policy details
  validationResult: ValidationResult; // New property for validation result

  constructor(
    opusDate: string,
    vUser: string,
    productId: number,
    contractId: number,
    addressEdited: string,
    pcFirstName: string,
    pcMiddleName: string,
    pcLastName: string,
    panStatus: string,
    panCardVerification: string,
    phNoPanLov: string[],
    panCard: string,
    ipPh: string[],
    phNoPanCard: boolean,
    rrbBankAccount: boolean,
    pcDob: string,
    panCardStatus: string, // New parameter for constructor
    panCardNotAvailable: boolean, // New parameter for constructor
    panCardOptions: string, // New parameter for constructor
    panCardNumber: string, // New parameter for constructor
    relatedNameFields: string[], // New parameter for constructor
    partnerTypes: PartnerType[], // New parameter for constructor
    ph_part_id: string, // New parameter for constructor
    PAN_CARD: string, // New parameter for constructor
    PH_NAME: string, // New parameter for constructor
    ph_dob: string, // New parameter for constructor
    firstName: string, // New parameter for constructor
    middleName: string, // New parameter for constructor
    surname: string, // New parameter for constructor
    dob: Date, // New parameter for constructor
    previousPolicyDetails: string, // New parameter for constructor
    validationResult: ValidationResult // New parameter for constructor
  ) {
    this.opusDate = opusDate;
    this.vUser = vUser;
    this.productId = productId;
    this.contractId = contractId;
    this.addressEdited = addressEdited;
    this.pcFirstName = pcFirstName;
    this.pcMiddleName = pcMiddleName;
    this.pcLastName = pcLastName;
    this.panStatus = panStatus;
    this.panCardVerification = panCardVerification;
    this.phNoPanLov = phNoPanLov;
    this.panCard = panCard;
    this.ipPh = ipPh;
    this.phNoPanCard = phNoPanCard;
    this.rrbBankAccount = rrbBankAccount;
    this.pcDob = pcDob;
    this.panCardStatus = panCardStatus; // Initialize new property
    this.panCardNotAvailable = panCardNotAvailable; // Initialize new property
    this.panCardOptions = panCardOptions; // Initialize new property
    this.panCardNumber = panCardNumber; // Initialize new property
    this.relatedNameFields = relatedNameFields; // Initialize new property
    this.partnerTypes = partnerTypes; // Initialize new property
    this.ph_part_id = ph_part_id; // Initialize new property
    this.PAN_CARD = PAN_CARD; // Initialize new property
    this.PH_NAME = PH_NAME; // Initialize new property
    this.ph_dob = ph_dob; // Initialize new property
    this.firstName = firstName; // Initialize new property
    this.middleName = middleName; // Initialize new property
    this.surname = surname; // Initialize new property
    this.dob = dob; // Initialize new property
    this.previousPolicyDetails = previousPolicyDetails; // Initialize new property
    this.validationResult = validationResult; // Initialize new property
  }
}

export class PartnerType {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class ValidationResult {
  isValid: boolean;
  message: string;

  constructor(isValid: boolean, message: string) {
    this.isValid = isValid;
    this.message = message;
  }
}