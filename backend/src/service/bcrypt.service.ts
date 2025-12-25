import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    // Placeholder for hashing logic
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePasswords(plainText: string, hashed: string): Promise<boolean> {
    // Placeholder for comparison logic
    return await bcrypt.compare(plainText, hashed);
  }
}