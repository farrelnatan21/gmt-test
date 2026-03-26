<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with(
            "category"
        );
        $books = $books->orderBy("created_at","desc")->paginate(10);

        return Inertia::render("Book/Index", [
            'books' => $books,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = Category::all();
        return Inertia::render("Book/Create", [
            "category"=> $category
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "category_id",
            'title',
            'author',
            'stock'
        ]);

        $Book = new Book();
        $Book->fill([
            'category_id' => $validated['category_id'],
            'title'=> $validated['title'],
            'author'=> $validated['author'],
            'stock' => $validated['stock'],
        ]);
        $Book->save();

        return redirect()->route('books.index')->with('success','');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return Inertia::render('Book/Edit', [
            'category' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'category_id'=> 'required',
            'title'=> 'required',
            'author' => 'required',
            'stock'
        ]);

        $book->fill($validated);
        $book->save();
        return redirect()->route('books.index')->with('success','selesai update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book ->delete();
        return redirect()->route('books.index')->with('success','');
    }
}