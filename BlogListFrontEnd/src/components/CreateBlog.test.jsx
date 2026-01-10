import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('The test should check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  
  const createBlog = vi.fn()
  const handleTitleMock = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlog handleNewBlog_={createBlog} handleTitleChange_={handleTitleMock}/>)

  const inputTitle = screen.getByLabelText('title:') 
  const inputAuthor = screen.getByLabelText('author:')
  const inputUrl = screen.getByLabelText('url:')

  const sendButton = screen.getByText('create')
  screen.debug(sendButton)
  await user.type(inputTitle, 'titolo')
  await user.type(inputAuthor, 'fero')
  await user.type(inputUrl, 'https://www.w.com')
  
  await user.click(sendButton)

  console.log(createBlog.mock.calls[0][0])
  //console.log(handleTitleMock.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('titolo')
})