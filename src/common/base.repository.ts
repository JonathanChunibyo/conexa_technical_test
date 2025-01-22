import { Repository, EntityTarget, DataSource, ObjectLiteral, FindOptionsWhere, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<
    T extends ObjectLiteral, 
    C extends DeepPartial<T>, 
    U extends FindOptionsWhere<T>
   > {
    
  private readonly repository: Repository<T>;

  constructor(
    private readonly entity: EntityTarget<T>,
    private readonly dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(this.entity);
  }

  async findOne(where: U): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async findAll(where: U): Promise<T[]> {
    return this.repository.find({ where });
  }

  async create(data: C): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(where: U, data: QueryDeepPartialEntity<T>): Promise<void> {
    await this.repository.update(where, data);
  }

  async delete(where: U): Promise<void> {
    await this.repository.delete(where);
  }
}
