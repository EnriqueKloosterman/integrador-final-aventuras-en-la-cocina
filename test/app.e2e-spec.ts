import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { CreateAuthDto } from '../src/auth/dto/create-auth.dto';
import { LoginDto } from '../src/auth/dto/login.dto';
import { UpdateAuthDto } from '../src/auth/dto/update-auth.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const authService = { 
    handleUpload: jest.fn().mockResolvedValue({ url: 'http://example.com/image.jpg' }), 
    login: jest.fn().mockResolvedValue({ accessToken: 'fakeToken' }),
    profile: jest.fn().mockImplementation((user) => Promise.resolve({ user })),
    findOne: jest.fn().mockImplementation((id) => Promise.resolve({ id, name: 'Test User' })),
    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/auth/register (POST) should register a user', () => {
    const createAuthDto: CreateAuthDto = {
      userName: 'John',
      userLastName: 'Doe',
      userEmail: 'john.doe@example.com',
      userPassword: 'password123',
      image: 'image.jpg',
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .attach('image', Buffer.from('test-image-content'), { filename: 'test-image.jpg', contentType: 'image/jpeg' })
      .field('userName', createAuthDto.userName)
      .field('userLastName', createAuthDto.userLastName)
      .field('userEmail', createAuthDto.userEmail)
      .field('userPassword', createAuthDto.userPassword)
      .expect(201)
      .expect({ url: 'http://example.com/image.jpg' })
  });

  it('/auth/login (POST) should log in a user', () => {
    const loginDto: LoginDto = { userEmail: 'test@example.com', userPassword: 'password' };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201)
      .expect({ accessToken: 'fakeToken' });
  });

  it('/auth/profile (GET) should get user profile', () => {
    const user = { id: '1', userName: 'Test User', userLastName: 'User Test', userEmail: 'user@mail.com', image: 'http://example.com/image.jpg' };

    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer fakeToken')
      .expect(200)
      .expect({ user });
  });

  it('/auth/:id (GET) should get a user by id', () => {
    const user = { id: 1, name: 'Test User' };

    return request(app.getHttpServer())
      .get('/auth/1')
      .expect(200)
      .expect(user);
  });

  it('/auth/:id (PATCH) should update a user by id', () => {
    const updateAuthDto: UpdateAuthDto = { userName: 'Updated User' };

    return request(app.getHttpServer())
      .patch('/auth/1')
      .send(updateAuthDto)
      .expect(200)
      .expect({ id: 1, ...updateAuthDto });
  });

  it('/auth/:id (DELETE) should delete a user by id', () => {
    return request(app.getHttpServer())
      .delete('/auth/1')
      .expect(200)
      .expect('true');
  });

  afterAll(async () => {
    await app.close();
  });
});
