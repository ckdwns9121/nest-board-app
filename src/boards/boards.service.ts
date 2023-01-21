import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getBoards(): Promise<Board[]> {
    const boards = await this.boardRepository.find();
    return boards;
  }
  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id: id });
    if (!board) {
      throw new NotFoundException(`Can not found board id: ${id}`);
    }
    return board;
  }

  async createBoard(createBoardDtd: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDtd;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can not found board id: ${id}`);
    }
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
