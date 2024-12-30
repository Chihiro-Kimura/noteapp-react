import './Main.css';
import ReactMarkdown from 'react-markdown';

const Main = ({ activeNote, onUpdateNote }) => {
  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  const onEditNote = (key, value) => {
    onUpdateNote(activeNote.id, {
      ...activeNote,
      [key]: value,
    });
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="タイトル"
          value={activeNote.title || ''}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
          id="content"
          placeholder="ノートの内容"
          value={activeNote.content || ''}
          onChange={(e) => onEditNote('content', e.target.value)}
        />
      </div>

      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">
          <ReactMarkdown>{activeNote.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Main;
