import React, { useState } from 'react';

export interface Column {
  key: string;
  dataKey: string;
  width: string;
  header?: string;
  truncate?: boolean;
  editable?: boolean;
  renderCell?: (item: any, isEditing: boolean, onChange: (value: string) => void, onSubmit: () => void) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onToggle: (item: any) => void;
  onRemove: (item: any) => void;
  onEdit?: (item: any, key: string, value: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onToggle, onRemove, onEdit }) => {
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setEditValue(item[columns.find(col => col.editable)?.dataKey || '']);
  };

  const handleSave = () => {
    if (onEdit && editingItem) {
      const editableColumn = columns.find(col => col.editable);
      if (editableColumn) {
        onEdit(editingItem, editableColumn.dataKey, editValue);
      }
    }
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValue('');
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={`px-4 py-2 text-left ${column.width}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-y-auto h-64">
        <table className="w-full border-collapse">
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="bg-white even:bg-gray-100 hover:bg-gray-200">
                {columns.map((column) => (
                  <td key={column.key} className={`border px-4 py-2 ${column.width}`}>
                    {column.renderCell ? (
                      column.renderCell(
                        item,
                        editingItem === item,
                        (value) => setEditValue(value),
                        handleSave
                      )
                    ) : column.key === 'actions' ? (
                      <div className="flex space-x-2">
                        {editingItem === item ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              aria-label="Edit entry"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => onRemove(item)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              aria-label="Remove entry"
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    ) : editingItem === item && column.editable ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSave();
                          }
                        }}
                        className="w-full px-2 py-1 border rounded"
                        autoFocus
                      />
                    ) : (
                      <span className={column.truncate ? 'truncate' : ''}>
                        {item[column.dataKey]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
