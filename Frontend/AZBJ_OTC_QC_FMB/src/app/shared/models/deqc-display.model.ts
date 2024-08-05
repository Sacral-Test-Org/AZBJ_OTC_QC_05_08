export class DeqcDisplay {
  applicationNumber: string;
  applicationStatus: string;
  receiptNumber: string;
  receiptDate: string;
  laName: string;
  phName: string;
  changeDescription: string;
  proposalNumber: string;
  partnerName: string;
  documentStatus: string;
  pendingDocs: string;
  checkbox: boolean;

  constructor(
    applicationNumber: string,
    applicationStatus: string,
    receiptNumber: string,
    receiptDate: string,
    laName: string,
    phName: string,
    changeDescription: string,
    proposalNumber: string,
    partnerName: string,
    documentStatus: string,
    pendingDocs: string,
    checkbox: boolean
  ) {
    this.applicationNumber = applicationNumber;
    this.applicationStatus = applicationStatus;
    this.receiptNumber = receiptNumber;
    this.receiptDate = receiptDate;
    this.laName = laName;
    this.phName = phName;
    this.changeDescription = changeDescription;
    this.proposalNumber = proposalNumber;
    this.partnerName = partnerName;
    this.documentStatus = documentStatus;
    this.pendingDocs = pendingDocs;
    this.checkbox = checkbox;
  }
}