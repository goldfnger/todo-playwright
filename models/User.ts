import { faker } from '@faker-js/faker';

export default class User {
    private firstName: string;
    private lastname: string;
    private email: string;
    private password: string;
    private accessToken: string;
    private userID: string;

    constructor() {
            this.firstName = faker.person.firstName();
            this.lastname = faker.person.lastName();
            this.email = faker.internet.email();
            this.password = 'Test1234';
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

        public setAccessToken(accessToken: string) {
            this.accessToken = accessToken;
        }

        public getAccessToken() {
            return this.accessToken;
        }

        public setUserID(userID: string) {
            this.userID = userID;
        }
        
        public getUserID() {
            return this.userID;
        }

}