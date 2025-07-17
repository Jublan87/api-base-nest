export abstract class BaseEntity {
  protected constructor(
    protected readonly _id: string,
    protected readonly _createdAt: Date,
    protected _updatedAt: Date
  ) {}

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected updateTimestamp(): void {
    this._updatedAt = new Date();
  }
}
