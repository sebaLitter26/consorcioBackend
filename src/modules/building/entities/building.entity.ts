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
} from 'typeorm';
import { RoleEntity } from '../../../roles/entities/role.entity';
import { StatusEntity } from '../../../status/entities/status.entity';
import { FileEntity } from '../../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { Appartment } from 'src/modules/appartment/entities/appartment.entity';

@Entity({ name: 'building' })
export class Building extends EntityHelper {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Index()
  @Column({ nullable: true })
  address?: string | null;

  @OneToMany(() => Appartment, (appartmens: Appartment) => appartmens.building) //  @JoinTable()    appartmens: Promise<Appartmen[]>  lazyLoad
  appartments: Appartment[];

  @ManyToOne(() => FileEntity, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  photo?: FileEntity[] | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  status?: StatusEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
