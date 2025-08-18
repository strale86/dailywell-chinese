import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Note } from '../types';

interface NotesProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (id: string, note: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export const Notes: React.FC<NotesProps> = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      onAddNote({
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Notes</h2>
          <p className="text-gray-600">Capture your thoughts and ideas</p>
        </div>
        <button
          onClick={() => setIsAddingNote(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">New Note</h3>
            <button
              onClick={() => {
                setIsAddingNote(false);
                setNewNoteTitle('');
                setNewNoteContent('');
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your note here..."
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNoteTitle('');
                  setNewNoteContent('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes yet</h3>
            <p className="text-gray-600">Start by creating your first note</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateNote(note.id, { isEditing: !note.isEditing })}
                    className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Created: {note.createdAt.toLocaleDateString()} | 
                  Updated: {note.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
