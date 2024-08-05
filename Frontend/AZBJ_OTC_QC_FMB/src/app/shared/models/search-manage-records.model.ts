export interface SearchCriteria {
  startDate: string; // format: dd/mm/yyyy
  endDate: string; // format: dd/mm/yyyy
  applicationNumber: string;
  partnerType: string;
  status: string;
  reasonLink?: string; // Optional field for reason link
}

export interface SearchResults {
  records: Record[];
}

export interface Record {
  id: number;
  applicationNumber: string;
  partnerType: string;
  status: string;
  startDate: string; // format: dd/mm/yyyy
  endDate: string; // format: dd/mm/yyyy
  rejectionReason?: string;
  reasonLink?: string; // Optional field for reason link
}

export class SearchManageRecords {
  fromDate: string; // format: dd/mm/yyyy
  toDate: string; // format: dd/mm/yyyy
  reasonLink?: string; // Optional field for reason link
  status?: string; // Optional field for status
  applicationNumber: string;
  permReceiptNo: string;
  proposalNo: string;
  proposalStatus: string;
  productId: number;
  scrutinyCount: number;
  qcRightsCount: number;
  eventNo: number;
  comments: string;
  contractId: string;
  commentCount: number;
  ch: string; // Field for 'ch'

  constructor(
    fromDate: string,
    toDate: string,
    applicationNumber: string,
    permReceiptNo: string,
    proposalNo: string,
    proposalStatus: string,
    productId: number,
    scrutinyCount: number,
    qcRightsCount: number,
    eventNo: number,
    comments: string,
    contractId: string,
    commentCount: number,
    ch: string, // Field for 'ch'
    reasonLink?: string,
    status?: string
  ) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.applicationNumber = applicationNumber;
    this.permReceiptNo = permReceiptNo;
    this.proposalNo = proposalNo;
    this.proposalStatus = proposalStatus;
    this.productId = productId;
    this.scrutinyCount = scrutinyCount;
    this.qcRightsCount = qcRightsCount;
    this.eventNo = eventNo;
    this.comments = comments;
    this.contractId = contractId;
    this.commentCount = commentCount;
    this.ch = ch;
    this.reasonLink = reasonLink;
    this.status = status;
  }
}
