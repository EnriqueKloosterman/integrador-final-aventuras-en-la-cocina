import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enums/role.enum';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    userId: '1',
    userName: 'John',
    userLastName: 'Doe',
    userEmail: 'john.doe@example.com',
    image: 'image_url',
    user_role: Role.USER,
  };

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    register: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(undefined),
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

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle error on findAll', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('Error finding users'));
      await expect(controller.findAll()).rejects.toThrow('Error finding users');
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      await expect(controller.findOne('1')).resolves.toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should handle error on findOne', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('User not found'));
      await expect(controller.findOne('1')).rejects.toThrow('User not found');
    });
  });

  describe('register', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password',
        image: 'image_url',
      };

      await expect(controller.register(createUserDto)).resolves.toEqual(mockUser);
      expect(service.register).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle error on register', async () => {
      jest.spyOn(service, 'register').mockRejectedValueOnce(new Error('Error creating user'));
      const createUserDto: CreateUserDto = {
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password',
        image: 'image_url',
      };

      await expect(controller.register(createUserDto)).rejects.toThrow('Error creating user');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        userName: 'Jane',
      };

      await expect(controller.update('1', updateUserDto)).resolves.toEqual(mockUser);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should handle error on update', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Error updating user'));
      const updateUserDto: UpdateUserDto = {
        userName: 'Jane',
      };

      await expect(controller.update('1', updateUserDto)).rejects.toThrow('Error updating user');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      await expect(controller.remove('1')).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should handle error on remove', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('Error removing user'));
      await expect(controller.remove('1')).rejects.toThrow('Error removing user');
    });
  });
});
