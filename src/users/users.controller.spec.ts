import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    userId: 1,
    userName: 'John',
    userLastName: 'Doe',
    userEmail: 'john.doe@example.com',
    image: 'image_url',
    user_role: 'USER',
  };

  const mockUsersService = {
    register: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 1) return Promise.resolve(mockUser);
      throw new NotFoundException(`User with ID ${id} not found`);
    }),
    update: jest.fn().mockImplementation((id: number, updateUserDto: UpdateUserDto) => {
      if (id === 1) {
        return Promise.resolve({ ...mockUser, ...updateUserDto });
      }
      throw new NotFoundException(`User with ID ${id} not found`);
    }),
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password',
        image: 'image_url',
      };

      await expect(controller.register(createUserDto)).resolves.toEqual({
        message: 'User registered successfully',
        user: mockUser,
      });
      expect(service.register).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle error on registration', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password',
        image: 'image_url',
      };

      jest.spyOn(service, 'register').mockRejectedValueOnce(new Error('Failed to register user'));
      
      await expect(controller.register(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle error on findAll', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Error finding users'));
      await expect(controller.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      await expect(controller.findOne('1')).resolves.toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should handle error on findOne', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException('User not found'));
      await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        userName: 'Jane',
      };

      await expect(controller.update('1', updateUserDto)).resolves.toEqual({
        message: 'User with ID 1 updated successfully',
        user: { ...mockUser, ...updateUserDto },
      });
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should handle error on update', async () => {
      const updateUserDto: UpdateUserDto = {
        userName: 'Jane',
      };

      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException('User not found'));
      await expect(controller.update('2', updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      await expect(controller.remove('1')).resolves.toEqual({ message: 'User with ID 1 deleted successfully' });
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should handle error on remove', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException('User not found'));
      await expect(controller.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
});
