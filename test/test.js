describe('hello', () => {
  it('world', () => {
    document.body.innerHTML = '<div>Hello World</div>'
    console.log(document)
    throw new Error('Hello World Error')
  })
})
