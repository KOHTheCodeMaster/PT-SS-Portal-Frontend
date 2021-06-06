export class Production {

    supervisorName;
    nameOfReporter;
    Shift;
    Date;
    cardNumber;
    coilNumber;
    weight;
    size;
    startTime;
    endTime;
    totalTime;
    prodAmount1stClass;
    prodAmount2ndClass;
    notes;

    //  productionId, supervisorName, nameOfReporter, Shift, Date, cardNumber, coilNumber, weight
    //  size, startTime, endTime, totalTime, prodAmount1stClass, prodAmount2ndClass, notes

    constructor(supervisorName, nameOfReporter, Shift, Date, cardNumber, coilNumber, weight,
                size, startTime, endTime, totalTime, prodAmount1stClass, prodAmount2ndClass, notes) {

        this._supervisorName = supervisorName;
        this._nameOfReporter = nameOfReporter;
        this._Shift = Shift;
        this._Date = Date;

        this._cardNumber = cardNumber;
        this._coilNumber = coilNumber;
        this._weight = weight;
        this._size = size;

        this._startTime = startTime;
        this._endTime = endTime;
        this._totalTime = totalTime;
        this._prodAmount1stClass = prodAmount1stClass;
        this._prodAmount2ndClass = prodAmount2ndClass;

        this._notes = notes;

    }


    get productionId() {
        return this._productionId;
    }

    set productionId(value) {
        this._productionId = value;
    }

    get supervisorName() {
        return this._supervisorName;
    }

    set supervisorName(value) {
        this._supervisorName = value;
    }

    get nameOfReporter() {
        return this._nameOfReporter;
    }

    set nameOfReporter(value) {
        this._nameOfReporter = value;
    }

    get Shift() {
        return this._Shift;
    }

    set Shift(value) {
        this._Shift = value;
    }

    get Date() {
        return this._Date;
    }

    set Date(value) {
        this._Date = value;
    }

    get cardNumber() {
        return this._cardNumber;
    }

    set cardNumber(value) {
        this._cardNumber = value;
    }

    get coilNumber() {
        return this._coilNumber;
    }

    set coilNumber(value) {
        this._coilNumber = value;
    }

    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get startTime() {
        return this._startTime;
    }

    set startTime(value) {
        this._startTime = value;
    }

    get endTime() {
        return this._endTime;
    }

    set endTime(value) {
        this._endTime = value;
    }

    get totalTime() {
        return this._totalTime;
    }

    set totalTime(value) {
        this._totalTime = value;
    }

    get prodAmount1stClass() {
        return this._prodAmount1stClass;
    }

    set prodAmount1stClass(value) {
        this._prodAmount1stClass = value;
    }

    get prodAmount2ndClass() {
        return this._prodAmount2ndClass;
    }

    set prodAmount2ndClass(value) {
        this._prodAmount2ndClass = value;
    }

    get notes() {
        return this._notes;
    }

    set notes(value) {
        this._notes = value;
    }
}

