import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Controller('filme')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Get()
  findAll() {
    return this.filmeService.findAll();
  }

}
