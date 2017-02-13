describe('about render remove btn', () => {
  
  it('should render trash icon', () => {
    expect(uploader.find('button > i.fa-trash').length).to.equal(1)
  })
   
  it('should not render when onRemove not pass', () => {
    uploader.setProps({ onRemove: undefined })
    expect(uploader.find('button.remove').length).to.equal(0)
  })
   
  it('should call window.confirm when clicked in remove button', () => {
    uploader.find('button.remove').simulate('click')
    expect(confirmStub.called).to.equal(true)
  })
  
  it('shoulld call onRemove if clicked in button and confirm message', () => {
    let result
    confirmStub.returns(true)
    uploader.setProps({ onRemove: file => { result = file } })
    uploader.find('button.remove').simulate('click')
    expect(result).to.equal(props.file)
    })
  })
})
