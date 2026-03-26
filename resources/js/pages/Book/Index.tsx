import { Head, Link, router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"

// import type { booksPagination } from "@/types/books"
import type { BookPagination } from "@/types/book"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface Props {
    books: BookPagination
}

export default function Index({ books }: Props) {
    const handleDelete = (id: number) => {
        if (confirm("Yakin hapus data?")) {
            router.delete(`/bookss/${id}`)
        }
    }

    return (
        <AppLayout>
            <Head title="Manage books" />

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manage books</h1>
                    <Link href="/books/create">
                        <Button>Tambah books</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama books</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {books.data.map((item, Index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {(books.current_page - 1) * 10 + Index + 1}
                                        </TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Link href={`/books/${item.id}/edit`}>
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Hapus
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
