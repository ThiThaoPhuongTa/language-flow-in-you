import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id!: string; // The TypeScript type is correctly 'string'

  @Column({ unique: true })
  google_id!: string

  @Column({ unique: true })
  email!: string

  @Column()
  name!: string | null

  @Column({ type: "text", nullable: true })
  avatar_url?: string | null

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  
  created_at!: Date;
}