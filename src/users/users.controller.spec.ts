import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('debería obtener todos los usuarios', async () => {
    const users: User[] = [
      {
        userId: 1,
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password123',
        image: 'image.jpg',
      },
      {
        userId: 2,
        userName: 'Jane',
        userLastName: 'Doe',
        userEmail: 'jane.doe@example.com',
        userPassword: 'password123',
        image: 'image.jpg',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(users);

    const result = await controller.findAll();
    expect(result).toEqual(users);
  });

  it('debería actualizar un usuario existente', async () => {
    const userId = 1;
    const updateUser: UpdateUserDto = {
      userName: 'usuarioActualizado',
      userPassword: 'newpassword123',
      userEmail: 'usuarioactualizado@example.com',
      userLastName: 'Usuario Actualizado',
      image: 'imagen-actualizada.jpg'
    };
    const updatedUser: User = {
      userId: 1,
      ...updateUser
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedUser);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await controller.update(userId.toString(), updateUser, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  it('debería manejar el error al intentar actualizar un usuario', async () => {
    const updateUser: UpdateUserDto = {
      userName: 'usuarioActualizado',
      userPassword: 'newpassword123',
      userEmail: 'usuarioactualizado@example.com',
      userLastName: 'Usuario Actualizado',
      image: 'imagen-actualizada.jpg'
    };

    jest.spyOn(service, 'update').mockRejectedValue(new Error('usuario no encontrado'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await controller.update('1', updateUser, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'usuario no encontrado' });
  });

  it('debería eliminar un usuario existente', async () => {
    const userId = 1;
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await controller.remove(userId.toString(), res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado exitosamente' });
  });

  it('debería manejar el error al intentar eliminar un usuario', async () => {
    const userId = 'invalid_id';
    jest.spyOn(service, 'remove').mockRejectedValue(new Error('Error al eliminar el usuario'));
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await controller.remove(userId, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar el usuario' });
  });
});
