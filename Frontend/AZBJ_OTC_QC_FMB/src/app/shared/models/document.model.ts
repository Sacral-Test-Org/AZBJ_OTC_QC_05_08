export class Document {
  documentName: string;
  docReceived: boolean;
  documentType: string;
  amlDocumentType: string;
  proofType: string;
  requestCode: string;

  constructor(
    documentName: string,
    docReceived: boolean,
    documentType: string,
    amlDocumentType: string,
    proofType: string,
    requestCode: string
  ) {
    this.documentName = documentName;
    this.docReceived = docReceived;
    this.documentType = documentType;
    this.amlDocumentType = amlDocumentType;
    this.proofType = proofType;
    this.requestCode = requestCode;
  }
}

export class DocumentStatus {
  id: number;
  status: string;

  constructor(id: number, status: string) {
    this.id = id;
    this.status = status;
  }
}