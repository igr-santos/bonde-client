import React, { PropTypes } from 'react'

const FileUploader = ({ file, onRemove }) => (
  <div>
  {file && (
    <div>
      <img src={file} style={{ maxHeight: '36px' }} />
      {onRemove && (
        <button
          className='btn bg-darken-4 white rounded remove'
          onClick={() => {
            if (window.confirm('Deseja remover a imagem de fundo?')) {
              onRemove(file)
            }
          }}
        >
          <i className='fa fa-trash' />
        </button>)}
    </div>
  )}
  </div>
)

FileUploader.propTypes = {
 file: PropTypes.string,
 onRemove: PropTypes.func,
}

export default FileUploader
