import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { CloudinaryResponse } from 'cloudinary/cloudinary.response';
import { v2 as cloidinary } from 'cloudinary';
import { IUserActive } from '../common/inteface/user-active.interface';
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
  async create(createRecipeDto: CreateRecipeDto, user: any, imageUrl: string): Promise<Recipe> {
    const existingRecipe = await this.recipeRepository.findOne({
      where: { title: createRecipeDto.title }
    });

    if (existingRecipe) {
      throw new BadRequestException('Recipe already exists');
    }

    const newRecipe = new Recipe();
    newRecipe.title = createRecipeDto.title;
    newRecipe.description = createRecipeDto.description;
    newRecipe.instructions = createRecipeDto.instructions;
    newRecipe.ingredients = createRecipeDto.ingredients;
    newRecipe.category = await this.categoryRepository.findOne({
      where: { categoryId: createRecipeDto.categoryId }
    });
    newRecipe.image = imageUrl;
    newRecipe.user = user;

    try {
      await this.recipeRepository.save(newRecipe);
      return newRecipe;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw new BadRequestException('Recipe not saved');
    }
  }

  //! **********************************************
  // async create(createRecipeDto: CreateRecipeDto, user: any, imageUrl: string) {
  //   const recipe = await this.recipeRepository.findOne({
  //     where: {
  //       title: createRecipeDto.title
  //     }
  //   })
  //   if(recipe) throw new BadRequestException('Recipe already exists')
    
  //   const newRecipe = new Recipe()
  //   newRecipe.title = createRecipeDto.title
  //   newRecipe.description = JSON.stringify(createRecipeDto.description)
  //   newRecipe.instructions = JSON.stringify(createRecipeDto.instructions)
  //   newRecipe.ingredients = JSON.stringify(createRecipeDto.ingredients)
  //   newRecipe.category = await this.categoryRepository.findOne({where: {categoryId: createRecipeDto.categoryId}})
  //   newRecipe.image = imageUrl
  //   newRecipe.user = user


  //   try{
  //     await this.recipeRepository.save(newRecipe)
  //   } catch(error){
  //     console.log(error.message, error);
      
  //     throw new Error('Recipe not saved')
  //   }

  // }
  //! **********************************************

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.find({
      relations: ['user', 'category']
    });
    recipes.forEach(recipe => {
      recipe.description = JSON.parse(recipe.description);
      recipe.instructions = JSON.parse(recipe.instructions);
      recipe.ingredients = JSON.parse(recipe.ingredients);
    });
  
    return recipes;
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
        recipes.forEach(recipe => {
          recipe.description = JSON.parse(recipe.description);
          recipe.instructions = JSON.parse(recipe.instructions);
          recipe.ingredients = JSON.parse(recipe.ingredients);
        });
      
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
      recipe.description = JSON.parse(recipe.description);
      recipe.instructions = JSON.parse(recipe.instructions);
      recipe.ingredients = JSON.parse(recipe.ingredients);
      return recipe
    } catch (error) {
      throw new BadRequestException(error.message, 'Recipe not found')
    }
  } 
  //TODO: testear el update
  async update(id: string, user: IUserActive, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: {
        recipeId: id,
        user: { userId: user.userId },
      },
      relations: ['user', 'category'] 
    });
  
    if (!recipe) {
      throw new BadRequestException('Recipe not found');
    }
  
    recipe.title = updateRecipeDto.title;
    // recipe.description = JSON.stringify(updateRecipeDto.description);
    recipe.description = updateRecipeDto.description;
    // recipe.instructions = JSON.stringify(updateRecipeDto.instructions);
    recipe.instructions = updateRecipeDto.instructions;
    // recipe.ingredients = JSON.stringify(updateRecipeDto.ingredients);
    recipe.ingredients = updateRecipeDto.ingredients;
    recipe.category = await this.categoryRepository.findOne({ where: { categoryId: updateRecipeDto.categoryId } });
  
    try {
      await this.recipeRepository.save(recipe);
      return recipe;
    } catch (error) {
      throw new BadRequestException('Failed to update recipe');
    }
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
