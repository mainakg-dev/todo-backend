import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  create(@Request() req, @Body() body: { title: string }) {
    return this.todosService.create(req.user.userId, body.title);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos based on users' })
  @ApiResponse({ status: 200, description: 'List of todos' })
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ) {
    return this.todosService.update(
      req.user.userId,
      Number(id),
      body.completed,
    );
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.todosService.remove(req.user.userId, Number(id));
  }
}
