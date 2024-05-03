import { Article } from "src/articles/entities/article.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    tagId: number;

    @Column({type: 'varchar', length: 50, nullable:false})
    tag: string;
    
    @OneToMany(() => Article, article => article.tag)
    article: Article;
}
