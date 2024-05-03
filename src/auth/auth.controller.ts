import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from 'src/constants/file-upload.validator';
import { CONSTANTS } from 'src/constants/constants';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addValidator(
        new CustomUploadFileTypeValidator({
          fileType: CONSTANTS.valid_mime_types
        })
      )
      .addMaxSizeValidator({ maxSize: CONSTANTS.max_bytes_pic_size})
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
    )image: Express.Multer.File,
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<string>{
    if(!image || !createAuthDto){
      throw new HttpException('Imgae and User data required', HttpStatus.BAD_REQUEST)
    }
    try {
      const response: CloudinaryResponse = await this.authService.handleUpload(image, createAuthDto)
      return response.url
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
