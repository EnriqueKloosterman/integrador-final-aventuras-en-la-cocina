import { Recipe } from "src/recipes/entities/recipe.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "src/articles/entities/article.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column({type: 'text', nullable: false})
    comment: string;

    @ManyToOne(() => User, user => user.comment)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId'
    })
    user: User;

    @ManyToOne(() => Recipe, recipe => recipe.comment)
    @JoinColumn({
        name: 'recipeId',
        referencedColumnName: 'recipeId'
    })
    recipe: Recipe;

    @ManyToOne(() => Article, article => article.comment)
    @JoinColumn({
        name: 'articleId',
        referencedColumnName: 'articleId'
    })
    article: Article;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
