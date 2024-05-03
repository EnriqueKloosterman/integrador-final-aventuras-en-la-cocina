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

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where:{
        userEmail: email
      }});
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
