import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorEntity } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { Repository } from 'typeorm';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<ActorEntity[]> {
    return this.actorRepository.find({
        select:{
            name: true,
        }
    });
  }

  async findById(id: string): Promise<ActorEntity>{
    const actor = await this.actorRepository.findOneBy({id});
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    return actor;
  }

  async create(dto: CreateActorDto): Promise<ActorEntity> {
    const { name } = dto;
    const actor = this.actorRepository.create({ name });
    return this.actorRepository.save(actor);
  }

  async update(id: string, dto: UpdateActorDto): Promise<ActorEntity> {
    const actor = await this.actorRepository.findOneBy({ id });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    Object.assign(actor, dto);
    return this.actorRepository.save(actor);
  }
}
