import type { Category } from "@/types/category";

export interface Book {
    id:number,
    category_id: number,
    category?: Category,
    title: string,
    author: string,
    stock: number,
}

export type BookPagination = {
    data: Book[]
    current_page: number
    last_page: number
    per_page: number
    total: number
}
