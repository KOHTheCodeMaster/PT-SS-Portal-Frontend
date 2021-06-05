export class User {

    constructor(userId, name, userRole, emailId, phoneNumber, address, picId) {
        this._userId = userId;
        this._name = name;
        this._userRole = userRole;
        this._emailId = emailId;
        this._phoneNumber = phoneNumber;
        this._address = address;
        this._picId = picId;
    }

    constructor(userJson) {
        this._userId = userJson.userId;
        this._name = userJson.name;
        this._userRole = userJson.userRole;
        this._emailId = userJson.emailId;
        this._phoneNumber = userJson.phoneNumber;
        this._address = userJson.address;
        this._picId = userJson.picId;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get userRole() {
        return this._userRole;
    }

    set userRole(value) {
        this._userRole = value;
    }

    get emailId() {
        return this._emailId;
    }

    set emailId(value) {
        this._emailId = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(value) {
        this._phoneNumber = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get picId() {
        return this._picId;
    }

    set picId(value) {
        this._picId = value;
    }
}

