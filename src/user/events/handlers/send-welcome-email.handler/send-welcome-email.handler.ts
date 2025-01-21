import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../user-created.event/user-created.event';

@EventsHandler(UserCreatedEvent)
export class SendWelcomeEmailHandler implements IEventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent): Promise<void> {
    console.log(`Enviando correo de bienvenida a: ${event.email}`);
    // TODO: Implementar lógica para enviar el correo electrónico
  }
}
