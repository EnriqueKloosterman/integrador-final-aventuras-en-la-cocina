import { Recipe } from "src/recipes/entities/recipe.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    user: User[];

    @ManyToOne(() => Recipe, recipe => recipe.comment)
    @JoinColumn({
        name: 'recipeId',
        referencedColumnName: 'recipeId'
    })
    recipe: Recipe[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
