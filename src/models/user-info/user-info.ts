export class UserInfo {

    constructor(
        public fullname: string,
        public email: string,
        public phone: string,
        public homeaddress: string,
        public officeaddress?: string,
        public otheraddress?: string

      ) {  }
}