import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RoleEntity } from '../../../roles/entities/role.entity';
import { StatusEntity } from '../../../status/entities/status.entity';
import { FileEntity } from '../../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { Appartment } from 'src/modules/appartment/entities/appartment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'owner' })
export class Owner extends EntityHelper {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @OneToOne(() => Appartment, {
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  appartment: Appartment;

  @OneToOne(() => User, {
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => FileEntity, {
    createForeignKeyConstraints: false,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  status?: StatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
