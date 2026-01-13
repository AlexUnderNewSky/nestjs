import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('all')
  findAll(){
    return this.actorService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string){
    return this.actorService.findById(id);
  }
  
  @Post('create')
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: CreateActorDto) {
    return this.actorService.update(id, dto);
  }
}
