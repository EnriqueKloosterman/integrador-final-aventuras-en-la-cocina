import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { User } from 'src/users/entities/user.entity';
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
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if(error) return reject (error);
          if(result && result.url){
            console.log('image uploaded succesfully. URL: ', result.url);
            this.register(createAuthDto.userName, createAuthDto.userLastName, createAuthDto.userEmail, createAuthDto.userPassword, result.url)
            .then(() => {
              resolve(result)
            })
            .catch((error) => {
              reject(error)
            })
          } else {
            console.error('image upload failed. Error: ', error);
            reject(new Error('image upload failed'));
          }
        }
      )
      uploadStream.on('finish', () => { /**/ });
      uploadStream.end(image.buffer)
    })
  }


  async register(userName: string, userLastName: string, userEmail: string, userPassword: string, imageUrl: string) {
    const user = await this.usersService.findOneByEmail(userEmail);
    if(user){
      throw new BadRequestException('Email already in database')
    }

    const newUser = new User()
    newUser.userName = userName;
    newUser.userLastName = userLastName;
    newUser.userEmail = userEmail;
    newUser.userPassword = await bcryptjs.hash(userPassword, 10);
    newUser.image = imageUrl;

    try {
      await this.usersService.register(newUser);
    } catch (error) {
      throw new Error('user creation failed');
      
    }
    return {
      userName,
      userLastName,
      userEmail,
      imageUrl
    }
  }

  async login({userEmail, userPassword}: LoginDto){
    const user = await this.usersService.findOneByEmail(userEmail);
    if(!user){
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcryptjs.compare(userPassword, user.userPassword);
    if(!isPasswordValid){
      throw new BadRequestException('Invalid password');
    }
    const payload = {
      userName: user.userName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      image: user.image,
      role: user.user_role
    }
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      userName: user.userName,
      userLastName: user.userLastName,
      image: user.image,
      userEmail: user.userEmail,
    }
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
