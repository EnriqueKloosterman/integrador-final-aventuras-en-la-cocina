import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { v2 as cloidinary } from 'cloudinary';
import { IUserActive } from 'src/common/inteface/user-active.interface';
@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  async handleUpload(image: Express.Multer.File, createRecipeDto: CreateRecipeDto, user: any): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uplaodStream = cloidinary.uploader.upload_stream(
        (error, result) => {
          if(error) return reject(error)
          if(result && result.url){
            console.log('image uploaded succesfully. URL: ', result.url);
            this.create(createRecipeDto, user, result.url)
            .then(() =>{
              resolve(result)
            })
            .catch((error) => {
              reject(error)
            })
          } else {
            console.log('image upload failed. Error: ', error);
            reject(new Error('Upload failed'))            
          }
        }
      )
      uplaodStream.on('finish', () => { /**/ });
      uplaodStream.end(image.buffer);
    })
  }

  async create(createRecipeDto: CreateRecipeDto, user: any, imageUrl: string) {
    const recipe = await this.recipeRepository.findOne({
      where: {
        title: createRecipeDto.title
      }
    })
    if(recipe) throw new BadRequestException('Recipe already exists')
    
    const newRecipe = new Recipe()
    newRecipe.title = createRecipeDto.title
    newRecipe.recipe = JSON.stringify(createRecipeDto.recipe)
    newRecipe.ingredients = JSON.stringify(createRecipeDto.ingredients)
    newRecipe.category = await this.categoryRepository.findOne({where: {categoryId: createRecipeDto.categoryId}})
    newRecipe.image = imageUrl
    newRecipe.user = user


    try{
      await this.recipeRepository.save(newRecipe)
    } catch(error){
      console.log(error.message, error);
      
      throw new Error('Recipe not saved')
    }

  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      relations: ['user', 'category']
    })
  }

  async findAllUserRecipes(user:IUserActive): Promise<Recipe[]> {
    const recipes =  await this.recipeRepository.find({
      where: {
        user: {userId: user.userId}
      },
      relations: ['user', 'category']
    })
    try {
      if(!recipes) throw new Error('No recipes found')
      return recipes;
    } catch (error) {
      throw new BadRequestException('Articles not found')
    }
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: {
        recipeId: id
      },
      relations: ['user', 'category']
    })
    try {
      if(!recipe) throw new Error('No recipe found')
      return recipe
    } catch (error) {
      throw new BadRequestException('Recipe not found')
    }
  } 

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.recipeRepository.findOne({
      where: {
        recipeId: id
      }
    });
    try {
      if(!recipe) throw new Error('No recipe found')
        await this.recipeRepository.remove(recipe);
    } catch (error) {
      throw new BadRequestException('Recipe not found')
    }
  }
}
