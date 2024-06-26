import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { User } from '../users/entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ){}
  async handleUpload(image: Express.Multer.File, createAuthDto: CreateAuthDto): Promise<CloudinaryResponse> {
    try {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            console.error('Image upload failed. Error:', error);
            reject(error);
          } else {
            console.log('Image uploaded successfully. URL:', result.url);
            this.register(createAuthDto.userName, createAuthDto.userLastName, createAuthDto.userEmail, createAuthDto.userPassword, result.url)
              .then(() => resolve(result))
              .catch((error) => reject(error));
          }
        });
        uploadStream.on('finish', () => { /**/ });
        uploadStream.end(image.buffer);
      });
    } catch (error) {
      console.error('Error handling image upload:', error);
      throw new Error('Image upload failed');
    }
  }


  async register(userName: string, userLastName: string, userEmail: string, userPassword: string, imageUrl: string) {
    try {
      const user = await this.usersService.findOneByEmail(userEmail);
      if (user) {
        throw new BadRequestException('Email already exists');
      }
  
      const newUser = new User();
      newUser.userName = userName;
      newUser.userLastName = userLastName;
      newUser.userEmail = userEmail;
      newUser.userPassword = await bcryptjs.hash(userPassword, 10);
      newUser.image = imageUrl;
  
      await this.usersService.register(newUser);
      
      return {
        userName,
        userLastName,
        userEmail,
        imageUrl
      };
    } catch (error) {
      console.error('Error registering user:', error);
      throw new InternalServerErrorException('User registration failed');
    }
  }

  async login({userEmail, userPassword}: LoginDto){
    const user = await this.usersService.findEmailWithPassword(userEmail);
    if(!user){
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcryptjs.compare(userPassword, user.userPassword);
    if(!isPasswordValid){
      throw new BadRequestException('Invalid password');
    }
    const payload = {
      userId: user.userId,
      userName: user.userName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      image: user.image,
      role: user.user_role
    }
    const token = await this.jwtService.signAsync(payload);

    return {
      userId: user.userId,
      token: token,
      userName: user.userName,
      userLastName: user.userLastName,
      image: user.image,
      userEmail: user.userEmail,
    }
  }

  async profile({userEmail, user_role}: {userEmail:string, user_role: string}){
    return await this.usersService.findOneByEmail(userEmail);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
