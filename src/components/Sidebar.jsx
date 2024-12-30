import './Sidebar.css';

const Sidebar = ({ onAddNoteClick, notes, onDeleteNoteClick, activeNote, setActiveNote }) => {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onAddNoteClick}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`app-sidebar-note ${note.id === activeNote ? 'active' : ''}`}
            onClick={() => setActiveNote(note.id)}
          >
            <strong>{note.title}</strong>
            <p>{note.content && note.content.substr(0, 20)}</p>
            <small>最終更新: {new Date(note.modDate).toLocaleDateString('ja-JP')}</small>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNoteClick(note.id);
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
