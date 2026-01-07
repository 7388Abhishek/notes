import { useState, useEffect } from "react";
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddOrUpdate = () => {
    if (!title || !content) return;

    if (editingId) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? { ...note, title, content }
            : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toLocaleString(),
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Notes App</h1>

        {/* Form */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleAddOrUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length === 0 && (
            <p className="text-center text-gray-500">No notes yet</p>
          )}
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-2xl shadow"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                Created: {note.createdAt}
              </p>
              <p className="mb-4">{note.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="px-3 py-1 bg-yellow-400 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
