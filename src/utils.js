const panelValues = document.querySelectorAll('.panel-value')

export function setLoading(enable) {
  panelValues.forEach(item => {
    if (enable) {
      item.textContent = ''
      item.classList.add('skeleton')
    } else {
      item.classList.remove('skeleton')
    }
  })
}
