import { FaTrash, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

function DeleteModal({ 
  showDeleteConfirm, 
  productToDelete, 
  confirmDelete, 
  cancelDelete 
}) {
  if (!showDeleteConfirm) return null;

  return (
    <div className="modal-overlay" onClick={cancelDelete}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-header">
          <div className="delete-modal-icon">
            <FaExclamationTriangle />
          </div>
          <h3>Delete Product</h3>
        </div>
        
        <div className="delete-modal-content">
          <p>
            Are you sure you want to delete{' '}
            <strong className="product-name-highlight">"{productToDelete?.name}"</strong>?
          </p>
          <p className="delete-warning">
            <FaExclamationTriangle className="warning-icon" />
            This action cannot be undone.
          </p>
        </div>
        
        <div className="delete-modal-actions">
          <button className="cancel-delete-btn" onClick={cancelDelete}>
            <FaTimes />
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={confirmDelete}>
            <FaTrash />
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal; 