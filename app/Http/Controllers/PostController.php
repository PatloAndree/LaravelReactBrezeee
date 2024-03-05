<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Inertia::render('Posts/Index', [

        // ]);

        return Inertia::render('Posts/Index', [
            'nombres' => Post::with('user:id,name')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          //validamos los datos
          $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string|max:255',
         ]);

         $request->user()->posts()->create($validated);

         return redirect(route('dashboard'));
    }

 

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string|max:255',
         ]);

         $post->update($validated);

         return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        
        $post->delete();

        return redirect(route('posts.index'));
    }
}
