import './App.css';
import Sidebar from './components/Sidebar.jsx';
import Main from './components/Main.jsx';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const getInitialNotes = () => {
  try {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch (error) {
    console.error('ローカルストレージからノートを取得中にエラー:', error);
    return [];
  }
};

const getInitialActiveNote = () => {
  try {
    return localStorage.getItem('activeNote') || null;
  } catch (error) {
    console.error('ローカルストレージからアクティブノートを取得中にエラー:', error);
    return null;
  }
};

function App() {
  const [notes, setNotes] = useState(getInitialNotes());
  const [activeNote, setActiveNote] = useState(getInitialActiveNote());

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('ノートをローカルストレージに保存中にエラー:', error);
    }
  }, [notes]);

  useEffect(() => {
    try {
      if (activeNote) {
        localStorage.setItem('activeNote', activeNote);
      }
    } catch (error) {
      console.error('アクティブノートをローカルストレージに保存中にエラー:', error);
    }
  }, [activeNote]);

  useEffect(() => {
    if (!activeNote && notes.length > 0) {
      setActiveNote(notes[0].id);
    }
  }, [notes, activeNote]);

  const onAddNoteClick = () => {
    const newNote = {
      id: uuidv4(),
      title: '新しいノート',
      content: '',
      modDate: Date.now(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNote(newNote.id); // 新しいノートをアクティブにする
  };

  const onDeleteNoteClick = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (activeNote === id) {
      setActiveNote(notes.length > 1 ? notes[0].id : null);
    }
  };

  const onUpdateNote = (id, updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updatedNote, modDate: Date.now() } : note
      )
    );
  };

  const activeNoteData = notes.find((note) => note.id === activeNote) || null;

  return (
    <div className="App">
      <Sidebar
        onAddNoteClick={onAddNoteClick}
        notes={notes}
        onDeleteNoteClick={onDeleteNoteClick}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={activeNoteData} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
