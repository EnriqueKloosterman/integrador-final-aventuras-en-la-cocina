import { Category } from "src/categories/entities/category.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    recipeId: string;

    @Column({type: 'varchar', length: 150, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'text', nullable: false})
    instructions: string;
    
    @Column({type: 'text', nullable: false})
    ingredients: string; 

    @Column({ type: 'varchar', length: 100, nullable: false})
    image: string;

    @ManyToOne(() => User, user => user.recipe)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId'
    })
    user: User[];

    @OneToMany(() => Comment, comment => comment.recipe)
    comment: Comment;
    
    @ManyToOne(() => Category, category => category.recipe)
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'categoryId'
    })
    category: Category;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
}
