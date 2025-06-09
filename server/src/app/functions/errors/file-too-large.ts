export class FileTooLarge extends Error {
  constructor() {
    super('The file is too large. Maximum file size is 5MB.')
    this.name = 'FileTooLarge'
  }
}
