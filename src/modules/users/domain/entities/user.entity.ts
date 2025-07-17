export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _name: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date
  ) {}

  static create(email: string, name: string): User {
    return new User(crypto.randomUUID(), email, name, new Date(), new Date());
  }

  static fromPrimitives(data: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.createdAt,
      data.updatedAt
    );
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateName(newName: string): void {
    this._updatedAt = new Date();
    // En un caso real, aquí validarías el nombre
  }

  toPrimitives() {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
