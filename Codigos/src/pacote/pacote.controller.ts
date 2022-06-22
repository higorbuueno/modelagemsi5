import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacoteService } from './pacote.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';

@Controller('pacote')
export class PacoteController {
  constructor(private readonly pacoteService: PacoteService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacoteService.findOne(+id);
  }
}
