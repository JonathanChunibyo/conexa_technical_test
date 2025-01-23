import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../repositories/user.repository';
import { UserCreatedEvent } from '../../events/user-created.event';
import { UserEntity } from '../../entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus
) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const user = await this.userRepository.create(command);
    this.eventBus.publish(new UserCreatedEvent(user.id, user.email));
    return user;
  }
}