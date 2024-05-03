import { Article } from "src/articles/entities/article.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Recipe } from "src/recipes/entities/recipe.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ type: 'varchar', length: 80, nullable: false})
    userName: string;

    @Column({ type: 'varchar', length: 80, nullable: false})
    userLastName: string;

    @Column({ type: 'varchar', length: 80, nullable: false})
    userEmail: string;

    @Column({ type: 'varchar', length: 80, nullable: false})
    userPassword: string;
    
    @Column({ type: 'varchar', length: 80, nullable: false})
    image: string;
    
    @Column({ type:'enum', enum: UserRole, default: UserRole.USER })
    user_role: UserRole;

    @OneToMany(() => Recipe, recipe => recipe.user)
    recipe: Recipe;

    @OneToMany(() => Article, article => article.user)

    article: Article[];

    @OneToMany(() => Comment, comment => comment.user)
    comment: Comment;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
