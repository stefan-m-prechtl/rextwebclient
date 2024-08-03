export default class Project {
    constructor(json) {
        this.data = json;
    }

    get id()
    {
        return this.data.id;
    }

    get name()
    {
        return this.data.name;
    }

    set name(value)
    {
        this.data.name = value;
    }
}