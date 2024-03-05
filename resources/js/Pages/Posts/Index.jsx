import InputError from "@/Components/InputError";
import Post from "@/Components/Posts";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import { Input } from "postcss";
import React from "react";


const Index = ({ auth , nombres}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        body: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("posts.store"), { onSuccess: () => reset() });
    };

    console.log(nombres);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Postas" />
            <div className="w-5/12 mx-auto mt-14">
                <form onSubmit={submit} className="">
                    <input
                        value={data.title}
                        onChange={e => setData('title', e.target.value)} 
                        type="text"
                        placeholder="Title"
                        autoFocus
                        className="mb-3 w-10/12 mx-auto block w-96 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        
                    />
                    <InputError message={errors.title}  className="mt-2"/>

                    <textarea
                        value={data.body}
                        onChange={e => setData('body', e.target.value)} 
                        type="text"
                        placeholder="Body"
                        className="block w-10/12 mx-auto w-96 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    >
                    </textarea>
                    <InputError message={errors.body}  className="mt-2"/>
                    <div className="w-10/12 mx-auto">
                    <PrimaryButton
                        className=" mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        disabled = {processing}
                    >
                        Create
                    </PrimaryButton>

                    </div>
                </form>
                    <div className='mt-6 bg-indigo-400 rounded-lg divide-y-4 shadow-lg'>
                    {
                        nombres.map( post =>
                            <Post key={post.id} post={post}/>
                        )
                        // JSON.stringify(posts)
                    }
                    </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
