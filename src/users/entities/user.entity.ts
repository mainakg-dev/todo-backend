import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  createdAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
