export default class SessionDto {
    constructor(session) {
        this.name = session.name;
        this.email = session.email;
        this.role = session.role;
    }

}
