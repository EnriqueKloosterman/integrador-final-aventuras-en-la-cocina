import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn('uuid')
    articleId: string;

    @Column({type: 'varchar', length:150, nullable: false})
    title: string;

    @Column({type: 'text', nullable: false})
    article: string;

    @Column({type: 'varchar', length:60, nullable: false})
    image: string;

    @ManyToOne(() => User, user => user.article)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId'
    })
    user: User[];

    @ManyToOne(() => Tag, tag => tag.article)
    @JoinColumn({ 
        name: 'tagId', 
        referencedColumnName: 'tagId' 
    })
    tag: Tag;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
} 


