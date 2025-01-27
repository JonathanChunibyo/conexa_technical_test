 <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 📌 Documentación del proyecto con Arquitectura Clean

## 📖 Introducción
Este documento describe la arquitectura utilizada en el proyecto, basada en **Clean Architecture**, una estructura modular y escalable que facilita la separación de responsabilidades y el mantenimiento del código.

## 🧐 ¿Por qué se utilizó Clean Architecture?
La arquitectura Clean permite:
- **Separar responsabilidades**: Cada capa tiene una función específica (dominio, aplicación, infraestructura y presentación).
- **Escalabilidad**: Facilita la adición de nuevas funcionalidades sin afectar el código existente.
- **Mantenibilidad**: La separación de capas mejora la legibilidad y el mantenimiento del código.
- **Reutilización**: Módulos reutilizables que pueden ser compartidos en diferentes partes de la aplicación.

## 🔍 Ejemplo de Clean Architecture (No relacionado con este proyecto)
Imaginemos una aplicación de gestión de pedidos en un restaurante. Aplicando Clean Architecture, tendríamos:

1. **Dominio**: Entidades como `Order`, `Customer`, `Product`.
2. **Aplicación**: Casos de uso como `CreateOrderUseCase`, `CancelOrderUseCase`.
3. **Infraestructura**: Base de datos, integraciones externas, servicios de correo.
4. **Presentación**: Controladores y APIs expuestos.

Cada una de estas capas es independiente, lo que permite cambiar la base de datos o la interfaz sin afectar la lógica de negocio.

## 🏗️ Estructura del Proyecto

```bash
-src/
    -core/ ## Nucleo del proyecto
        -users/ ## Refencia de un modelo
            -dto/
            -entities/
            -repositories/
            -commands/
            -events/
            -user.module.ts
         -administration-panel/ ## Referencia de una aplicacion de logica
            -dto/
            -controllers/
            -services/
            -guards/
            -middlewares/
            -administration-panel.module.ts
    -common/ ## Entidades y repositorios que hay en comun de todo el proyecto
        -entities/
        -repositories/
    -infrastructure/ ## Conexiones a terceros, base de datos
        -database/
        -documentation/
            -decorators/
            -swagger-responses.ts
            -swagger.ts
    -app.module.ts
    -main.ts
```


## 🚀 Escalabilidad y Solución a Futuro
Esta arquitectura permite el crecimiento del sistema de forma estructurada. Ejemplo:
- Si se añaden **nuevos módulos**, simplemente se replican las carpetas dentro de `core/`.
- Si se agregan **más entidades y servicios**, cada una se encapsula en su propio módulo sin afectar el resto de la aplicación.
- Para manejar **mayor carga y concurrencia**, se pueden desacoplar servicios en microservicios o usar colas de mensajes para eventos asíncronos.

## ✅ Ventajas y Desventajas
### **Ventajas**
✔ Separación clara de responsabilidades.
✔ Código más fácil de probar y mantener.
✔ Modularidad que facilita la escalabilidad.
✔ Adaptabilidad a cambios tecnológicos.

### **Desventajas**
✖ Mayor curva de aprendizaje.
✖ Puede parecer excesivo para proyectos pequeños.
✖ Más archivos y estructura más compleja.

---
## 📌 Conclusión
Esta arquitectura garantiza un desarrollo estructurado, modular y escalable. A largo plazo, permite un mantenimiento eficiente y reduce los costos de evolución del software. 🚀

# 📌 Creación de un Módulo en el Proyecto

## 🏗️ Introducción

Este documento explica cómo crear un módulo en el proyecto siguiendo Clean Architecture, utilizando el CLI de NestJS.

## 🔧 Creación del Módulo

Generar un nuevo módulo con:

```bash
nest generate module core/<nombre-del-modulo>
```

Ejemplo:

```bash
nest generate module core/orders
```

Esto crea:

```bash
-src/
    -core/
        -orders/
            -orders.module.ts
```

## 📂 Estructura del Módulo

```bash
-src/
    -core/orders/
        -dto/
        -entities/
        -repositories/
        -commands/
        -events/
        -controllers/
        -services/
        -orders.module.ts
```

## 📥 Importaciones y 📤 Exportaciones

### **Configuración del Módulo**

```typescript
@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
```

### \*\*Uso en \*\*\`\`

```typescript
import { OrdersModule } from './core/orders/orders.module';

@Module({ imports: [OrdersModule] })
export class AppModule {}
```

## 🚀 Conclusión

La creación de módulos en el proyecto facilita la escalabilidad y mantenibilidad, asegurando una estructura organizada y modular.

# 📌 Documentación de Entidades en el Proyecto

## 🏗️ Introducción

Este documento explica la estructura y creación de entidades en el proyecto, siguiendo Clean Architecture y utilizando `@Entity()` de TypeORM.

## 🔧 Creación de una Entidad

Generar una nueva entidad con:

```bash
nest generate class core/<modulo>/entities/<nombre-de-la-entidad> --no-spec --flat

```

Ejemplo:

```bash
nest generate class core/orders/entities/order --no-spec --flat

NOTA: Se coloca --no-spec al final para que no nos cree el archivo de testing que no necesitaremos y --flat para que solo quede el archivo natural de entity.ts
```

Esto crea:

```bash
-src/
    -core/orders/
        -entities/
            -order.entity.ts

```

## 📂 Estructura de una Entidad

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: string;

  @Column('decimal')
  totalAmount: number;

  @Column()
  status: string;
}
```

## 📥 Importaciones y 📤 Exportaciones

### **Uso en un Repositorio**

```typescript
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(order: Partial<Order>): Promise<Order> {
    return this.repository.save(order);
  }
}
```

### **Uso en un Servicio**

```typescript
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(orderData: Partial<Order>) {
    return this.orderRepository.create(orderData);
  }
}
```

## 🚀 Conclusión

Las entidades en este proyecto utilizan `@Entity()` de TypeORM para definir estructuras de base de datos de manera eficiente y escalable.

# 📌 Documentación de Decoradores en el Proyecto

## 🏗️ Introducción

Este documento explica la estructura y creación de decoradores en el proyecto, siguiendo Clean Architecture y organizándolos en la carpeta `infrastructure/documentation/decorators`.

## 🔧 Creación de un Decorador

Generar un nuevo decorador con:

```bash
nest generate decorator infrastructure/documentation/decorators/<nombre-del-decorador>
```

Ejemplo:

```bash
nest generate decorator infrastructure/documentation/decorators/roles --flat

NOTA: Se coloca --flat al final para que solo quede el archivo natural de decorator.ts.
```

Esto crea:

```bash
-src/
    -infrastructure/
        -documentation/
            -decorators/
                -roles.decorator.ts
```

## 📂 Estructura de un Decorador

Ejemplo de un decorador `@Roles()` para controlar permisos de acceso:

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

## 📥 Importaciones y 📤 Uso de un Decorador

### **Uso en un Controlador**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/infrastructure/documentation/decorators/roles.decorator';
import { RolesGuard } from 'src/infrastructure/guards/roles.guard';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
  @Get()
  @Roles('admin', 'manager')
  findAll() {
    return 'Lista de órdenes';
  }
}
```

## 🚀 Conclusión

Los decoradores personalizados permiten modularidad y reutilización en el proyecto, mejorando la seguridad y organización del código.