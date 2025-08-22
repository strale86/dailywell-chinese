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
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Beleske",
          subtitle: "Zabeležite svoje misli i ideje",
          addNote: "Dodaj belesku",
          newNote: "Nova beleska",
          titleLabel: "Naslov",
          contentLabel: "Sadržaj",
          titlePlaceholder: "Unesite naslov beleske",
          contentPlaceholder: "Napišite svoju belesku ovde...",
          cancel: "Otkaži",
          saveNote: "Sačuvaj belesku",
          noNotes: "Još nema beleski",
          startCreating: "Počnite kreiranjem svoje prve beleske",
          created: "Kreirano",
          updated: "Ažurirano"
        };
      case 'zh':
        return {
          title: "笔记",
          subtitle: "记录您的想法和创意",
          addNote: "添加笔记",
          newNote: "新笔记",
          titleLabel: "标题",
          contentLabel: "内容",
          titlePlaceholder: "输入笔记标题",
          contentPlaceholder: "在此写下您的笔记...",
          cancel: "取消",
          saveNote: "保存笔记",
          noNotes: "暂无笔记",
          startCreating: "开始创建您的第一个笔记",
          created: "已创建",
          updated: "已更新"
        };
      default: // English
        return {
          title: "Notes",
          subtitle: "Capture your thoughts and ideas",
          addNote: "Add Note",
          newNote: "New Note",
          titleLabel: "Title",
          contentLabel: "Content",
          titlePlaceholder: "Enter note title",
          contentPlaceholder: "Write your note here...",
          cancel: "Cancel",
          saveNote: "Save Note",
          noNotes: "No notes yet",
          startCreating: "Start by creating your first note",
          created: "Created",
          updated: "Updated"
        };
    }
  };

  const text = getText();

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    console.log('handleAddNote called', { title: newNoteTitle, content: newNoteContent });
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      console.log('Adding note...');
      onAddNote({
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      setIsAddingNote(false);
    } else {
      console.log('Note validation failed - empty title or content');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
        </div>
        <button
          onClick={() => setIsAddingNote(true)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          {text.addNote}
        </button>
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.newNote}</h3>
            <button
              onClick={() => {
                setIsAddingNote(false);
                setNewNoteTitle('');
                setNewNoteContent('');
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{text.titleLabel}</label>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-white text-black dark:text-black border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={text.titlePlaceholder}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{text.contentLabel}</label>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-white text-black dark:text-black border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={text.contentPlaceholder}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNoteTitle('');
                  setNewNoteContent('');
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                {text.cancel}
              </button>
              <button
                onClick={() => {
                  console.log('Save button clicked');
                  handleAddNote();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {text.saveNote}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-12">
                          <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{text.noNotes}</h3>
            <p className="text-gray-600 dark:text-gray-400">{text.startCreating}</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{note.title}</h3>
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
              
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {text.created}: {note.createdAt.toLocaleDateString()} | 
                  {text.updated}: {note.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
