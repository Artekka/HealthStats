const renderDatabaseSelection = () => (
    <div className="database-selection">
      {databases.map(db => (
        <button 
          key={db.value} 
          onClick={() => setSelectedDatabase(db.value)}
          className={selectedDatabase === db.value ? 'active' : ''}
        >
          {db.name}
        </button>
      ))}
    </div>
  );
  
  // Then in your return statement:
  return (
    <div>
      <h2>Submit Health Data</h2>
      {renderDatabaseSelection()}
      {selectedDatabase && (
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <button type="submit">Submit</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );