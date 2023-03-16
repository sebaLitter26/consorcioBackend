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
import { Role } from '../../../roles/entities/role.entity';
import { Status } from '../../../statuses/entities/status.entity';
import { FileEntity } from '../../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
//import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
//import { Exclude, Expose } from 'class-transformer';
import { Appartment } from 'src/modules/appartment/entities/appartment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Tenant extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Appartment, (appartmens:Appartment) => appartmens.tenant)   //  @JoinTable()    appartmens: Promise<Appartmen[]>  lazyLoad
  appartments: Appartment[]

  @OneToOne(() => User, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  user: User

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
