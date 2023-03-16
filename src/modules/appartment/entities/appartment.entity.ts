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
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../../roles/entities/role.entity';
import { Status } from '../../../statuses/entities/status.entity';
import { FileEntity } from '../../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { Building } from 'src/modules/building/entities/building.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';

@Entity()
export class Appartment extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Building, (buiding:Building) => buiding.appartments, {
    eager: true,
    cascade: true
  })
  building?: Building | null;

  @ManyToOne(type => Tenant, (tenant:Tenant) => tenant.appartments, {
    eager: true,
    cascade: true
  })
  tenant?: Tenant | null;

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
