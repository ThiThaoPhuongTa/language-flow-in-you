import { Repository } from 'typeorm/repository/Repository.js';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }
}