export class Role {
    id: number;
    name: any;
    description: string;
    status: String;

    constructor(id: number, name: any, description: string, status: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }
}