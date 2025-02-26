import { Repository, EntityTarget, DataSource, ObjectLiteral, FindOptionsWhere, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<
    T extends ObjectLiteral, 
    C extends DeepPartial<T>, 
    U extends FindOptionsWhere<T>,
    G extends FindOptionsWhere<T>
   > {
    
  private readonly repository: Repository<T>;

  constructor(
    private readonly entity: EntityTarget<T>,
    private readonly dataSource: DataSource
  ) {
    this.repository = this.dataSource.getRepository(this.entity);
  }

  deleteSensitiveData<T extends Record<string, any>>(data: T): Partial<T> {
    if (!data || typeof data !== 'object') return data;
  
    const sensitiveKeys = ['password', 'isState', 'createdAt', 'updatedAt'];
    const cleanedData = { ...data };
  
    sensitiveKeys.forEach((key) => {
      if (key in cleanedData) {
        delete cleanedData[key];
      }
    });
  
    return cleanedData;
  }
  

  find() {
    return this.repository.createQueryBuilder();
  }

  async findById(where: U): Promise<T | null> {
    return await this.repository.findOne({ where });
  }

  async findAll(where: G): Promise<T[]> {
    return await this.repository.find({ where });
  }

  async create(data: C): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async updateById(where: U, data: QueryDeepPartialEntity<T>): Promise<void> {
    await this.repository.update(where, data);
  }

  async deleteById(where: U): Promise<void> {
    await this.repository.delete(where);
  }

  async delete(where: G): Promise<void> {
    await this.repository.delete(where);
  }
}
