import { Head, Link, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AppLayout from "@/layouts/app-layout"

interface Category {
    id: number
    nama: string
}

interface Props {
    category: Category[]
}

export default function Create({ category }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: "",
        title: "",
        author: "",
        stock: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("books.store"))
    }

    return (
        <AppLayout>
            <Head title="Tambah Buku" />
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tambah Buku</h1>
                    <Link href={route("books.index")}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Buku</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Kategori */}
                            <div className="space-y-2">
                                <Label htmlFor="category_id">Kategori</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData("category_id", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {category.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>
                                                {cat.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && (
                                    <p className="text-sm text-red-500">{errors.category_id}</p>
                                )}
                            </div>

                            {/* Judul */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Buku</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    placeholder="Masukkan judul buku"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            {/* Penulis */}
                            <div className="space-y-2">
                                <Label htmlFor="author">Penulis</Label>
                                <Input
                                    id="author"
                                    value={data.author}
                                    onChange={(e) => setData("author", e.target.value)}
                                    placeholder="Masukkan nama penulis"
                                />
                                {errors.author && (
                                    <p className="text-sm text-red-500">{errors.author}</p>
                                )}
                            </div>

                            {/* Stok */}
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stok</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min={0}
                                    value={data.stock}
                                    onChange={(e) => setData("stock", e.target.value)}
                                    placeholder="Masukkan jumlah stok"
                                />
                                {errors.stock && (
                                    <p className="text-sm text-red-500">{errors.stock}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
