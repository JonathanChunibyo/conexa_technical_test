import { Repository, EntityTarget, DataSource, ObjectLiteral } from 'typeorm';

export abstract class BaseRepository<T> {
  private readonly repository: Repository<ObjectLiteral>;

  constructor(
    private readonly entity: EntityTarget<ObjectLiteral>,
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(this.entity);
  }

  async findOne(where: any): Promise<ObjectLiteral | null> {
    return this.repository.findOne({ where });
  }

  async findAll(where: any): Promise<ObjectLiteral[]> {
    return this.repository.find({ where });
  }

  async create(data: Partial<ObjectLiteral>): Promise<ObjectLiteral> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(where: any, data: Partial<ObjectLiteral>): Promise<void> {
    await this.repository.update(where, data);
  }

  async delete(where: any): Promise<void> {
    await this.repository.delete(where);
  }
}
