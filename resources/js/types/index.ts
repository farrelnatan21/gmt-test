export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Category = {
    id: number,
    name: string,
}

export type Book = {
    id: number;
    category_id: number;
    title: string;
    author: string;
    stock: string;
};
