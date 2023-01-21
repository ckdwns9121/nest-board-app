/**
 * DTO 파일 작성
 * 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을
 * 이용할 때 더 유용합니다. 그래서 클래스를 사용해 DTO를 작성하는 것을 권장합니다.
 */

import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
