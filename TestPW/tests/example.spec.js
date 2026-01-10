const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  test('Wrong Login', async ({ page }) => {
    await page.getByLabel('username').fill('a')
    await page.getByLabel('password').fill('b')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Error logging in!')).toBeVisible()
  })
  /*
  test('Correct Login', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
  })*/
})