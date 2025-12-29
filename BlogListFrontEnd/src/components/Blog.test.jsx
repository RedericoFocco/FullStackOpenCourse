import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

/*test('renders author', () => {
  const blog = {
    user_id:{
        name: 'Fero'
    },
    title: 'FeroTest'
  }
  
  render(<Blog blog={blog} />)

  const element_author= screen.queryByText('Fero')
 
  screen.debug(element_author)

  expect(element_author).toBeDefined()
})

test('renders title', () => {
  const blog = {
    user_id:{
        name: 'Fero'
    },
    title: 'FeroTest'
  }
  
  render(<Blog blog={blog} />)

  const element_title= screen.getByText('FeroTest')
 
  screen.debug(element_title)

  expect(element_title).toBeDefined()
})

test('click the button and check url and likes', async () => {
  const blog = {
    user_id:{
        name: 'Fero'
    },
    title: 'FeroTest',
    url:'https://www.prova.com',
    likes:10
  }

  //const mockHandler = vi.fn()
  
  render(<Blog blog={blog} viewButton={'View'} />)

  const user = userEvent.setup()

  const button = screen.getByText('View')

  await user.click(button)

  const urlDisplayed = screen.queryByDisplayValue('https://www.no.com')
  const likesDisplayed = screen.queryByDisplayValue(10)

  expect(urlDisplayed).toBeDefined()
  expect(likesDisplayed).toBeDefined()
})*/

test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    user_id:{
        name: 'Fero'
    },
    title: 'FeroTest',
    url:'https://www.prova.com',
    likes:10
  }

  const mockHandler = vi.fn()
  
  render(<Blog blog={blog} viewButton={'View'} handleLikes={mockHandler} />)

  const user = userEvent.setup()

  const button = screen.getByText('Likes')

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})