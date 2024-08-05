export class ImageDetails {
  imagePath: string;
  proposalNumber: string;
  imageName: string;

  constructor(
    imagePath: string,
    proposalNumber: string,
    imageName: string
  ) {
    this.imagePath = imagePath;
    this.proposalNumber = proposalNumber;
    this.imageName = imageName;
  }
}