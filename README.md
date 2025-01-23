# Base Nest back-end project

API project that serves as API for the business model of the Base Nest project.


## Table of Contents

1. [Requirements](#requirements)
   1. [Description](#description)
2. [Nest project life cycle](#nest-project-life-cycle)
3. [Commands](#commands)
    1. [Guard](#guard)


## Requirements

- If you do not yet have the Nest CLI installed, you can do so by running:

```bash
npm i -g @nestjs/cli
```

- Install the project dependencies with the following command line (*inside the src/src folder*):

```bash
npm install
```

- To start the project, in the package.json file check in the scripts section the command that starts the server in development mode:

```bash
npm run start:dev
```

## Description

- nodemon: This tool will watch the files in the directory and if it detects changes it will automatically restart the application.

- --watch src: It monitors changes to the files inside the src folder, allowing you to test, restart the server or automatically recompile the code when there are modifications to the source files.

- --ext ts: This tool is used to include and consider files with the .ts (TypeScript) extension during the execution of specific processes, such as code analysis or compilation.

- --exec ts-node: Indicates that files should be executed using ts-node, allowing you to work directly with TypeScript code. It is an interpreter that allows TypeScript code to be executed without the need to compile it to JavaScript beforehand.

- -r tsconfig-paths/register: ensures that the aliases configured in tsconfig.json work correctly at runtime.

- src/main.ts: The main input file for running the application written in TypeScript. This file is the starting point for the backend application, where the server is usually initialized, routes are configured or general configuration of the application is performed.

## Nest project life cycle

The life cycle takes place from the moment the application is started until the node process is finished. This is divided into three phases: initialization, execution and termination.

- NestFactory.create(AppModule): Running the npm run start:dev command initializes the project with NestFactory.create(AppModule). AppModule is a module in NestJS and is the entry point where all the other modules, drivers, providers and configurations that the application needs are configured.

- new ValidationPipe: validates incoming requests according to validation rules (defined with class-validator in the NestJS DTOs). This ensures that only valid data reaches the controllers.

- await app.listen(process.env.PORT ?? 3000): Asynchronous function that starts the server trying to obtain the port number initially from the environment variables and in case it does not find the defined port it will use the indicated port (3000) as default value.

Once the server is listening it starts handling incoming requests, routing through the corresponding controllers and services, responding to them and keeping the server running until it receives a shutdown signal.

## Commands

## Guard

Allows to control access to routes or endpoints of your application. Guards are executed before a request to a given route is processed and can allow or deny access.

```bash
nest g guard auth --no-spec
```
@Injectable(): This decorator tells the framework that this class can be instantiated and managed by the NestJS dependency container allowing it to be injected into other classes that need it as a dependency.

AuthGuard: It is executed before the controllers or route handlers are invoked by checking whether the request includes the necessary information (such as a JWT token in the headers or a valid session) thus allowing or denying access.

canActivate: It is the core of the guard and is executed every time a client attempts to access a protected path. This is where the conditional logic will be implemented to allow or deny access.

```bash
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```