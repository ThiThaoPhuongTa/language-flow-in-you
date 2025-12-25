import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string; // The TypeScript type is correctly 'string'

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
  created_at: Date;
}