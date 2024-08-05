export interface ProposalDetails {
  proposalNumber: string;
  lifeAssuredName: string;
  applicationNumber: string;
  policyHolderName: string;
  comments: string;
  referToSupervisor: 'Y' | 'N';
  otherParams: object;
}