export class Application {
  applicationNumber: string;
  proposalNumber: string;
  userDetails: string;
  kycFlag: string;
  eKycFlag: string;
  sisoFlag: string;
  enachSource: string;
  channelName: string;
  accountType: string;
  trlScore: string;
  incomeEst: string;
  cibilScore: string;
  comments: string;
  v_tele_video_check: string;

  constructor(
    applicationNumber: string = '',
    proposalNumber: string = '',
    userDetails: string = '',
    kycFlag: string = '',
    eKycFlag: string = '',
    sisoFlag: string = '',
    enachSource: string = '',
    channelName: string = '',
    accountType: string = '',
    trlScore: string = '',
    incomeEst: string = '',
    cibilScore: string = '',
    comments: string = '',
    v_tele_video_check: string = ''
  ) {
    this.applicationNumber = applicationNumber;
    this.proposalNumber = proposalNumber;
    this.userDetails = userDetails;
    this.kycFlag = kycFlag;
    this.eKycFlag = eKycFlag;
    this.sisoFlag = sisoFlag;
    this.enachSource = enachSource;
    this.channelName = channelName;
    this.accountType = accountType;
    this.trlScore = trlScore;
    this.incomeEst = incomeEst;
    this.cibilScore = cibilScore;
    this.comments = comments;
    this.v_tele_video_check = v_tele_video_check;
  }

  getTeleVideoCheck(): string {
    return this.v_tele_video_check;
  }
}