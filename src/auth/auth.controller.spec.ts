import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            handleUpload: jest.fn().mockResolvedValue({ url: 'https://example.com/image.jpg' }),
            register: jest.fn().mockResolvedValue({} as CreateAuthDto),
            login: jest.fn().mockResolvedValue({ token: 'mock-jwt-token' }),
            profile: jest.fn().mockResolvedValue({}),
            findAll: jest.fn(),
            findOne: jest.fn().mockResolvedValue({} as any).mockRejectedValue(new NotFoundException()),
            update: jest.fn().mockResolvedValue({} as UpdateAuthDto),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and create a user', async () => {
      const dto: CreateAuthDto = {
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password123',
        image: 'profile.jpg',
      };

      const mockImage = { buffer: Buffer.from('fake-image-data') };

      const result = await controller.uploadFile(mockImage as any, dto);

      expect(result).toBe('https://example.com/image.jpg');
    });

    it('should throw an error if image or user data is missing', async () => {
      const mockImage = { buffer: Buffer.from('fake-image-data') };

      await expect(controller.uploadFile(null as any, null)).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should return a JWT token on successful login', async () => {
      const loginDto: LoginDto = {
        userEmail: 'john.doe@example.com',
        userPassword: 'password123',
      };

      const result = await controller.login(loginDto);

      expect(result.token).toBe('mock-jwt-token');
    });

    it('should throw an error if login fails', async () => {
      const loginDto: LoginDto = {
        userEmail: 'john.doe@example.com',
        userPassword: 'wrongpassword',
      };

      jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException());

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('profile', () => {
    it('should return user profile data', async () => {
      const mockUser = {
        userId: '1',
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        image: 'profile.jpg',
      };

      const result = await controller.profile({ userEmail: 'john.doe@example.com', user_role: Role.USER });

      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return user data by ID', async () => {
      const mockUser = {
        userId: '1',
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        image: 'profile.jpg',
      };

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if user not found', async () => {
      jest.spyOn(authService, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update user data', async () => {
      const updateDto: UpdateAuthDto = {
        userName: 'Jane',
      };

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await controller.remove('1');

      expect(result).toBeUndefined();
    });
  });
});
