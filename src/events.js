import { fetchIp } from './api'
import { updateMap } from './map'
import { setLoading } from './utils'

const input = document.getElementById('input-ip')
const form = document.getElementById('form')

export async function processIp(ip) {
  try {
    setLoading(true)
    const data = await fetchIp(ip)

    Object.entries(data.info).forEach(([key, value]) => {
      const element = document.getElementById(key)
      element.textContent = value
      element.title = value
    })

    updateMap(data.coords)
    setLoading(false)
  } catch (error) {
    console.error(error.message)
  }
}

export async function handleSubmit(event) {
  event.preventDefault()

  const ip = input.value
  const isMatch = ip.match(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/)

  if (!isMatch && ip.length) {
    input.classList.add('input-validation-error')
    return
  }

  input.classList.remove('input-validation-error')
  await processIp(input.value)
  input.value = ''
}

export function handleResize() {
  if (outerWidth < 768) {
    input.placeholder = 'Search for any IP'
  } else {
    input.placeholder = 'Search for any IP address or domain'
  }
}

export function registerEvents() {
  form.addEventListener('submit', handleSubmit)
  window.addEventListener('resize', handleResize)

  handleResize()
}
