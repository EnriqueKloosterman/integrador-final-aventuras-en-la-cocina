import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../common/enums/role.enum';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockUser = {
    userId: '1',
    userName: 'John',
    userLastName: 'Doe',
    userEmail: 'john.doe@example.com',
    userPassword: 'hashedpassword',
    image: 'image-url',
    user_role: Role.USER,
  };

  const mockCloudinaryResponse: CloudinaryResponse = {
    url: 'http://example.com/image.jpg',
    secure_url: 'https://example.com/image.jpg',
    message: 'Mock message',
    name: 'Mock name',
    http_code: 200,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            handleUpload: jest.fn().mockResolvedValue(mockCloudinaryResponse),
            login: jest.fn().mockResolvedValue({ token: 'test-token', ...mockUser }),
            profile: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and register a user', async () => {
      const createAuthDto: CreateAuthDto = {
        userName: 'John',
        userLastName: 'Doe',
        userEmail: 'john.doe@example.com',
        userPassword: 'password123',
        image: 'image-url', // Asegúrate de incluir la propiedad `image`
      };

      const image: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from(''),
        destination: '',
        filename: '',
        path: '',
        stream: null,
      };

      const result = await controller.uploadFile(image, createAuthDto);
      expect(service.handleUpload).toHaveBeenCalledWith(image, createAuthDto);
      expect(result).toEqual(mockCloudinaryResponse.url);
    });

    it('should throw an error if image or user data is missing', async () => {
      await expect(controller.uploadFile(null, null)).rejects.toThrow(
        new HttpException('Image and User data required', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto: LoginDto = {
        userEmail: 'john.doe@example.com',
        userPassword: 'password123',
      };

      const result = await controller.login(loginDto);
      expect(service.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual({ token: 'test-token', ...mockUser });
    });
  });

  describe('profile', () => {
    it('should return the user profile', async () => {
      const result = await controller.profile(mockUser);
      expect(service.profile).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateAuthDto: UpdateAuthDto = { userName: 'Updated Name' };
      const result = await controller.update('1', updateAuthDto);
      expect(service.update).toHaveBeenCalledWith(1, updateAuthDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
