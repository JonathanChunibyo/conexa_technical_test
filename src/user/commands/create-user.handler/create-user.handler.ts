import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command/create-user.command';
import { UserRepository } from '../../repositories/user.repository/user.repository';
import { UserCreatedEvent } from 'src/user/events/user-created.event/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus
) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { name, email } = command;
    const user = await this.userRepository.create({ name, email });
    this.eventBus.publish(new UserCreatedEvent(user.id, email));
  }
}