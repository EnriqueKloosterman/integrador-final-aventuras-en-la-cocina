import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}
  async register(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['userId', 'userName', 'userLastName', 'userEmail', 'image']
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where:{
        userEmail: email
      }});
  }


  async findEmailWithPassword(userEmail: string){
    return await this.userRepository.findOne({
      where:{
        userEmail: userEmail
      },
      select:['userId', 'userName', 'userLastName','userEmail','userPassword']
    });
  }

  async profile(user): Promise<User>{
    return await this.userRepository.findOne({
      where:{
        userId: user.userId
      },
      select:['userId', 'userName', 'userLastName','userEmail', 'image']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
