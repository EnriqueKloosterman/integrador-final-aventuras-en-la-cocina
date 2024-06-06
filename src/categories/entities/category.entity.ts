import { Recipe } from "../../recipes/entities/recipe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({type: 'varchar', length: 50, nullable: false })
    category: string;

    @OneToMany(() => Recipe, recipe => recipe.category)
    recipe: Recipe[];
}
