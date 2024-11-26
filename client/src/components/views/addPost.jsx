import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import { ImagePlus, Send } from 'lucide-react';

const AddPost = () => {
    const [caption, setCaption] = useState(''); 
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('image', image);
        try {
            const response = await fetch('http://localhost:8000/addPost', {
                credentials: "include",
                method: 'POST',
                body: formData,  
            });
            if (response.ok) {
                const data = await response.json();
                alert('Post added successfully!');
                setCaption('');
                setImage(null);
                setPreviewUrl(null);
            } else {
                alert('Error adding post.');
            }
        } catch(err) {
            console.error('Error adding post', err);
            alert('An error has occurred'); 
        }
    }; 

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-xl font-semibold">Create New Post</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className={`
                            w-full aspect-square mb-4 
                            border-2 border-dashed border-gray-300 
                            rounded-lg 
                            flex flex-col items-center justify-center
                            overflow-hidden
                            ${previewUrl ? 'bg-black' : 'bg-gray-50'}
                        `}>
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                                </div>
                            )}
                            <input
                                id="image"
                                type="file"
                                onChange={handleImageChange}
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label 
                            htmlFor="caption" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Caption
                        </label>
                        <textarea
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="4"
                            placeholder="Write a caption..."
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Send className="w-4 h-4" />
                        Share Post
                    </button>
                </form>
            </div>
            <Navbar />
        </div>
    );
};

export default AddPost;