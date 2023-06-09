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
import { StatusEntity } from '../../../status/entities/status.entity';
import { FileEntity } from '../../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { Building } from 'src/modules/building/entities/building.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';

@Entity({ name: 'appartment' })
export class Appartment extends EntityHelper {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @ManyToOne((type) => Building, (buiding: Building) => buiding.appartments, {
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  building?: Building | null;

  @ManyToOne((type) => Tenant, (tenant: Tenant) => tenant.appartments, {
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  tenant?: Tenant | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
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
