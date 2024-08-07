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
      select:['userId', 'userName', 'userLastName','userEmail','userPassword', 'image', 'user_role']
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        userId: id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        userId: id
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }
}
