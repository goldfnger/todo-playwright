export default class User {
    private firstName: string;
    private lastname: string;
    private email: string;
    private password: string;

    constructor(
        firstName: string,
        lastname: string,
        email: string,
        password: string) {
            this.firstName = firstName;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
        }

        public getFirstName() {
            return this.firstName;
        }

        public getLastName() {
            return this.lastname;
        }

        public getEmail() {
            return this.email;
        }

        public getPassword() {
            return this.password;
        }
}