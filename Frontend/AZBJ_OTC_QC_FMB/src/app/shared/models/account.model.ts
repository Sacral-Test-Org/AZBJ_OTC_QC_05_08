export class AccountDetails {
  policyReference: string;
  contractId: string;
  partnerId: string;
  accountNumber: string;
  branch: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
  payeeRelation: string;
  micr: string;
  timestamp: Date;
  userId: string;
  paymentMode: string;
  accountTppRelation: string;
  rrbBankAccount: string;
  relationshipWithPolicyProposer: string;

  constructor(
    policyReference: string,
    contractId: string,
    partnerId: string,
    accountNumber: string,
    branch: string,
    ifscCode: string,
    accountHolderName: string,
    bankName: string,
    payeeRelation: string,
    micr: string,
    timestamp: Date,
    userId: string,
    paymentMode: string,
    accountTppRelation: string,
    rrbBankAccount: string,
    relationshipWithPolicyProposer: string
  ) {
    this.policyReference = policyReference;
    this.contractId = contractId;
    this.partnerId = partnerId;
    this.accountNumber = accountNumber;
    this.branch = branch;
    this.ifscCode = ifscCode;
    this.accountHolderName = accountHolderName;
    this.bankName = bankName;
    this.payeeRelation = payeeRelation;
    this.micr = micr;
    this.timestamp = timestamp;
    this.userId = userId;
    this.paymentMode = paymentMode;
    this.accountTppRelation = accountTppRelation;
    this.rrbBankAccount = rrbBankAccount;
    this.relationshipWithPolicyProposer = relationshipWithPolicyProposer;
  }
}

export class BankDetails {
  bankIfsc: string;
  bankName: string;
  bankBranch: string;
  bankMicr: string;

  constructor(bankIfsc: string, bankName: string, bankBranch: string, bankMicr: string) {
    this.bankIfsc = bankIfsc;
    this.bankName = bankName;
    this.bankBranch = bankBranch;
    this.bankMicr = bankMicr;
  }
}
