import { Article } from "../../articles/entities/article.entity";
import { Role } from "../../common/enums/role.enum";
import { Comment } from "../../comments/entities/comment.entity";
import { Recipe } from "../../recipes/entities/recipe.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'varchar', length: 80, nullable: false, select: false})
    userPassword: string;
    
    @Column({ type: 'varchar', length: 100, nullable: false})
    image: string;
    
    @Column({ type:'enum', enum: Role, default: Role.USER })
    user_role: Role;

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
