export class CreateUserCommand {
    constructor(
        public readonly name: string,
        public readonly nickName: string,
        public readonly email: string,
        public readonly password: string
      ) {}
}
